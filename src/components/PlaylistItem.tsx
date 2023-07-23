import styled from '@emotion/styled';
import React from 'react';
import Text from './Text';
import Image from 'next/image';
import { Icons } from '.';
import { colors } from '@/constants/colors';

function PlaylistItem(props: IPlaylistItem) {
  const {
    title,
    thumbnailUrl,
    isLiked,
    likeCount,
    viewCount,
    hashtag = [],
    editable = false,
  } = props;

  return (
    <Container>
      {isLiked && (
        <Icons.Heart24Filled width={24} height={24} fill={colors.white} />
      )}
      {thumbnailUrl && (
        <Image alt="" src={thumbnailUrl} width={100} height={100} />
      )}
      <Text>{title}</Text>
      <Icons.Heart20Filled width={20} height={20} fill={colors.red400} />
      <Text>{likeCount}</Text>
      <Icons.Eye20Filled width={20} height={20} fill={colors.grey400} />
      <Text>{viewCount}</Text>
      {editable && <Icons.Pen20 />}
      <div>
        {hashtag.map((v, i) => (
          <Text key={i}>{`#${v}`}</Text>
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
`;

interface IPlaylistItem {
  title?: string;
  thumbnailUrl?: string;
  isLiked?: boolean;
  likeCount?: number;
  viewCount?: number;
  hashtag?: string[];
  editable?: boolean;
}
