import { ErrorAction, ErrorState, ERROR_ADD, ERROR_CLEAR } from "./error.types";

const initialState: ErrorState = { error: false };

export default function errorReducer(
  state = initialState,
  action: ErrorAction
): ErrorState {
  switch (action.type) {
    case ERROR_CLEAR:
      return { ...initialState };
    case ERROR_ADD:
      return { error: true, ...action.payload };
    default:
      return state;
  }
}
