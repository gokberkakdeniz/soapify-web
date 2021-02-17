import { TrackSearchObject } from "./search.helpers";

export const SEARCH_START = "search/start";
export const SEARCH_END = "search/end";

export type SearchStatus = "idle" | "searching" | "found" | "not_found";
export type SearchType = "song" | "album" | "artist" | "anything";

export interface SearchStartAction {
  type: typeof SEARCH_START;
  payload: {
    type: SearchType;
    query: string;
  };
}

export interface SearchEndAction {
  type: typeof SEARCH_END;
  payload: TrackSearchObject[];
}

export interface SearchState {
  status: SearchStatus;
  result: TrackSearchObject[];
}

export type SearchAction = SearchStartAction | SearchEndAction;
