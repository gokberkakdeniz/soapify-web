/* eslint-disable no-unused-vars */
import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  select,
  take,
  takeEvery,
} from "redux-saga/effects";
import { get } from "../../helpers/fetch";
import { ErrorObject, TrackObject } from "../../types/spotify";
import { PlaylistState } from "../playlists";
import { AppState } from "../reducer";
import {
  tracksFail,
  tracksPersist,
  tracksRequest,
  tracksReset,
  tracksSuccess,
  tracksSuccessCached,
} from "./tracks.actions";
import {
  TracksData,
  TracksObject,
  TracksRequestAction,
  TracksState,
  TRACKS_FAIL,
  TRACKS_PERSIST,
  TRACKS_REQUEST,
  TRACKS_START,
  TRACKS_SUCCESS,
} from "./tracks.types";
import { getPlaylistTracksUrl } from "./tracks.helpers";

type GetPlaylistTracksResponse =
  | {
      items: { track: Omit<TrackObject, "added_at">; added_at: string }[];
    }
  | ErrorObject;

function* tracksStartSaga() {
  yield takeEvery(TRACKS_START, function* () {
    const tracks: TracksData = yield select(
      (state: AppState) => state.tracks.data
    );
    const playlists: PlaylistState = yield select(
      (state: AppState) => state.playlists
    );
    const country: string = yield select(
      (state: AppState) => state.profile.country
    );

    yield put(tracksReset());

    const playlistIds = Object.keys(playlists);

    for (let i = 0; i < playlistIds.length; i += 1) {
      const id = playlistIds[i];
      const {
        snapshot_id,
        tracks: { total },
      } = playlists[id];

      if (tracks[id]?.snapshot_id === snapshot_id) {
        yield put(tracksSuccessCached({ ...tracks[id], id }));
      } else {
        yield put(tracksRequest(id, country, total, snapshot_id));
        yield take([TRACKS_SUCCESS, TRACKS_FAIL]);
      }
    }

    yield put(tracksPersist());
  });
}

function* tracksRequestSaga() {
  yield takeEvery(TRACKS_REQUEST, function* ({ payload }: TracksRequestAction) {
    const { id, market, total, snapshot_id } = payload;
    const pageCount = Math.ceil(total / 100);
    const playlists: TracksObject = { id, snapshot_id, tracks: [] };
    let path;
    let error;

    try {
      for (let i = 0; i < pageCount; i += 1) {
        path = getPlaylistTracksUrl(id, market, i);
        const res: GetPlaylistTracksResponse = yield call(get, path);

        if ("error" in res) {
          error = res.error;
          break;
        } else {
          res.items.forEach((p) => {
            // see https://github.com/spotify/web-api/issues/958
            if (!p.track) {
              return;
            }

            playlists.tracks.push({ ...p.track, added_at: p.added_at });
          });
        }
      }
    } catch (err) {
      error = {
        status: 0,
        message: (err as Error).message || "soapify/runtime_error",
      };
    }

    if (error) {
      const { message, status } = error;
      yield put(tracksFail(status, message));
    } else {
      yield put(tracksSuccess(playlists));
    }
  });
}

function* tracksPersistSaga() {
  yield takeEvery(TRACKS_PERSIST, function* () {
    const userId: string = yield select((state: AppState) => state.profile.id);
    const tracks: TracksState = yield select(
      (state: AppState) => state.tracks.data
    );
    localStorage.setItem(`tracks.${userId}`, JSON.stringify(tracks));
  });
}

export default function* playlistsSaga(): Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>,
  void,
  unknown
> {
  yield all([tracksStartSaga(), tracksRequestSaga(), tracksPersistSaga()]);
}
