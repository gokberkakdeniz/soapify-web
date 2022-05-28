const redirectUri = `${
  process.env.NODE_ENV === "production"
    ? "https://akdeniz.dev"
    : "http://localhost:3000"
}/projects/soapify/callback`;

export const session = Math.random().toString(20).substr(2, 16);

export const getAuthUrl = (): string =>
  `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${redirectUri}&scope=playlist-read-private,user-read-private&state=${session}`;
