/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.status === "success");
  const [searchType, setSearchType] = useState(0);
  const [searchQuery, setQuery] = useState("");

  const onSearchQueryChange = useCallback(
    (event) => setQuery(event.target.value),
    [setQuery]
  );

  useEffect(() => {
    if (loggedIn) {
      dispatch(searchStart(searchTypes[searchType], searchQuery));
    }
  }, [dispatch, searchType, searchQuery, loggedIn]);

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
        <Input
          name="searchQuery"
          type="text"
          onChange={onSearchQueryChange}
          placeholder={loggedIn ? "" : "Login to search..."}
        />
      )}
    </div>
  );
}

export default Search;
