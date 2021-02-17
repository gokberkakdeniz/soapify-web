import {
  all,
  AllEffect,
  ForkEffect,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import { searchEnd } from "./search.actions";
import {
  flatTracks,
  filterInAlbums,
  filterInArtists,
  filterInSongs,
  FilterPredicate,
  filterInAll,
  createIndex,
} from "./search.helpers";
import { SearchStartAction, SearchType, SEARCH_START } from "./search.types";

const searcher: Record<SearchType, FilterPredicate> = {
  album: filterInAlbums,
  song: filterInSongs,
  artist: filterInArtists,
  anything: filterInAll,
};

function* searchStartSaga() {
  yield takeLatest(SEARCH_START, function* ({ payload }: SearchStartAction) {
    const { type, query } = payload;

    if (query !== "") {
      const tracks: ReturnType<typeof flatTracks> = yield select(flatTracks);
      const fuse = createIndex(tracks);

      const result = searcher[type](fuse, query);

      yield put(searchEnd(result));
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
