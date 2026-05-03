import { createSelector } from "reselect";
import memorize from "memoize-one";
import Fuse from "fuse.js";
import { AppState } from "../reducer";
import { ArtistObject } from "../../types/spotify";

export const isDataLoaded = (state: AppState): boolean =>
  state.tracks.status === "loaded" && state.liked.status === "loaded";

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
              uri,
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
          {
            added_at,
            uri,
            name: track_name,
            album: { artists, name: album_name },
          },
          tIndex,
        ) => ({
          id: `liked-${tIndex}`,
          added_at,
          uri,
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

export const createIndex = memorize((tracks: TrackSearchObject[]) => {
  return new Fuse<TrackSearchObject>(tracks, {
    keys: [
      "track_name",
      "album_name",
      "artists",
      "playlist_name",
      { name: "liked", getFn: (t) => String(t.liked) },
    ],
    useExtendedSearch: true,
    ignoreLocation: true,
    threshold: 0.2,
  });
});

interface ParsedQuery {
  album?: string;
  track?: string;
  artist?: string;
  playlist?: string;
  library?: boolean;
  text: string;
}

const parseQuery = (query: string): ParsedQuery => {
  const result: ParsedQuery = { text: "" };
  let remaining = query;

  remaining = remaining.replace(
    /(album|track|artist|playlist):(?:"((?:[^"\\]|\\.)*)"|(\S+))/g,
    (_, field: string, quoted: string, unquoted: string) => {
      (result as unknown as Record<string, unknown>)[field] = quoted
        ? // eslint-disable-next-line quotes
          quoted.replace(/\\"/g, '"')
        : unquoted;
      return "";
    },
  );

  remaining = remaining.replace(/\+library\b/g, () => {
    result.library = true;
    return "";
  });
  remaining = remaining.replace(/-library\b/g, () => {
    result.library = false;
    return "";
  });

  result.text = remaining.trim();
  return result;
};

export interface ArtistStat {
  id: string;
  name: string;
  trackCount: number;
  likedCount: number;
}

export const artistStats = createSelector(
  (state: AppState) => state.tracks.data,
  (state: AppState) => state.liked.tracks,
  (tracksData, likedTracks): ArtistStat[] => {
    const likedUris = new Set(likedTracks.map((t) => t.uri));
    const playlistUris = new Set<string>();
    const statsMap = new Map<string, ArtistStat>();

    const accumulate = (artist: ArtistObject, isLiked: boolean) => {
      const existing = statsMap.get(artist.id);
      if (existing) {
        existing.trackCount += 1;
        if (isLiked) existing.likedCount += 1;
      } else {
        statsMap.set(artist.id, {
          id: artist.id,
          name: artist.name,
          trackCount: 1,
          likedCount: isLiked ? 1 : 0,
        });
      }
    };

    Object.values(tracksData).forEach(({ tracks }) =>
      tracks.forEach((track) => {
        playlistUris.add(track.uri);
        const isLiked = likedUris.has(track.uri);
        track.album.artists.forEach((a) => accumulate(a, isLiked));
      }),
    );

    likedTracks
      .filter((t) => !playlistUris.has(t.uri))
      .forEach((track) =>
        track.album.artists.forEach((a) => accumulate(a, true)),
      );

    return [...statsMap.values()].sort((a, b) => b.trackCount - a.trackCount);
  },
);

export const filterWithDSL = (
  fuse: Fuse<TrackSearchObject>,
  query: string,
): TrackSearchObject[] => {
  if (!query.trim()) return [];

  const parsed = parseQuery(query);

  const conditions: object[] = [];
  if (parsed.library !== undefined)
    conditions.push({ liked: parsed.library ? "=true" : "=false" });
  if (parsed.album) conditions.push({ album_name: parsed.album });
  if (parsed.track) conditions.push({ track_name: parsed.track });
  if (parsed.artist) conditions.push({ artists: parsed.artist });
  if (parsed.playlist) conditions.push({ playlist_name: parsed.playlist });
  if (parsed.text)
    conditions.push({
      $or: [
        { track_name: parsed.text },
        { album_name: parsed.text },
        { artists: parsed.text },
        { playlist_name: parsed.text },
      ],
    });

  if (!conditions.length) return [];

  return fuse
    .search(conditions.length === 1 ? conditions[0] : { $and: conditions })
    .map(({ item }) => item);
};
