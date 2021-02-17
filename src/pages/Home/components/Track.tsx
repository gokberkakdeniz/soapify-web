/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { TrackSearchObject } from "../../../store/search";
import { formatDate } from "../../../helpers";

interface TrackProps {
  track: TrackSearchObject;
}

const Track = ({ track }: TrackProps): JSX.Element => {
  const theme = useTheme();

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        margin: 2px 0;
        padding: 2px 4px;
        border-radius: 2px;
        background-color: ${theme.colors.background.secondary};
        :hover {
          background-color: ${theme.colors.background.terniary};
        }
        * {
          text-overflow: ellipsis;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <div>
          {track.artists.join(",")} &mdash; {track.track_name}
        </div>
        <div>{track.album_name}</div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          text-align: right;
        `}
      >
        <div>{track.playlist_name}</div>
        <div>{formatDate(track.added_at)}</div>
      </div>
    </div>
  );
};

export default Track;
