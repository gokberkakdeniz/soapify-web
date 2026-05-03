import {
  SearchAction,
  SearchState,
  SEARCH_END,
  SEARCH_START,
} from "./search.types";

const initialState: SearchState = {
  status: "idle",
  result: [],
  query: "",
};

function searchReducer(
  state = initialState,
  action: SearchAction,
): SearchState {
  switch (action.type) {
    case SEARCH_START: {
      const { query } = action.payload;
      return query === ""
        ? { ...initialState }
        : { status: "searching", result: [], query };
    }

    case SEARCH_END:
      return {
        ...state,
        status: action.payload.length > 0 ? "found" : "not_found",
        result: action.payload,
      };
    default:
      return state;
  }
}

export default searchReducer;
