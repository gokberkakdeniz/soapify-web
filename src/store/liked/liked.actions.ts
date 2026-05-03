import { TrackObject } from "../../types/spotify";
import {
  LIKED_FAIL,
  LIKED_PERSIST,
  LIKED_REQUEST,
  LIKED_RESTORE,
  LIKED_SUCCESS,
} from "./liked.types";

export const likedRequest = () => ({ type: LIKED_REQUEST }) as const;

export const likedSuccess = (tracks: TrackObject[]) =>
  ({ type: LIKED_SUCCESS, payload: tracks }) as const;

export const likedFail = (status: number, message: string) =>
  ({ type: LIKED_FAIL, payload: { status, message } }) as const;

export const likedPersist = () => ({ type: LIKED_PERSIST }) as const;

export const likedRestore = (tracks: TrackObject[]) =>
  ({ type: LIKED_RESTORE, payload: tracks }) as const;
