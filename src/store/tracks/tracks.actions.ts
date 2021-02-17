import {
  TRACKS_START,
  TRACKS_RESET,
  TRACKS_REQUEST,
  TRACKS_FAIL,
  TRACKS_SUCCESS,
  TRACKS_CACHED,
  TRACKS_PERSIST,
  TRACKS_RESTORE,
  TracksStartAction,
  TracksResetAction,
  TracksFailAction,
  TracksRequestAction,
  TracksSuccessAction,
  TracksCachedAction,
  TracksPersistAction,
  TracksRestoreAction,
  TracksObject,
  TracksData,
} from "./tracks.types";

export const tracksStart = (): TracksStartAction => ({
  type: TRACKS_START,
});

export const tracksReset = (): TracksResetAction => ({
  type: TRACKS_RESET,
});

export const tracksPersist = (): TracksPersistAction => ({
  type: TRACKS_PERSIST,
});

export const tracksRestore = (state: TracksData): TracksRestoreAction => ({
  type: TRACKS_RESTORE,
  payload: state,
});

export const tracksRequest = (
  id: string,
  market: string,
  total: number,
  snapshot_id: string
): TracksRequestAction => ({
  type: TRACKS_REQUEST,
  payload: { id, market, total, snapshot_id },
});

export const tracksFail = (
  status: number,
  message: string
): TracksFailAction => ({
  type: TRACKS_FAIL,
  payload: {
    status,
    message,
  },
});

export const tracksSuccess = (tracks: TracksObject): TracksSuccessAction => ({
  type: TRACKS_SUCCESS,
  payload: tracks,
});

export const tracksSuccessCached = (
  tracks: TracksObject
): TracksCachedAction => ({
  type: TRACKS_CACHED,
  payload: tracks,
});
