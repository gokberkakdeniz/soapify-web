import { combineReducers } from "redux";

import { authReducer } from "./auth";
import { playlistsReducer } from "./playlists";
import { profileReducer } from "./profile";
import { tracksReducer } from "./tracks";
import { searchReducer } from "./search";
import { errorReducer } from "./error";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  playlists: playlistsReducer,
  tracks: tracksReducer,
  search: searchReducer,
  error: errorReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
