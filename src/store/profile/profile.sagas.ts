import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  select,
  takeEvery,
} from "redux-saga/effects";
import {
  ProfileFailAction,
  PROFILE_FAIL,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
} from "./profile.types";
import { profileFail, profileSuccess } from "./profile.actions";
import { get } from "../../helpers/fetch";
import { ErrorObject, UserObject } from "../../types/spotify";
import { AppState } from "../reducer";
import { tracksRestore } from "../tracks";

export function* profileRequestSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(PROFILE_REQUEST, function* () {
    try {
      const res: ErrorObject | UserObject = yield call(get, "/me");
      if (res && "error" in res) {
        const { status, message } = res.error;
        yield put(profileFail(status, message));
      } else {
        const { display_name, id, type, uri, country } = res;
        yield put(profileSuccess(display_name, id, type, uri, country));
      }
    } catch (err) {
      yield put(profileFail(-1, (err as Error).message));
    }
  });
}

function* profileSuccessSaga() {
  yield takeEvery(PROFILE_SUCCESS, function* () {
    const userId: string = yield select((state: AppState) => state.profile.id);
    try {
      // @ts-expect-error
      const tracks = JSON.parse(localStorage.getItem(`tracks.${userId}`));
      if (typeof tracks === "object" && tracks != null) {
        yield put(tracksRestore(tracks));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
}

export function* profileFailSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(PROFILE_FAIL, (action: ProfileFailAction) => {
    // eslint-disable-next-line no-console
    console.log(action);
  });
}

export default function* profileSaga(): Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>,
  void,
  unknown
> {
  yield all([profileRequestSaga(), profileSuccessSaga(), profileFailSaga()]);
}
