/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { List, RowComponentProps } from "react-window";
import { useAppSelector } from "../../../hooks/redux";
import { Copy, Download } from "../../../components/Icons";

import {
  TrackSearchObject,
  flatTracks,
  isDataLoaded,
} from "../../../store/search/search.helpers";
import tracksToCsv from "../helpers/tracks-to-csv";
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

const iconButton = css`
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
`;

type RowData = { result: TrackSearchObject[] };

function RowComponent({ index, style, result }: RowComponentProps<RowData>) {
  return (
    <div style={style}>
      <Track track={result[index]} />
    </div>
  );
}

function SearchResult(): JSX.Element {
  const theme = useTheme();
  const { status, result } = useAppSelector((state) => state.search);
  const allTracks = useAppSelector(flatTracks);
  const isTracksLoaded = useAppSelector(isDataLoaded);

  const [sortKeyIndex, setSortKeyIndex] = useState(0);
  const [sortDirIndex, setSortDirIndex] = useState(1);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(copyTimeoutRef.current), []);

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

  const handleCopyCsv = async () => {
    try {
      await navigator.clipboard.writeText(tracksToCsv(tracks));
      setCopied(true);
      window.clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadCsv = () => {
    const blob = new Blob([`\uFEFF${tracksToCsv(tracks)}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `soapify-tracks-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
          <span>
            <span
              css={css`
                display: inline-flex;
                align-items: center;
                gap: 4px;
                vertical-align: middle;
              `}
            >
              <button
                type="button"
                onClick={handleCopyCsv}
                title={copied ? "Copied!" : "Copy as CSV"}
                aria-label={copied ? "Copied!" : "Copy as CSV"}
                css={css`
                  ${iconButton}
                  color: ${copied
                    ? theme.colors.accent.primary
                    : theme.colors.text.primary};
                  :hover {
                    color: ${theme.colors.accent.primary};
                  }
                `}
              >
                <Copy />
              </button>
              <button
                type="button"
                onClick={handleDownloadCsv}
                title="Export as CSV"
                aria-label="Export as CSV"
                css={css`
                  ${iconButton}
                  color: ${theme.colors.text.primary};
                  :hover {
                    color: ${theme.colors.accent.primary};
                  }
                `}
              >
                <Download />
              </button>
            </span>
            <span
              aria-hidden="true"
              css={css`
                display: inline-block;
                width: 1px;
                height: 14px;
                margin: 0 10px;
                vertical-align: middle;
                background-color: ${theme.colors.background.terniary};
              `}
            />
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
      {showMeta && (
        <div
          css={css`
            text-align: right;
          `}
        >
          Total: {tracks.length}
        </div>
      )}
    </div>
  );
}

export default SearchResult;
