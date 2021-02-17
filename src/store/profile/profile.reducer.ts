import { ProfileAction, ProfileState, PROFILE_SUCCESS } from "./profile.types";

const initialState: ProfileState = {
  loaded: false,
  display_name: "",
  id: "",
  type: "",
  uri: "",
  country: "",
};

const profileReducer = (
  state = initialState,
  action: ProfileAction
): ProfileState => {
  switch (action.type) {
    case PROFILE_SUCCESS: {
      const { display_name, id, type, uri, country } = action.payload;
      return { loaded: true, display_name, id, type, uri, country };
    }
    default:
      return state;
  }
};

export default profileReducer;
