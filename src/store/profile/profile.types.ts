import { ErrorObject, UserObject } from "../../types/spotify";

export const PROFILE_REQUEST = "profile/request";
export const PROFILE_FAIL = "profile/fail";
export const PROFILE_SUCCESS = "profile/success";

export interface ProfileRequestAction {
  type: typeof PROFILE_REQUEST;
}

export interface ProfileFailAction {
  type: typeof PROFILE_FAIL;
  payload: ErrorObject["error"];
}

export interface ProfileSuccessAction {
  type: typeof PROFILE_SUCCESS;
  payload: UserObject;
}

export type ProfileState = UserObject & { loaded: boolean };

export type ProfileAction =
  | ProfileRequestAction
  | ProfileFailAction
  | ProfileSuccessAction;
