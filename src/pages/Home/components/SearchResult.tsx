/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { FixedSizeList } from "react-window";

import Track from "./Track";

function SearchResult(): JSX.Element {
  const { status, result } = useSelector((state) => state.search);

  const renderRow = useCallback(
    ({ index, style }) => (
      <div style={style}>
        <Track track={result[index]} />
      </div>
    ),
    [result]
  );

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
        <FixedSizeList
          height={560}
          itemCount={result.length}
          itemSize={56}
          width="100%"
        >
          {renderRow}
        </FixedSizeList>
      </div>
    </div>
  );
}

export default SearchResult;
