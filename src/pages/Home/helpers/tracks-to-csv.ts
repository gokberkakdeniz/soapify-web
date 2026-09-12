import { TrackSearchObject } from "../../../store/search/search.helpers";

const CSV_HEADERS = [
  "Track URI",
  "Track",
  "Artists",
  "Album",
  "Playlist",
  "Liked",
  "Added At",
];

// eslint-disable-next-line prettier/prettier
const doubleQuotes = (s: string) => s.replace(/"/g, "\"\"");

const escapeCsvField = (value: string): string => {
  if (/[",\n]/.test(value)) {
    return `"${doubleQuotes(value)}"`;
  }
  return value;
};

const toCsvRow = (fields: string[]): string =>
  fields.map(escapeCsvField).join(",");

const tracksToCsv = (tracks: TrackSearchObject[]): string => {
  const rows = tracks.map((track) =>
    toCsvRow([
      track.uri,
      track.track_name,
      track.artists.join(", "),
      track.album_name,
      track.playlist_name,
      track.liked ? "Yes" : "No",
      track.added_at,
    ]),
  );

  return [toCsvRow(CSV_HEADERS), ...rows].join("\r\n");
};

export default tracksToCsv;
