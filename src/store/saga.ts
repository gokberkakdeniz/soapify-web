/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all } from "redux-saga/effects";

import { authSagas } from "./auth";
import { playlistsSagas } from "./playlists";
import { profileSagas } from "./profile";
import { searchSagas } from "./search";
import { tracksSagas } from "./tracks";
import { errorSagas } from "./error";

function* rootSaga() {
  yield all([
    authSagas(),
    profileSagas(),
    playlistsSagas(),
    tracksSagas(),
    searchSagas(),
    errorSagas(),
  ]);
}

export default rootSaga;
