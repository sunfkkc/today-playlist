import { Text, Icons, BottomTab, TextFieldLine } from '@/components';
import { colors } from '@/constants/colors';
import useLayoutHeight from '@/hooks/useLayoutHeight';
import usePlaylists from '@/hooks/usePlaylists';
import useScrollEndDetection from '@/hooks/useScrollEndDetection';
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const ITEM_HEIGHT = 228;

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const isBottom = useScrollEndDetection(ref);
  const height = useLayoutHeight();
  const { playlists, fetchNextPage } = usePlaylists({
    size: height && Math.ceil(height / ITEM_HEIGHT) * 2,
  });

  useEffect(() => {
    if (isBottom) {
      fetchNextPage();
    }
  }, [isBottom, fetchNextPage]);

  return (
    <div className="homepage-container" ref={ref}>
      <TextFieldLine
        placeholder="검색어를 입력해주세요."
        fontColor={colors.white}
        placeholderColor={colors.white}
        inputAdornment={{
          start: (
            <Icons.Search24
              width={24}
              height={24}
              stroke={colors.white}
              style={{ marginRight: 4 }}
            />
          ),
        }}
      />
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        {playlists?.map((playlist) => (
          <div key={playlist.playlistId} className="playlist-item-container">
            <Link href={`/detail/${playlist.playlistId}`}>
              <div className="playlist-image-container">
                <Image
                  alt=""
                  src={playlist.thumbnailUrl}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="playlist-title-container">
                <Text
                  stringToJSX
                  ellipsisAfterLines={2}
                  typography="sh2"
                  fontWeight="bold"
                  color={colors.grey700}
                  style={{ marginTop: 12, marginBottom: 5 }}
                >
                  {playlist.title}
                </Text>
              </div>
              <div className="playlist-stats-container">
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
                  className="playlist-stat-text"
                >
                  {new Intl.NumberFormat('en', { notation: 'compact' }).format(
                    playlist.likeCount
                  )}
                </Text>
                <Icons.Eye20Filled
                  width={20}
                  height={20}
                  fill={colors.grey400}
                />
                <Text
                  typography="cp"
                  fontWeight="regular"
                  color={colors.grey600}
                  className="playlist-stat-text"
                >
                  {new Intl.NumberFormat('en', { notation: 'compact' }).format(
                    playlist.viewCount
                  )}
                </Text>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <BottomTab />
    </div>
  );
}
