import { channel } from "redux-saga";
import {
  all,
  AllEffect,
  ForkEffect,
  put,
  takeEvery,
  takeLeading,
} from "redux-saga/effects";
import { getAuthUrl } from "./auth.helpers";
import { authFail, authSuccess } from "./auth.actions";
import {
  AuthFailAction,
  AuthSuccessAction,
  AUTH_FAIL,
  AUTH_REQUEST,
  AUTH_SUCCESS,
} from "./auth.types";

import { profileRequest } from "../profile/profile.actions";
import { playlistsRequest } from "../playlists/playlists.actions";

/* eslint-disable @typescript-eslint/no-explicit-any */
const verifyMessage = (
  obj: unknown
): obj is AuthFailAction | AuthSuccessAction => {
  if (typeof obj !== "object" || obj === null) return false;
  if (Object.keys(obj).length !== 2) return false;
  if (!("type" in obj)) return false;
  if (!("payload" in obj)) return false;
  if ((<any>obj).type !== AUTH_FAIL && (<any>obj).type !== AUTH_SUCCESS)
    return false;

  return typeof (<any>obj).payload === "object" && (<any>obj).payload !== null;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

const windowChannel = channel();

function* authRequestSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLeading(AUTH_REQUEST, () => {
    const left = window.screen.width / 2 - 250;
    const top = window.screen.height / 2 - 370;

    window.open(
      getAuthUrl(),
      "soapify/authWindow",
      `width=500,height=740,left=${left},top=${top}`
    );

    const onMessage = (event: MessageEvent) => {
      const { origin, data } = event;

      if (origin === window.origin && verifyMessage(data)) {
        window.removeEventListener("message", onMessage);
        windowChannel.put(data);
      }
    };

    window.addEventListener("message", onMessage, false);
  });
}

function* authFailSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(AUTH_FAIL, ({ payload }: AuthFailAction) => {
    const { error, state } = payload;

    if (window.opener) {
      window.opener.postMessage(authFail(error, state), window.opener.origin);
      window.close();
    }
  });
}

function* authSuccessSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(AUTH_SUCCESS, function* ({ payload }: AuthSuccessAction) {
    const { access_token, expires_in, state, token_type } = payload;

    if (window.opener) {
      window.opener.postMessage(
        authSuccess(access_token, token_type, expires_in, state),
        window.opener.origin
      );
      window.close();
    } else {
      yield put(profileRequest());
      yield put(playlistsRequest());
    }
  });
}

export function* watchWindowChannel(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(
    windowChannel,
    function* (action: AuthFailAction | AuthSuccessAction) {
      yield put(action);
    }
  );
}

export default function* authSaga(): Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>,
  void,
  unknown
> {
  yield all([
    watchWindowChannel(),
    authRequestSaga(),
    authFailSaga(),
    authSuccessSaga(),
  ]);
}
