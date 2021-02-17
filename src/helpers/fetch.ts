import store from "../store";
import { ErrorObject } from "../types/spotify";

const baseUrl = "https://api.spotify.com/v1";

const getToken = (): string => {
  const { auth } = store.getState();

  if (auth.status === "success")
    return `${auth.token_type} ${auth.access_token}`;

  return "";
};

export const get = <T>(path: string): Promise<T | ErrorObject> =>
  fetch(path.startsWith(baseUrl) ? path : baseUrl + path, {
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  }).then((res) => res.json());

export const post = <T>(
  path: string,
  data: Record<string, unknown>
): Promise<T | ErrorObject> =>
  fetch(path.startsWith(baseUrl) ? path : baseUrl + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
