const REDIRECT_URI = `${window.location.origin}/projects/soapify/callback`;

const generateRandomString = (length: number): string => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values)
    .map((x) => possible[x % possible.length])
    .join("");
};

const sha256 = (plain: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  return crypto.subtle.digest("SHA-256", encoder.encode(plain));
};

const base64encode = (input: ArrayBuffer): string =>
  btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const SESSION = generateRandomString(16);

export const getAuthUrl = async (): Promise<string> => {
  const codeVerifier = generateRandomString(64);
  const codeChallenge = base64encode(await sha256(codeVerifier));

  localStorage.setItem(`pkce_verifier_${SESSION}`, codeVerifier);

  const params = new URLSearchParams({
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID!,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: "playlist-read-private,user-read-private",
    state: SESSION,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const exchangeCode = async (
  code: string,
  state: string,
): Promise<{
  access_token: string;
  token_type: string;
  expires_in: number;
}> => {
  const codeVerifier = localStorage.getItem(`pkce_verifier_${state}`);
  if (!codeVerifier) {
    throw new Error("pkce_verifier_not_found");
  }

  localStorage.removeItem(`pkce_verifier_${state}`);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID!,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    throw new Error("token_exchange_failed");
  }

  return response.json();
};
