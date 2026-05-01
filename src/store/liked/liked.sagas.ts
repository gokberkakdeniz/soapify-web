import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  takeLeading,
} from "redux-saga/effects";
import { get } from "../../helpers/fetch";
import { ErrorObject, TrackObject } from "../../types/spotify";
import { likedFail, likedSuccess } from "./liked.actions";
import { LIKED_REQUEST } from "./liked.types";

type GetLikedTracksResponse =
  | {
      items: { track: Omit<TrackObject, "added_at">; added_at: string }[];
      next: string | null;
    }
  | ErrorObject;

function* likedRequestSaga() {
  yield takeLeading(LIKED_REQUEST, function* () {
    const tracks: TrackObject[] = [];
    let path: string | null =
      "/me/tracks?limit=50&fields=items(added_at,track(name,uri,album(name,artists)))";
    let error;

    try {
      while (path) {
        const res: GetLikedTracksResponse = yield call(get, path);
        if ("error" in res) {
          error = res.error;
          break;
        } else {
          res.items.forEach(({ track, added_at }) => {
            if (!track) return;
            tracks.push({ ...track, added_at });
          });
          path = res.next;
        }
      }
    } catch (err) {
      error = {
        status: 0,
        message: (err as Error).message || "soapify/runtime_error",
      };
    }

    if (error) {
      yield put(likedFail(error.status, error.message));
    } else {
      yield put(likedSuccess(tracks));
    }
  });
}

export default function* likedSaga(): Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>,
  void,
  unknown
> {
  yield all([likedRequestSaga()]);
}
