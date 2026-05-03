/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, PropsWithChildren, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Input } from "../../../components";
import { searchStart } from "../../../store/search";

interface SearchProps {
  loading: boolean;
}

function Search({
  loading,
  children,
}: PropsWithChildren<SearchProps>): JSX.Element {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.auth.status === "success");
  const reduxQuery = useAppSelector((state) => state.search.query);

  const onSearchQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (loggedIn) {
        dispatch(searchStart(event.target.value));
      }
    },
    [dispatch, loggedIn],
  );

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      `}
    >
      <h1
        css={css`
          user-select: none;
          font-size: 2rem;
          text-align: center;
        `}
      >
        search within your Spotify account
      </h1>
      {loading ? (
        children
      ) : (
        <div
          css={css`
            position: relative;
            display: inline-flex;
            align-items: center;
          `}
        >
          <Input
            name="searchQuery"
            type="text"
            value={reduxQuery}
            onChange={onSearchQueryChange}
            placeholder={loggedIn ? "" : "Login to search..."}
            css={css`
              padding-right: ${reduxQuery ? "1.75rem" : "0.5rem"};
            `}
          />
          {reduxQuery && (
            <button
              type="button"
              aria-label="Temizle"
              onClick={() => dispatch(searchStart(""))}
              css={css`
                position: absolute;
                right: 1rem;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                line-height: 1;
                color: inherit;
                opacity: 0.5;
                :hover {
                  opacity: 1;
                }
              `}
            >
              ✕
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
