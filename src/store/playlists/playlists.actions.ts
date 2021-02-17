import { PlaylistObject } from "../../types/spotify";
import {
  PlaylistsFailAction,
  PlaylistsRequestAction,
  PlaylistsSuccessAction,
  PLAYLISTS_FAIL,
  PLAYLISTS_REQUEST,
  PLAYLISTS_SUCCESS,
} from "./playlists.types";

export const playlistsRequest = (): PlaylistsRequestAction => ({
  type: PLAYLISTS_REQUEST,
});

export const playlistsFail = (
  status: number,
  message: string
): PlaylistsFailAction => ({
  type: PLAYLISTS_FAIL,
  payload: {
    status,
    message,
  },
});

export const playlistsSuccess = (
  playlists: PlaylistObject[]
): PlaylistsSuccessAction => ({
  type: PLAYLISTS_SUCCESS,
  payload: playlists,
});
