import {
  PlaylistsAction,
  PlaylistState,
  PLAYLISTS_SUCCESS,
} from "./playlists.types";

const initialState: PlaylistState = {};

const playlistsReducer = (
  state = initialState,
  action: PlaylistsAction
): PlaylistState => {
  switch (action.type) {
    case PLAYLISTS_SUCCESS: {
      const entries = action.payload.map(
        ({ href, id, name, tracks, uri, snapshot_id }) => [
          id,
          {
            href,
            name,
            tracks,
            uri,
            snapshot_id,
          },
        ]
      );
      return Object.fromEntries(entries);
    }
    default:
      return state;
  }
};

export default playlistsReducer;
