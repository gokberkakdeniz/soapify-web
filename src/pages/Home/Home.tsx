/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAppSelector } from "../../hooks/redux";
import { ProgressBar } from "../../components";
import { Search, SearchResult } from "./components";
import tracksLoadingSelector from "./helpers/tracks-loading-selector";

function Home(): JSX.Element {
  const { loading, playlistName, percentage } = useAppSelector(
    tracksLoadingSelector,
  );

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
      `}
    >
      <Search loading={loading}>
        <ProgressBar
          percentage={percentage}
          label={playlistName}
          title="Fetching tracks..."
        />
      </Search>
      <SearchResult />
    </div>
  );
}

export default Home;
