/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSelector } from "react-redux";
import { ProgressBar } from "../../components";
import { Search, SearchResult } from "./components";
import tracksLoadingSelector from "./helpers/tracks-loading-selector";

const Home = (): JSX.Element => {
  const { loading, playlistName, percentage } = useSelector(
    tracksLoadingSelector
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
};

export default Home;
