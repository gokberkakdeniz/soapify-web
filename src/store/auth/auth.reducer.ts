import { AuthAction, AuthState, AUTH_FAIL, AUTH_SUCCESS } from "./auth.types";

const authReducer = (
  state: AuthState = { status: "initial" },
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AUTH_SUCCESS: {
      const { expires_in, access_token, token_type } = action.payload;
      const expires = Date.now() + expires_in * 1000;

      return { status: "success", access_token, token_type, expires };
    }
    case AUTH_FAIL:
      return { status: "fail", ...action.payload };
    default:
      return state;
  }
};

export default authReducer;
