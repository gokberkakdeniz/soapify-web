import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  select,
  takeLeading,
} from "redux-saga/effects";
import { get } from "../../helpers/fetch";
import { ErrorObject, TrackObject } from "../../types/spotify";
import { AppState } from "../reducer";
import { likedFail, likedPersist, likedSuccess } from "./liked.actions";
import { LIKED_PERSIST, LIKED_REQUEST } from "./liked.types";

type GetLikedTracksResponse =
  | {
      total: number;
      items: { track: Omit<TrackObject, "added_at">; added_at: string }[];
      next: string | null;
    }
  | ErrorObject;

const FIRST_PAGE_URL =
  "/me/tracks?limit=50&fields=total,next,items(added_at,track(name,uri,album(name,artists)))";

function* likedRequestSaga() {
  yield takeLeading(LIKED_REQUEST, function* () {
    const userId: string = yield select((state: AppState) => state.profile.id);

    const cachedTotal = localStorage.getItem(`liked_total.${userId}`);
    const cachedLastAdded = localStorage.getItem(`liked_last_added.${userId}`);

    const tracks: TrackObject[] = [];
    let error;

    try {
      const firstRes: GetLikedTracksResponse = yield call(get, FIRST_PAGE_URL);

      if ("error" in firstRes) {
        const { status, message } = firstRes.error;
        yield put(likedFail(status, message));
        return;
      }

      const total = String(firstRes.total ?? "");
      const lastAdded = firstRes.items[0]?.added_at ?? "";

      if (
        cachedTotal !== null &&
        total === cachedTotal &&
        lastAdded === cachedLastAdded
      ) {
        const raw = localStorage.getItem(`liked.${userId}`);
        const cached: TrackObject[] | null = raw ? JSON.parse(raw) : null;
        if (Array.isArray(cached)) {
          yield put(likedSuccess(cached));
          return;
        }
      }

      firstRes.items.forEach(({ track, added_at }) => {
        if (!track) return;
        tracks.push({ ...track, added_at });
      });

      let path: string | null = firstRes.next;
      while (path) {
        const res: GetLikedTracksResponse = yield call(get, path);
        if ("error" in res) {
          error = res.error;
          break;
        }
        res.items.forEach(({ track, added_at }) => {
          if (!track) return;
          tracks.push({ ...track, added_at });
        });
        path = res.next;
      }

      if (!error) {
        localStorage.setItem(`liked_total.${userId}`, total);
        localStorage.setItem(`liked_last_added.${userId}`, lastAdded);
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
      yield put(likedPersist());
    }
  });
}

function* likedPersistSaga() {
  yield takeLeading(LIKED_PERSIST, function* () {
    const userId: string = yield select((state: AppState) => state.profile.id);
    const tracks: TrackObject[] = yield select(
      (state: AppState) => state.liked.tracks,
    );
    localStorage.setItem(`liked.${userId}`, JSON.stringify(tracks));
  });
}

export default function* likedSaga(): Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>,
  void,
  unknown
> {
  yield all([likedRequestSaga(), likedPersistSaga()]);
}
