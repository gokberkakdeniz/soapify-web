import { TrackSearchObject } from "./search.helpers";
import {
  SearchEndAction,
  SearchStartAction,
  SEARCH_END,
  SEARCH_START,
} from "./search.types";

export const searchStart = (query: string): SearchStartAction => ({
  type: SEARCH_START,
  payload: { query },
});

export const searchEnd = (result: TrackSearchObject[]): SearchEndAction => ({
  type: SEARCH_END,
  payload: result,
});
