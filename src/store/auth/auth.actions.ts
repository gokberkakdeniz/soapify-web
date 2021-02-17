import {
  AUTH_REQUEST,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AuthRequestAction,
  AuthFailAction,
  AuthSuccessAction,
} from "./auth.types";

export const authRequest = (): AuthRequestAction => ({
  type: AUTH_REQUEST,
});

export const authFail = (error: string, state: string): AuthFailAction => ({
  type: AUTH_FAIL,
  payload: {
    error,
    state,
  },
});

export const authSuccess = (
  access_token: string,
  token_type: string,
  expires_in: number,
  state: string
): AuthSuccessAction => ({
  type: AUTH_SUCCESS,
  payload: {
    access_token,
    token_type,
    expires_in,
    state,
  },
});
