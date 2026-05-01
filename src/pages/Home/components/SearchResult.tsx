/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { List, RowComponentProps } from "react-window";
import { useAppSelector } from "../../../hooks/redux";

import { TrackSearchObject } from "../../../store/search/search.helpers";
import Track from "./Track";

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

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <div
        css={css`
          text-align: ${status === "found" ? "right" : "center"};
        `}
      >
        {status === "not_found" && "No results found."}
        {status === "found" && (
          <div
            css={css`
              text-align: right;
            `}
          >
            Total: {result.length}
          </div>
        )}
      </div>
      <div>
        <List<RowData>
          rowCount={result.length}
          rowHeight={56}
          rowComponent={RowComponent}
          rowProps={{ result }}
          style={{ height: 560, width: "100%" }}
        />
      </div>
    </div>
  );
}

export default SearchResult;
