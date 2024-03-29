import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import Text from './Text';
import Image from 'next/image';
import { Icon } from '.';
import { colors } from '@/constants/colors';
import { css } from '@emotion/react';
import { debounce } from '@/utils/debounce';
import http from '@/http';
import { useRouter } from 'next/router';

function PlaylistItem(props: IPlaylistItem) {
  const {
    playlistId,
    title,
    thumbnailUrl,
    isLiked,
    likeCount,
    viewCount,
    hashtag = [],
    editable = false,
    disableLike = false,
    ...rest
  } = props;
  const router = useRouter();
  const [likedForDisplay, setLikedForDisplay] = useState<boolean | undefined>(
    isLiked
  );
  const [likedCountForDisplay, setLikedCountForDisplay] = useState<
    number | undefined
  >(likeCount);

  const navigateToEditPage = useCallback(
    (playlistId: string) => {
      router.push(`/update?playlistId=${playlistId}&usage=modify`);
    },
    [router]
  );

  const onClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if ((evt.target as Element).classList.contains('edit-icon')) {
        navigateToEditPage(playlistId!);
      } else {
        router.push(`/detail/${playlistId}`);
      }
    },
    [playlistId, router, navigateToEditPage]
  );

  const like = useCallback(
    (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      evt.stopPropagation();

      setLikedForDisplay((prev) => !prev);
      setLikedCountForDisplay((prev) =>
        likedForDisplay ? prev! - 1 : prev! + 1
      );

      debounce(() => {
        http.patch(`/playlists/like`, { playlistId, like: !likedForDisplay });
      }, 500);
    },
    [likedForDisplay, playlistId]
  );

  useEffect(() => {
    setLikedForDisplay(isLiked);
  }, [isLiked]);

  useEffect(() => {
    setLikedCountForDisplay(likeCount);
  }, [likeCount]);

  return (
    <Container
      {...rest}
      onClick={onClick}
      data-testid="playlist-item-container"
    >
      {likedForDisplay ? (
        <div
          css={heartStyle}
          data-testid="filled-heart-icon"
          onClick={disableLike ? undefined : like}
        >
          <Icon name="HeartFilled24" color="white" />
        </div>
      ) : (
        <div
          css={heartStyle}
          data-testid="outlined-heart-icon"
          onClick={disableLike ? undefined : like}
        >
          <Icon name="Heart24" color="white" />
        </div>
      )}
      <div
        css={css`
          display: flex;
        `}
      >
        {thumbnailUrl && (
          <div
            css={css`
              width: 100px;
              height: 100px;
              position: relative;
              overflow: hidden;
              border-radius: 20px;
              flex-shrink: 0;
            `}
          >
            <Image
              alt=""
              src={thumbnailUrl}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <div
          css={css`
            margin-left: 16px;
            justify-content: space-between;
            display: flex;
            flex-direction: column;
            flex: 1;
          `}
        >
          <Text
            typography="sh1"
            fontWeight="bold"
            color={colors.grey800}
            style={{
              paddingTop: 10,
              paddingRight: 10,
            }}
          >
            {title}
          </Text>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <div
              css={css`
                display: flex;
              `}
            >
              <Icon name="HeartFilled20" color="red400" />
              <Text
                typography="cp"
                fontWeight="regular"
                color={colors.grey600}
                style={{ margin: 'auto 0' }}
              >
                {likedCountForDisplay &&
                  new Intl.NumberFormat('en', { notation: 'compact' }).format(
                    likedCountForDisplay
                  )}
              </Text>
              <Icon
                name="EyeFilled20"
                color="grey400"
                style={{ marginLeft: 8 }}
              />
              <Text
                typography="cp"
                fontWeight="regular"
                color={colors.grey600}
                style={{ margin: 'auto 0' }}
              >
                {viewCount &&
                  new Intl.NumberFormat('en', { notation: 'compact' }).format(
                    viewCount
                  )}
              </Text>
            </div>
            {editable && (
              <div
                data-testid="edit-icon"
                className="edit-icon"
                css={css`
                  border-radius: 8px;
                  opacity: 0.6;
                  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
                  width: 24px;
                  height: 24px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-right: 6px;
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToEditPage(playlistId!);
                }}
              >
                <Icon name="Pen20" color="grey500" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        css={css`
          margin-top: 12px;
          padding-left: 8px;
          padding-bottom: 4px;
        `}
      >
        {hashtag.map((v, i) => (
          <Text
            key={i}
            typography="cp"
            fontWeight="regular"
            color={colors.grey600}
          >{`#${v}`}</Text>
        ))}
      </div>
    </Container>
  );
}

export default PlaylistItem;

const Container = styled.div`
  border-radius: 20px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(8px);
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const heartStyle = css`
  position: absolute;
  padding: 8px 0px 0px 8px;
  z-index: 2;
`;

interface IPlaylistItem extends React.HTMLAttributes<HTMLDivElement> {
  playlistId?: string;
  title?: string;
  thumbnailUrl?: string;
  isLiked?: boolean;
  likeCount?: number;
  viewCount?: number;
  hashtag?: string[];
  editable?: boolean;
  disableLike?: boolean;
}
