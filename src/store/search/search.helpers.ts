import { createSelector } from "reselect";
import memorize from "memoize-one";
import Fuse from "fuse.js";
import { AppState } from "../reducer";

export const flatTracks = createSelector(
  (state: AppState) => state.tracks.data,
  (state: AppState) => state.playlists,
  (tracks, playlists) =>
    Object.entries(tracks).flatMap(([playlistId, playlistTracks], pIndex) =>
      playlistTracks.tracks.map(
        (
          { added_at, name: track_name, album: { artists, name: album_name } },
          tIndex
        ) => ({
          id: `p${pIndex}-t${tIndex}`,
          added_at,
          artists: artists.map((artist) => artist.name),
          album_name,
          track_name,
          playlist_name: playlists[playlistId].name,
        })
      )
    )
);

export type TrackSearchObject = ReturnType<typeof flatTracks>[number];

export type FilterPredicate = (
  fuse: Fuse<TrackSearchObject>,
  text: string
) => TrackSearchObject[];

export const filterInSongs: FilterPredicate = (fuse, text) =>
  fuse.search({ track_name: text }).map(({ item }) => item);

export const filterInAlbums: FilterPredicate = (fuse, text) =>
  fuse.search({ album_name: text }).map(({ item }) => item);

export const filterInArtists: FilterPredicate = (fuse, text) =>
  fuse.search({ artists: text }).map(({ item }) => item);

export const filterInAll: FilterPredicate = (fuse, text) =>
  fuse.search(text).map(({ item }) => item);

export const createIndex = memorize((tracks: TrackSearchObject[]) => {
  const fuse = new Fuse<TrackSearchObject>(tracks, {
    keys: ["track_name", "album_name", "artists"],
    threshold: 0.2,
  });

  return fuse;
});
