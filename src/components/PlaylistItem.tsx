import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import Text from './Text';
import Image from 'next/image';
import { Icon } from '.';
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
    edit,
    onClick,
    ...rest
  } = props;

  const _onClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if ((evt.target as Element).classList.contains('edit-icon')) {
        edit?.();
      } else {
        onClick?.(evt);
      }
    },
    [onClick, edit]
  );

  return (
    <Container {...rest} onClick={_onClick}>
      {isLiked && (
        <div
          css={css`
            position: absolute;
            padding: 8px 0px 0px 8px;
            z-index: 2;
          `}
        >
          <Icon name="HeartFilled24" color="white" />
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
          <Text typography="sh1" fontWeight="bold" color={colors.grey800}>
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
                {likeCount &&
                  new Intl.NumberFormat('en', { notation: 'compact' }).format(
                    likeCount
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
                `}
              >
                <Icon
                  name="Pen20"
                  color="grey500"
                  onClick={(e) => {
                    e.stopPropagation();
                    edit?.();
                  }}
                  className="edit-icon"
                />
              </div>
            )}
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
  edit?: () => void;
}
