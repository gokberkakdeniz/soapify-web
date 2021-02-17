import { TrackSearchObject } from "./search.helpers";
import {
  SearchEndAction,
  SearchStartAction,
  SearchType,
  SEARCH_END,
  SEARCH_START,
} from "./search.types";

export const searchStart = (
  type: SearchType,
  query: string
): SearchStartAction => ({
  type: SEARCH_START,
  payload: { type, query },
});

export const searchEnd = (result: TrackSearchObject[]): SearchEndAction => ({
  type: SEARCH_END,
  payload: result,
});
