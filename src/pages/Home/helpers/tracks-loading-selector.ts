import { createSelector } from "reselect";
import { clamp } from "../../../helpers";
import { AppState } from "../../../store/reducer";

const tracksLoadingSelector = createSelector(
  (state: AppState) => state.tracks.status === "loading",
  (state: AppState) => state.tracks.progress,
  (state: AppState) => state.playlists,
  (state: AppState) => Object.keys(state.playlists).length,
  (loading, { id, index, type }, playlists, total) => ({
    loading,
    playlistName: playlists[id]?.name,
    type,
    percentage: clamp(Math.floor((index / (total || 1)) * 100), 0, 100),
  })
);

export default tracksLoadingSelector;
