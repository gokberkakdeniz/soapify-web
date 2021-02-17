import {
  PROFILE_REQUEST,
  PROFILE_FAIL,
  PROFILE_SUCCESS,
  ProfileRequestAction,
  ProfileFailAction,
  ProfileSuccessAction,
} from "./profile.types";

export const profileRequest = (): ProfileRequestAction => ({
  type: PROFILE_REQUEST,
});

export const profileFail = (
  status: number,
  message: string
): ProfileFailAction => ({
  type: PROFILE_FAIL,
  payload: {
    status,
    message,
  },
});

export const profileSuccess = (
  display_name: string,
  id: string,
  type: string,
  uri: string,
  country: string
): ProfileSuccessAction => ({
  type: PROFILE_SUCCESS,
  payload: {
    display_name,
    id,
    type,
    uri,
    country,
  },
});
