import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  takeEvery,
} from "redux-saga/effects";
import {
  ProfileFailAction,
  PROFILE_FAIL,
  PROFILE_REQUEST,
} from "./profile.types";
import { profileFail, profileSuccess } from "./profile.actions";
import { get } from "../../helpers/fetch";
import { ErrorObject, UserObject } from "../../types/spotify";

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
        const { display_name, id, type, uri, country, images } = res;
        const image = images?.[0]?.url ?? "";
        yield put(profileSuccess(display_name, id, type, uri, country, image));
      }
    } catch (err) {
      yield put(profileFail(-1, (err as Error).message));
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
  yield all([profileRequestSaga(), profileFailSaga()]);
}
