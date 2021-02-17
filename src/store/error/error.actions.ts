import {
  ErrorAddAction,
  ErrorClearAction,
  ERROR_ADD,
  ERROR_CLEAR,
} from "./error.types";

export const errorAdd = (message: string): ErrorAddAction => ({
  type: ERROR_ADD,
  payload: { message },
});

export const errorClear = (): ErrorClearAction => ({
  type: ERROR_CLEAR,
});
