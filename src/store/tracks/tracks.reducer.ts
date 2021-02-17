import {
  TracksAction,
  TracksState,
  TRACKS_RESET,
  TRACKS_RESTORE,
  TRACKS_SUCCESS,
  TRACKS_CACHED,
  TRACKS_START,
  TRACKS_REQUEST,
  TRACKS_PERSIST,
} from "./tracks.types";

const initialState: TracksState = {
  status: "idle",
  progress: {
    index: 0,
    id: "",
    type: "fetched",
  },
  data: {},
};

const tracksReducer = (
  state = initialState,
  action: TracksAction
): TracksState => {
  switch (action.type) {
    case TRACKS_RESET:
      return { ...initialState };
    case TRACKS_RESTORE:
      return {
        status: "loaded",
        progress: initialState.progress,
        data: action.payload,
      };
    case TRACKS_PERSIST:
      return {
        ...state,
        status: "loaded",
      };
    case TRACKS_START:
      return {
        status: "loading",
        progress: initialState.progress,
        data: state.data,
      };
    case TRACKS_REQUEST: {
      return {
        ...state,
        progress: {
          id: action.payload.id,
          index: state.progress.index,
          type: "fetching",
        },
      };
    }
    case TRACKS_SUCCESS:
    case TRACKS_CACHED: {
      const { id, snapshot_id, tracks } = action.payload;
      const prevTracks = state.data[id]?.tracks || [];

      return {
        status: "loading",
        progress: {
          id: action.payload.id,
          index: state.progress.index + 1,
          type: "fetched",
        },
        data: {
          ...state.data,
          [id]: { snapshot_id, tracks: [...prevTracks, ...tracks] },
        },
      };
    }
    default:
      return state;
  }
};

export default tracksReducer;
