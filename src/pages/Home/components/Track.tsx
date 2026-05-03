/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { useAppDispatch } from "../../../hooks/redux";
import { searchStart, TrackSearchObject } from "../../../store/search";
import { formatDate } from "../../../helpers";
import { Love } from "../../../components/Icons";

interface TrackProps {
  track: TrackSearchObject;
}

function Track({ track }: TrackProps): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();

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
          {track.artists.map((artist, i) => (
            <span key={artist}>
              {i > 0 && ","}
              <span
                role="button"
                tabIndex={0}
                css={css`
                  cursor: pointer;
                  :hover {
                    text-decoration: underline;
                  }
                `}
                onClick={() => dispatch(searchStart(`artist:"${artist}"`))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    dispatch(searchStart(`artist:"${artist}"`));
                }}
              >
                {artist}
              </span>
            </span>
          ))}{" "}
          &mdash; {track.track_name}
        </div>
        <div
          role="button"
          tabIndex={0}
          css={css`
            cursor: pointer;
            :hover {
              text-decoration: underline;
            }
          `}
          onClick={() => dispatch(searchStart(`album:"${track.album_name}"`))}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              dispatch(searchStart(`album:"${track.album_name}"`));
          }}
        >
          {track.album_name}
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          text-align: right;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 4px;
          `}
        >
          {track.playlist_name && (
            <span
              role="button"
              tabIndex={0}
              css={css`
                cursor: pointer;
                :hover {
                  text-decoration: underline;
                }
              `}
              onClick={() =>
                dispatch(searchStart(`playlist:"${track.playlist_name}"`))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  dispatch(searchStart(`playlist:"${track.playlist_name}"`));
              }}
            >
              {track.playlist_name}
            </span>
          )}
          {track.liked && (
            <Love
              css={css`
                color: #e91e63;
                flex-shrink: 0;
              `}
            />
          )}
        </div>
        <div>{formatDate(track.added_at)}</div>
      </div>
    </div>
  );
}

export default Track;
