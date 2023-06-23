import usePlaylist from '@/hooks/usePlaylist';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Divider, Icons, Text } from '@/components';
import throttle from '@/utils/throttle';
import { colors } from '@/constants/colors';
import { css } from '@emotion/react';
import { Song } from '@/hooks/usePlaylists';

const INITIAL_HEIGHT = 360;
const OVERLAP_HEIGHT = 24;

function Page() {
  const {
    query: { playlistId },
  } = useRouter();

  const { data } = usePlaylist(playlistId as string);
  const [songs, setSongs] = useState<SongWithPlayingStatus[]>();
  const play = useCallback((song: SongWithPlayingStatus) => {
    setSongs((prev) =>
      prev?.map((_song) =>
        _song.title === song.title
          ? { ..._song, isPlaying: true }
          : { ..._song, isPlaying: false }
      )
    );
  }, []);

  const songsDivRef = useRef<HTMLDivElement>(null);
  const titleDivRef = useRef<HTMLDivElement>(null);
  const hashtagDivRef = useRef<HTMLDivElement>(null);
  const figureDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      setSongs(data.songs.map((song) => ({ ...song, isPlaying: false })));
    }
  }, [data]);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = throttle(() => {
      if (
        songsDivRef.current &&
        titleDivRef.current &&
        hashtagDivRef.current &&
        figureDivRef.current
      ) {
        const { scrollTop } = songsDivRef.current;
        if (scrollTop == 0 && lastScrollTop !== 0) {
          titleDivRef.current.style.height = `${INITIAL_HEIGHT}px`;
          songsDivRef.current.style.height = `calc(100vh - ${INITIAL_HEIGHT}px + ${OVERLAP_HEIGHT}px)`;
          hashtagDivRef.current.style.display = 'block';
          figureDivRef.current.style.display = 'flex';
          lastScrollTop = 0;
          return;
        }

        lastScrollTop = Math.max(lastScrollTop, scrollTop);

        const height = Math.max(INITIAL_HEIGHT - lastScrollTop, 100);

        titleDivRef.current.style.height = `${height}px`;
        songsDivRef.current.style.height = `calc(100vh - ${height}px + ${OVERLAP_HEIGHT}px)`;
        if (height < 120) {
          hashtagDivRef.current.style.display = 'none';
          figureDivRef.current.style.display = 'none';
        }
      }
    }, 100);

    const ref = songsDivRef.current;
    ref?.addEventListener('scroll', handleScroll);
    return () => ref?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="playlist-detail-page-container">
      <div
        ref={titleDivRef}
        className="info-section"
        css={css`
          background-image: url(${data?.thumbnailUrl});
          background-size: cover;
        `}
      >
        <div
          ref={figureDivRef}
          css={css`
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <Icons.Heart20Filled
              width={20}
              height={20}
              stroke={colors.red400}
              fill={colors.red400}
            />
            <Text
              typography="cp"
              fontWeight="regular"
              color={colors.white}
              css={css`
                margin-right: 12px;
              `}
            >
              {data?.viewCount}
            </Text>
            <Icons.Eye20Filled width={20} height={20} fill={colors.white} />
            <Text typography="cp" fontWeight="regular" color={colors.white}>
              {data?.likeCount}
            </Text>
          </div>
          {data?.isLiked ? (
            <Icons.Heart20Filled
              width={20}
              height={20}
              fill={colors.white}
              stroke={colors.white}
            />
          ) : (
            <Icons.Heart24 width={20} height={20} stroke={colors.white} />
          )}
        </div>
        <Text
          typography="h2"
          fontWeight="bold"
          color="white"
          stringToJSX
          ellipsisAfterLines={2}
        >
          {data?.title}
        </Text>
        <div
          ref={hashtagDivRef}
          css={css`
            margin-top: 10px;
          `}
        >
          {data?.hashtag.map((tag, i) => (
            <Text
              key={i}
              typography="cp"
              fontWeight="regular"
              color={colors.white}
              css={css`
                margin-right: 4px;
              `}
            >
              {`#${tag}`}
            </Text>
          ))}
        </div>
      </div>
      <div className="songs-section" ref={songsDivRef}>
        <div
          css={css`
            padding: 32px 20px 0 20px;
          `}
        >
          <Text
            style={{ marginBottom: 20 }}
            typography="h1"
            fontWeight="bold"
            color={colors.grey800}
          >{`플레이리스트`}</Text>
          {songs?.map((song, i) => (
            <React.Fragment key={i}>
              <div key={i} className="song-detail-section">
                <div>
                  <Text
                    typography="sh2"
                    fontWeight="bold"
                    color={colors.grey800}
                  >
                    {song.title}
                  </Text>
                </div>
                <div
                  css={css`
                    display: flex;
                  `}
                >
                  <Text
                    typography="cp"
                    fontWeight="regular"
                    color={colors.grey700}
                    css={css`
                      margin: auto 0 auto 16px;
                    `}
                  >
                    {song.length}
                  </Text>
                  {!song.isPlaying && (
                    <div className="play-icon" onClick={() => play(song)}>
                      <Icons.Play24Filled width={24} height={24} fill="white" />
                    </div>
                  )}
                </div>
              </div>
              {song.isPlaying && (
                <YouTubeVideoComponent videoId={song.videoId} />
              )}
              <Divider backgroundColor={colors.grey800} opacity={0.16} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;

function YouTubeVideoComponent({ videoId }: { videoId: string }) {
  return (
    <div className="youtube-video-container">
      <iframe
        width="100%"
        height="180"
        src={`https://www.youtube.com/embed/${videoId}`}
      ></iframe>
    </div>
  );
}

type SongWithPlayingStatus = Song & { isPlaying: boolean };
