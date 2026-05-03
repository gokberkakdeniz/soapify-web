import {
  all,
  AllEffect,
  delay,
  ForkEffect,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import { searchEnd } from "./search.actions";
import { createIndex, filterWithDSL, flatTracks } from "./search.helpers";
import { SearchStartAction, SEARCH_START } from "./search.types";

function* searchStartSaga() {
  yield takeLatest(SEARCH_START, function* ({ payload }: SearchStartAction) {
    yield delay(150);
    const { query } = payload;
    if (query !== "") {
      const tracks: ReturnType<typeof flatTracks> = yield select(flatTracks);
      const fuse = createIndex(tracks);
      yield put(searchEnd(filterWithDSL(fuse, query)));
    }
  });
}

export default function* searchSagas(): Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>,
  void,
  unknown
> {
  yield all([searchStartSaga()]);
}
