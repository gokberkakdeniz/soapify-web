/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { useAppDispatch } from "../../../hooks/redux";
import { searchStart, TrackSearchObject } from "../../../store/search";
import { formatDate } from "../../../helpers";
import { Love } from "../../../components/Icons";

interface TrackProps {
  track: TrackSearchObject;
}

// eslint-disable-next-line prettier/prettier
const escapeQuotes = (s: string) => s.replace(/"/g, "\\\"");

const ellipsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function Track({ track }: TrackProps): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        height: 52px; /* rowHeight 56px - 2px margin top - 2px margin bottom */
        margin: 2px 0;
        padding: 2px 4px;
        box-sizing: border-box;
        border-radius: 2px;
        overflow: hidden;
        background-color: ${theme.colors.background.secondary};
        :hover {
          background-color: ${theme.colors.background.terniary};
        }
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1 1 0;
          min-width: 0;
          overflow: hidden;
        `}
      >
        <div
          css={ellipsis}
          title={`${track.artists.join(", ")} — ${track.track_name}`}
        >
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
                onClick={() =>
                  dispatch(searchStart(`artist:"${escapeQuotes(artist)}"`))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    dispatch(searchStart(`artist:"${escapeQuotes(artist)}"`));
                }}
              >
                {artist}
              </span>
            </span>
          ))}{" "}
          &mdash;{" "}
          <a
            href={track.uri}
            target="_self"
            rel="noreferrer"
            css={css`
              color: inherit;
              text-decoration: none;
              :hover {
                text-decoration: underline;
              }
            `}
          >
            {track.track_name}
          </a>
        </div>
        <div
          role="button"
          tabIndex={0}
          css={css`
            cursor: pointer;
            :hover {
              text-decoration: underline;
            }
            ${ellipsis}
          `}
          onClick={() =>
            dispatch(searchStart(`album:"${escapeQuotes(track.album_name)}"`))
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              dispatch(
                searchStart(`album:"${escapeQuotes(track.album_name)}"`),
              );
          }}
        >
          {track.album_name}
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          flex-shrink: 0;
          max-width: 40%;
          min-width: 0;
          overflow: hidden;
          padding-left: 6px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 4px;
            max-width: 100%;
            overflow: hidden;
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
                min-width: 0;
                ${ellipsis}
              `}
              onClick={() =>
                dispatch(
                  searchStart(
                    `playlist:"${escapeQuotes(track.playlist_name)}"`,
                  ),
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  dispatch(
                    searchStart(
                      `playlist:"${escapeQuotes(track.playlist_name)}"`,
                    ),
                  );
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
