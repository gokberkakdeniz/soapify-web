import {
  SearchAction,
  SearchState,
  SEARCH_END,
  SEARCH_START,
} from "./search.types";

const initialState: SearchState = {
  status: "idle",
  result: [],
};

function searchReducer(
  state = initialState,
  action: SearchAction
): SearchState {
  switch (action.type) {
    case SEARCH_START: {
      const { query } = action.payload;
      return query === ""
        ? { status: "idle", result: [] }
        : { status: "searching", result: [] };
    }

    case SEARCH_END:
      return {
        status: action.payload.length > 0 ? "found" : "not_found",
        result: action.payload,
      };
    default:
      return state;
  }
}

export default searchReducer;
