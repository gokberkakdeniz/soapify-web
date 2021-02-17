import { ErrorObject, PlaylistObject } from "../../types/spotify";

export const PLAYLISTS_REQUEST = "playlists/request";
export const PLAYLISTS_FAIL = "playlists/fail";
export const PLAYLISTS_SUCCESS = "playlists/success";

export interface PlaylistsRequestAction {
  type: typeof PLAYLISTS_REQUEST;
}

export interface PlaylistsFailAction {
  type: typeof PLAYLISTS_FAIL;
  payload: ErrorObject["error"];
}

export interface PlaylistsSuccessAction {
  type: typeof PLAYLISTS_SUCCESS;
  payload: PlaylistObject[];
}

export type PlaylistState = Record<
  string,
  Omit<PlaylistObject, "id" | "owner">
>;

export type PlaylistsAction =
  | PlaylistsRequestAction
  | PlaylistsFailAction
  | PlaylistsSuccessAction;
