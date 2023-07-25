import styled from '@emotion/styled';
import React from 'react';
import Text from './Text';
import Image from 'next/image';
import { Icons } from '.';
import { colors } from '@/constants/colors';
import { css } from '@emotion/react';

function PlaylistItem(props: IPlaylistItem) {
  const {
    title,
    thumbnailUrl,
    isLiked,
    likeCount,
    viewCount,
    hashtag = [],
    editable = false,
    ...rest
  } = props;

  return (
    <Container {...rest}>
      {isLiked && (
        <div
          css={css`
            position: absolute;
            padding: 8px 0px 0px 8px;
            z-index: 2;
          `}
        >
          <Icons.Heart24Filled
            width={24}
            height={24}
            fill={colors.white}
            stroke={colors.white}
          />
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
              width: 80%;
              height: 100px;
              position: relative;
              overflow: hidden;
              border-radius: 20px;
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
          `}
        >
          <Text typography="sh1" fontWeight="bold" color={colors.grey800}>
            {title}
          </Text>
          <div
            css={css`
              display: flex;
            `}
          >
            <div
              css={css`
                display: flex;
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
                color={colors.grey600}
                style={{ margin: 'auto 0' }}
              >
                {likeCount &&
                  new Intl.NumberFormat('en', { notation: 'compact' }).format(
                    likeCount
                  )}
              </Text>
              <Icons.Eye20Filled
                width={20}
                height={20}
                fill={colors.grey400}
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
            {editable && <Icons.Pen20 />}
          </div>
        </div>
      </div>
      <div
        css={css`
          margin-top: 12px;
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
  padding: 16px;
`;

interface IPlaylistItem extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  thumbnailUrl?: string;
  isLiked?: boolean;
  likeCount?: number;
  viewCount?: number;
  hashtag?: string[];
  editable?: boolean;
}
