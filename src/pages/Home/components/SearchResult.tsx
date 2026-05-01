/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useState } from "react";
import { List, RowComponentProps } from "react-window";
import { useAppSelector } from "../../../hooks/redux";

import {
  TrackSearchObject,
  flatTracks,
} from "../../../store/search/search.helpers";
import Track from "./Track";
import ToggleSearchCriteria from "./ToggleSearchCriteria";

type SortKey = "added_at" | "artist";
type SortDir = "asc" | "desc";

const SORT_KEYS = ["Added At", "Name"] as const;
const SORT_DIRS = ["↑", "↓"] as const;

function sortTracks(
  tracks: TrackSearchObject[],
  key: SortKey,
  dir: SortDir,
): TrackSearchObject[] {
  const sorted = [...tracks].sort((a, b) => {
    if (key === "added_at") {
      if (a.added_at < b.added_at) return -1;
      if (a.added_at > b.added_at) return 1;
      return 0;
    }
    const artistA = a.artists[0] ?? "";
    const artistB = b.artists[0] ?? "";
    const cmp = artistA.localeCompare(artistB);
    return cmp !== 0 ? cmp : a.track_name.localeCompare(b.track_name);
  });
  return dir === "desc" ? sorted.reverse() : sorted;
}

type RowData = { result: TrackSearchObject[] };

function RowComponent({ index, style, result }: RowComponentProps<RowData>) {
  return (
    <div style={style}>
      <Track track={result[index]} />
    </div>
  );
}

function SearchResult(): JSX.Element {
  const { status, result } = useAppSelector((state) => state.search);
  const allTracks = useAppSelector(flatTracks);
  const isTracksLoaded = useAppSelector(
    (state) => state.tracks.status === "loaded",
  );

  const [sortKeyIndex, setSortKeyIndex] = useState(0);
  const [sortDirIndex, setSortDirIndex] = useState(1);

  const isIdle = status === "idle";
  const baseTracks = isIdle ? allTracks : result;

  const sortKey: SortKey = sortKeyIndex === 0 ? "added_at" : "artist";
  const sortDir: SortDir = sortDirIndex === 0 ? "asc" : "desc";

  const tracks = useMemo(
    () => sortTracks(baseTracks, sortKey, sortDir),
    [baseTracks, sortKey, sortDir],
  );

  const showMeta =
    status === "found" || (isIdle && isTracksLoaded && tracks.length > 0);

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <div
        css={css`
          text-align: ${showMeta ? "right" : "center"};
        `}
      >
        {status === "not_found" && "No results found."}
        {showMeta && (
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <span>
              <ToggleSearchCriteria
                searchTypes={SORT_KEYS}
                searchType={sortKeyIndex}
                setSearchType={setSortKeyIndex}
              />{" "}
              <ToggleSearchCriteria
                searchTypes={SORT_DIRS}
                searchType={sortDirIndex}
                setSearchType={setSortDirIndex}
              />
            </span>
            <span>Total: {tracks.length}</span>
          </div>
        )}
      </div>
      <div>
        <List<RowData>
          rowCount={tracks.length}
          rowHeight={56}
          rowComponent={RowComponent}
          rowProps={{ result: tracks }}
          style={{ height: 560, width: "100%" }}
        />
      </div>
    </div>
  );
}

export default SearchResult;
