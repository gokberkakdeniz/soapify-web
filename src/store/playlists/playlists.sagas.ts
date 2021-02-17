import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  select,
  takeEvery,
  takeLeading,
} from "redux-saga/effects";
import { get } from "../../helpers/fetch";
import { ErrorObject, PlaylistObject } from "../../types/spotify";
import { AppState } from "../reducer";
import { tracksStart } from "../tracks";
import { playlistsFail, playlistsSuccess } from "./playlists.actions";
import { PLAYLISTS_REQUEST, PLAYLISTS_SUCCESS } from "./playlists.types";

type GetPlaylistsResponse =
  | {
      href: string;
      items: PlaylistObject[];
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
    }
  | ErrorObject;

function* playlistsRequestSaga() {
  yield takeEvery(PLAYLISTS_REQUEST, function* () {
    const playlists: PlaylistObject[] = [];
    let path = "/me/playlists?limit=50";
    let error;
    try {
      while (true) {
        const res: GetPlaylistsResponse = yield call(get, path);
        if ("error" in res) {
          error = res.error;
          break;
        } else {
          res.items.forEach((p) => playlists.push(p));
          if (res.next) {
            path = res.next;
          } else break;
        }
      }
    } catch (err) {
      error = { status: 0, message: err.message || "soapify/runtime_error" };
    }

    if (error) {
      const { message, status } = error;
      yield put(playlistsFail(status, message));
    } else {
      const userId = yield select((state: AppState) => state.profile.id);
      const ownedPlaylists = playlists.filter(
        ({ owner }) => owner.id === userId
      );
      yield put(playlistsSuccess(ownedPlaylists));
    }
  });
}

function* playlistsTracksSaga() {
  yield takeLeading(PLAYLISTS_SUCCESS, function* () {
    yield put(tracksStart());
  });
}

export default function* playlistsSaga(): Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>,
  void,
  unknown
> {
  yield all([playlistsRequestSaga(), playlistsTracksSaga()]);
}
