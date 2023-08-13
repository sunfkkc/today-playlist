import usePlaylist from '@/hooks/usePlaylist';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Divider, Header, Icon, Text } from '@/components';
import { colors } from '@/constants/colors';
import { css } from '@emotion/react';
import { Song } from '@/hooks/usePlaylists';
import http from '@/http';
import styled from '@emotion/styled';
import { debounce } from '@/utils/debounce';
const INITIAL_HEIGHT = 360;
const OVERLAP_HEIGHT = 24;

function Page() {
  const {
    query: { playlistId },
  } = useRouter();

  const { data } = usePlaylist(playlistId as string);
  const [isLiked, setIsLiked] = useState<Boolean | undefined>(undefined);

  const [songs, setSongs] = useState<SongWithPlayingStatus[]>();
  const play = useCallback((i: number) => {
    setSongs((prev) =>
      prev?.map((_song, _i) =>
        i === _i
          ? { ..._song, isPlaying: true }
          : { ..._song, isPlaying: false }
      )
    );
  }, []);

  const like = useCallback(() => {
    setIsLiked((prev) => !prev);

    debounce(() => {
      http.patch(`/playlists/like`, { playlistId, like: !isLiked });
    }, 1000);
  }, [playlistId, isLiked]);

  useEffect(() => {
    if (data) {
      setSongs(data.songs.map((song) => ({ ...song, isPlaying: false })));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setIsLiked(data.isLiked);
    }
  }, [data]);

  return (
    <div
      css={css`
        position: relative;
        display: flex;
        flex-direction: column;
      `}
    >
      {<Header title="" style={{ position: 'absolute', paddingTop: 16 }} />}

      <div
        css={css`
          background-image: url(${data?.thumbnailUrl});
          background-size: cover;
          background-position: center;
          position: fixed;
          height: ${`${INITIAL_HEIGHT}px`};
          width: 350px;
          @media (max-width: 425px) {
            width: 100%;
          }
          transform: translateX(-16px);
        `}
      />

      <InfoContainer
        css={css`
          height: ${`${INITIAL_HEIGHT}px`};
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            z-index: 2;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <Icon name="HeartFilled20" color="red400" onClick={like} />
            <Text
              typography="cp"
              fontWeight="regular"
              color={colors.white}
              css={css`
                margin-right: 12px;
              `}
            >
              {data?.likeCount}
            </Text>
            <Icon name="EyeFilled20" color="white" />
            <Text typography="cp" fontWeight="regular" color={colors.white}>
              {data?.viewCount}
            </Text>
          </div>
          {isLiked ? (
            <Icon name="HeartFilled24" color="white" onClick={like} />
          ) : (
            <Icon name="Heart24" color="white" onClick={like} />
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
      </InfoContainer>
      <SongContainer>
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
              <SongDetailContainer key={i}>
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
                    <PlayIcon onClick={() => play(i)}>
                      <Icon name="PlayFilled24" color="white" />
                    </PlayIcon>
                  )}
                </div>
              </SongDetailContainer>
              {song.isPlaying && (
                <YouTubeVideoComponent videoId={song.videoId} />
              )}
              <Divider backgroundColor={colors.grey800} opacity={0.16} />
            </React.Fragment>
          ))}
        </div>
      </SongContainer>
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

const InfoContainer = styled.div`
  position: absolute;
  box-sizing: border-box;
  transition: height 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  margin: 0 -16px;
  justify-content: flex-end;
  padding: 0 16px 40px 16px;
  width: 350px;
  @media (max-width: 425px) {
    width: 100%;
  }
`;

const SongContainer = styled.div`
  transition: height 0.3s ease-in-out;
  box-sizing: border-box;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.5) 9.9%,
    rgba(255, 255, 255, 0.1) 30.87%,
    rgba(0, 0, 0, 0.04) 100%
  );
  backdrop-filter: blur(20px);

  border-radius: 30px 30px 0px 0px;

  min-height: calc(100vh - ${INITIAL_HEIGHT}px + ${OVERLAP_HEIGHT}px);

  margin: 0 -16px;
  margin-top: calc(${INITIAL_HEIGHT}px - ${OVERLAP_HEIGHT}px);
`;

const SongDetailContainer = styled.div`
  align-items: center;
  padding: 18px 0;
  display: flex;
  justify-content: space-between;
`;

const PlayIcon = styled.div`
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.466);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-left: 14px;
  border-radius: 40px;
  background: linear-gradient(
    180deg,
    rgba(86, 165, 255, 0.3) 14.06%,
    rgba(239, 57, 89, 0) 100%
  );
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(6px);
`;
