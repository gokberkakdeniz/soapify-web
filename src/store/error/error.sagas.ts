/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from "redux";
import { ForkEffect, put, takeEvery } from "redux-saga/effects";
import { errorAdd } from "./error.actions";

function* watchErrorsSaga() {
  yield takeEvery(
    (action: Action) => /\/fail$/.test(action.type),
    function* (action: Record<string, any>) {
      if ("payload" in action) {
        yield put(errorAdd(action.payload.message || action.payload.error));
      }
    }
  );
}

export default function* errorSagas(): Generator<
  Generator<ForkEffect<never>, void, unknown>,
  void,
  unknown
> {
  yield watchErrorsSaga();
}
