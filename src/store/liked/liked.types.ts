import { ErrorObject, TrackObject } from "../../types/spotify";

export const LIKED_REQUEST = "liked/request";
export const LIKED_SUCCESS = "liked/success";
export const LIKED_FAIL = "liked/fail";
export const LIKED_PERSIST = "liked/persist";

export type LikedState = {
  status: "idle" | "loading" | "loaded";
  tracks: TrackObject[];
};

export interface LikedRequestAction {
  type: typeof LIKED_REQUEST;
}

export interface LikedSuccessAction {
  type: typeof LIKED_SUCCESS;
  payload: TrackObject[];
}

export interface LikedFailAction {
  type: typeof LIKED_FAIL;
  payload: ErrorObject["error"];
}

export interface LikedPersistAction {
  type: typeof LIKED_PERSIST;
}

export type LikedAction =
  | LikedRequestAction
  | LikedSuccessAction
  | LikedFailAction
  | LikedPersistAction;
