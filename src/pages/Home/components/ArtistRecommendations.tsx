/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { useAppSelector } from "../../../hooks/redux";
import { artistStats } from "../../../store/search/search.helpers";
import { get } from "../../../helpers/fetch";
import { ArtistDetailObject, ArtistsResponse } from "../../../types/spotify";
import ArtistCard from "./ArtistCard";

const CARD_WIDTH = 160;
const GAP = 12;
const POOL_SIZE = 10;
const VARIOUS_ARTISTS_ID = "0LyfQWJT6nXafLPZqxe9Of";

function ArtistRecommendations(): JSX.Element | null {
  const theme = useTheme();
  const isLoaded = useAppSelector((state) => state.tracks.status === "loaded");
  const stats = useAppSelector(artistStats);
  const [seed, setSeed] = useState(0);

  const pool = useMemo(() => {
    if (!stats || stats.length === 0 || !isLoaded) return [];

    const result = [];
    const map = new Map();
    let availableCount = stats.length;

    while (result.length < POOL_SIZE && availableCount > 0) {
      const rand = Math.floor(Math.random() * availableCount);
      const actualIndex = map.has(rand) ? map.get(rand) : rand;
      const selectedArtist = stats[actualIndex];

      availableCount -= 1;

      const lastElementIndex = map.has(availableCount)
        ? map.get(availableCount)
        : availableCount;
      map.set(rand, lastElementIndex);

      if (selectedArtist.id !== VARIOUS_ARTISTS_ID) {
        result.push(selectedArtist);
      }
    }

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats, isLoaded, seed]);

  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [details, setDetails] = useState<Record<string, ArtistDetailObject>>(
    {},
  );

  useEffect(() => {
    swiperRef.current?.slideTo(0, 0);
    setIsBeginning(true);
    setIsEnd(false);
  }, [pool]);

  useEffect(() => {
    const ids = pool.map((s) => s.id).filter((id) => !details[id]);
    if (!ids.length) return;
    get<ArtistsResponse>(`/artists?ids=${ids.join(",")}`).then((res) => {
      if ("artists" in res) {
        setDetails((prev) => ({
          ...prev,
          ...Object.fromEntries(res.artists.map((a) => [a.id, a])),
        }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool]);

  if (!isLoaded || pool.length === 0) return null;

  const updateEdge = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const navShadow = css`
    position: absolute;
    top: 0;
    height: 100%;
    width: 2.5rem;
    pointer-events: none;
    z-index: 10;
  `;

  return (
    <div
      css={css`
        width: 100%;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        `}
      >
        <h3
          css={css`
            margin: 0;
            font-size: 1rem;
            color: ${theme.colors.text.primary};
          `}
        >
          Random Artist Recommendations
        </h3>
        <button
          type="button"
          aria-label="New recommendations"
          css={css`
            background: transparent;
            border: none;
            cursor: pointer;
            color: ${theme.colors.accent.primary};
            font-size: 1.5rem;
            padding: 0;
            /* İkonu yukarı çekmek için alt kısma küçük bir boşluk ekliyoruz */
            padding-bottom: 3px;
            width: 2rem;
            height: 2rem;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            /* Satır yüksekliğini sıfırlamak flex hizalamasını netleştirir */
            line-height: 0;
            opacity: 0.7;
            transition:
              opacity 0.15s,
              background-color 0.15s;
            :hover {
              opacity: 1;
              background-color: ${theme.colors.background.secondary};
            }
          `}
          onClick={() => setSeed((s) => s + 1)}
        >
          ↺
        </button>
      </div>
      <div
        css={css`
          position: relative;
        `}
      >
        <Swiper
          slidesPerView="auto"
          spaceBetween={GAP}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateEdge(swiper);
          }}
          onSlideChange={updateEdge}
          onResize={updateEdge}
        >
          {pool.map((stat) => (
            <SwiperSlide key={stat.id} style={{ width: CARD_WIDTH }}>
              <ArtistCard stat={stat} detail={details[stat.id] ?? null} />
            </SwiperSlide>
          ))}
        </Swiper>
        {!isBeginning && (
          <div
            css={css`
              ${navShadow};
              left: 0;
              background: linear-gradient(
                to right,
                ${theme.colors.background.primary}cc,
                transparent
              );
            `}
          />
        )}
        {!isEnd && (
          <div
            css={css`
              ${navShadow};
              right: 0;
              background: linear-gradient(
                to left,
                ${theme.colors.background.primary}cc,
                transparent
              );
            `}
          />
        )}
      </div>
    </div>
  );
}

export default ArtistRecommendations;
