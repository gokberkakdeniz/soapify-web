export const AUTH_REQUEST = "auth/request";
export const AUTH_FAIL = "auth/fail";
export const AUTH_SUCCESS = "auth/success";

export interface AuthSuccessResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  state: string;
}

export interface AuthFailResponse {
  error: string;
  state: string;
}

export interface AuthRequestAction {
  type: typeof AUTH_REQUEST;
}

export interface AuthFailAction {
  type: typeof AUTH_FAIL;
  payload: AuthFailResponse;
}

export interface AuthSuccessAction {
  type: typeof AUTH_SUCCESS;
  payload: AuthSuccessResponse;
}

interface AuthSuccessState {
  status: "success";
  access_token: string;
  token_type: string;
  expires: number;
}

interface AuthFailState {
  status: "fail";
  error: string;
  state: string;
}

interface AuthInitialState {
  status: "initial";
}

export type AuthState = AuthInitialState | AuthFailState | AuthSuccessState;

export type AuthAction = AuthRequestAction | AuthFailAction | AuthSuccessAction;
