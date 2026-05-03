import {
  LikedAction,
  LikedState,
  LIKED_FAIL,
  LIKED_PERSIST,
  LIKED_REQUEST,
  LIKED_SUCCESS,
} from "./liked.types";

const initialState: LikedState = {
  status: "idle",
  tracks: [],
};

const likedReducer = (
  state = initialState,
  action: LikedAction,
): LikedState => {
  switch (action.type) {
    case LIKED_REQUEST:
      return { ...state, status: "loading" };
    case LIKED_SUCCESS:
      return { status: "loaded", tracks: action.payload };
    case LIKED_FAIL:
      return { ...state, status: "loaded" };
    case LIKED_PERSIST:
      return { ...state, status: "loaded" };
    default:
      return state;
  }
};

export default likedReducer;
