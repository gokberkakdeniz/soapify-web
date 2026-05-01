/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  ChangeEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Input } from "../../../components";
import { searchStart } from "../../../store/search";
import { ToggleSearchCriteria } from ".";

interface SearchProps {
  loading: boolean;
}

const searchTypes = ["anything", "song", "artist", "album"] as const;

function Search({
  loading,
  children,
}: PropsWithChildren<SearchProps>): JSX.Element {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.auth.status === "success");
  const reduxQuery = useAppSelector((state) => state.search.query);
  const reduxType = useAppSelector((state) => state.search.type);

  const [searchType, setSearchType] = useState(
    () => searchTypes.indexOf(reduxType as (typeof searchTypes)[number]) || 0,
  );

  useEffect(() => {
    const idx = searchTypes.indexOf(reduxType as (typeof searchTypes)[number]);
    if (idx !== -1) setSearchType(idx);
  }, [reduxType]);

  const onSearchQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (loggedIn) {
        dispatch(searchStart(searchTypes[searchType], event.target.value));
      }
    },
    [dispatch, searchType, loggedIn],
  );

  useEffect(() => {
    if (loggedIn) {
      dispatch(searchStart(searchTypes[searchType], reduxQuery));
    }
    // only re-run when searchType changes (query is already in Redux)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, searchType, loggedIn]);

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
        search{" "}
        <ToggleSearchCriteria
          searchTypes={searchTypes}
          searchType={searchType}
          setSearchType={setSearchType}
        />{" "}
        within your Spotify playlists
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
              onClick={() => dispatch(searchStart(searchTypes[searchType], ""))}
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
