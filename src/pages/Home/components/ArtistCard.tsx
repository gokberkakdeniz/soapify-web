/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { useAppDispatch } from "../../../hooks/redux";
import { searchStart } from "../../../store/search";
import { ArtistDetailObject } from "../../../types/spotify";
import { ArtistStat } from "../../../store/search/search.helpers";

interface ArtistCardProps {
  stat: ArtistStat;
  detail: ArtistDetailObject | null;
}

// eslint-disable-next-line quotes
const escapeQuotes = (s: string) => s.replace(/"/g, '\\"');

function ArtistCard({ stat, detail }: ArtistCardProps): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const imageUrl = detail?.images[0]?.url;
  const genres = detail?.genres.slice(0, 2) ?? [];

  return (
    <div
      role="button"
      id={detail?.id}
      tabIndex={0}
      css={css`
        position: relative;
        width: 160px;
        flex-shrink: 0;
        background-color: ${theme.colors.background.secondary};
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        transition: background-color 0.15s;
        :hover,
        :focus {
          background-color: ${theme.colors.background.terniary};
          outline: none;
        }
        user-select: none;
      `}
      onClick={() =>
        dispatch(searchStart(`artist:"${escapeQuotes(stat.name)}"`))
      }
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ")
          dispatch(searchStart(`artist:"${escapeQuotes(stat.name)}"`));
      }}
    >
      <div
        css={css`
          width: 160px;
          height: 160px;
          background-color: ${theme.colors.background.primary};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: ${theme.colors.accent.primary};
          overflow: hidden;
        `}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={stat.name}
            draggable={false}
            css={css`
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            `}
          />
        ) : (
          <span>{stat.name.charAt(0).toUpperCase()}</span>
        )}
      </div>
      <div
        css={css`
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        `}
      >
        <div
          css={css`
            font-weight: bold;
            font-size: 0.9rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: ${theme.colors.text.primary};
          `}
          title={stat.name}
        >
          {stat.name}
        </div>
        <div
          css={css`
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.55);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            min-height: 1em;
          `}
          title={genres.join(", ")}
        >
          {genres.join(", ") || "\u2013"}
        </div>
        <div
          css={css`
            font-size: 0.75rem;
            color: ${theme.colors.accent.primary};
            display: flex;
            flex-direction: column;
            gap: 2px;
          `}
        >
          <span>
            {[
              stat.trackCount === 1 && `${stat.trackCount} track`,
              stat.trackCount > 1 && `${stat.trackCount} tracks`,
              stat.likedCount > 0 && `${stat.likedCount} liked`,
            ]
              .filter(Boolean)
              .join(", ")}
          </span>
        </div>
      </div>
      <a
        href={`spotify:artist:${stat.id}`}
        target="_self"
        rel="noopener noreferrer"
        aria-label={`Open ${stat.name} on Spotify`}
        css={css`
          position: absolute;
          bottom: 6px;
          right: 6px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: opacity 0.15s;
          :hover {
            opacity: 1;
          }
        `}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <svg width="22" height="22">
          <image
            xlinkHref={`${window.location.pathname}/spotify.svg`}
            width="22"
            height="22"
          />
        </svg>
      </a>
    </div>
  );
}

export default ArtistCard;
