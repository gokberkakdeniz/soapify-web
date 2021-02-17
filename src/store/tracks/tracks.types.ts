import { ErrorObject, TrackObject } from "../../types/spotify";

export const TRACKS_START = "tracks/start";
export const TRACKS_RESET = "tracks/reset";
export const TRACKS_REQUEST = "tracks/request";
export const TRACKS_FAIL = "tracks/fail";
export const TRACKS_SUCCESS = "tracks/success";
export const TRACKS_CACHED = "tracks/cached";
export const TRACKS_PERSIST = "tracks/persist";
export const TRACKS_RESTORE = "tracks/restore";

export interface TracksObject {
  id: string;
  snapshot_id: string;
  tracks: TrackObject[];
}

export type TracksData = Record<string, Omit<TracksObject, "id">>;

export type TracksState = {
  status: "idle" | "loading" | "loaded";
  progress: {
    index: number;
    type: "fetching" | "fetched" | "error";
    id: string;
  };
  data: TracksData;
};

export interface TracksStartAction {
  type: typeof TRACKS_START;
}

export interface TracksResetAction {
  type: typeof TRACKS_RESET;
}

export interface TracksPersistAction {
  type: typeof TRACKS_PERSIST;
}

export interface TracksRestoreAction {
  type: typeof TRACKS_RESTORE;
  payload: TracksData;
}

export interface TracksRequestAction {
  type: typeof TRACKS_REQUEST;
  payload: {
    id: string;
    market: string;
    total: number;
    snapshot_id: string;
  };
}

export interface TracksFailAction {
  type: typeof TRACKS_FAIL;
  payload: ErrorObject["error"];
}

export interface TracksSuccessAction {
  type: typeof TRACKS_SUCCESS;
  payload: TracksObject;
}

export interface TracksCachedAction {
  type: typeof TRACKS_CACHED;
  payload: TracksObject;
}

export type TracksAction =
  | TracksStartAction
  | TracksRequestAction
  | TracksFailAction
  | TracksSuccessAction
  | TracksCachedAction
  | TracksPersistAction
  | TracksResetAction
  | TracksRestoreAction;
