import { createSelector } from "reselect";
import memorize from "memoize-one";
import Fuse from "fuse.js";
import { AppState } from "../reducer";

export const flatTracks = createSelector(
  (state: AppState) => state.tracks.data,
  (state: AppState) => state.playlists,
  (state: AppState) => state.liked.tracks,
  (tracks, playlists, likedTracks) => {
    const likedUris = new Set(likedTracks.map((t) => t.uri));
    const playlistUris = new Set<string>();

    const playlistTrackItems = Object.entries(tracks).flatMap(
      ([playlistId, playlistTracks], pIndex) => {
        const playlist = playlists[playlistId];
        if (!playlist) return [];
        return playlistTracks.tracks.map(
          (
            {
              added_at,
              name: track_name,
              album: { artists, name: album_name },
              uri,
            },
            tIndex,
          ) => {
            playlistUris.add(uri);
            return {
              id: `p${pIndex}-t${tIndex}`,
              added_at,
              artists: artists.map((artist) => artist.name),
              album_name,
              track_name,
              playlist_name: playlist.name,
              liked: likedUris.has(uri),
            };
          },
        );
      },
    );

    const likedOnlyItems = likedTracks
      .filter((t) => !playlistUris.has(t.uri))
      .map(
        (
          { added_at, name: track_name, album: { artists, name: album_name } },
          tIndex,
        ) => ({
          id: `liked-${tIndex}`,
          added_at,
          artists: artists.map((artist) => artist.name),
          album_name,
          track_name,
          playlist_name: "",
          liked: true,
        }),
      );

    return [...playlistTrackItems, ...likedOnlyItems];
  },
);

export type TrackSearchObject = ReturnType<typeof flatTracks>[number];

export type FilterPredicate = (
  fuse: Fuse<TrackSearchObject>,
  text: string,
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
