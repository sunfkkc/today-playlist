import { Text, BottomTab, TextFieldLine, Icon } from '@/components';
import { colors } from '@/constants/colors';
import usePlaylists, { Playlist } from '@/hooks/usePlaylists';
import useUser from '@/hooks/useUser';
import http from '@/http';
import { debounce } from '@/utils/debounce';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const tag = ['출퇴근길', '집중타임', '새벽감성'];

export default function Home() {
  const { data: user } = useUser();
  const router = useRouter();

  const [_searchWord, _setSearchWord] = useState('');
  const [searchWord, setSearchWord] = useState('');

  const { playlists } = usePlaylists({
    itemHeight: 228,
    searchWord,
  });

  const search = useCallback(
    (k: string) => {
      _setSearchWord(k);
      setSearchWord(k);
      router.replace({
        pathname: router.pathname,
        query: { searchWord: k },
      });
    },
    [setSearchWord, router]
  );

  const clickTag = useCallback(
    (v: string) => {
      const { searchWord } = router.query;

      if ((searchWord as string) === v) {
        search('');
        return;
      }
      search(v);
    },
    [router.query, search]
  );

  useEffect(() => {
    const __searchWord = router.query.searchWord as string;

    if (__searchWord) {
      _setSearchWord(__searchWord);
      setSearchWord(__searchWord);
    }
  }, [router.query.searchWord]);

  return (
    <div className="homepage-container">
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          search(_searchWord);
        }}
      >
        <TextFieldLine
          value={_searchWord}
          onChange={(evt) => _setSearchWord(evt.target.value)}
          placeholder="검색어를 입력해주세요."
          fontColor={colors.white}
          placeholderColor={colors.white}
          placeholderStyle={{ fontSize: '14px', fontWeight: 400 }}
          style={{
            textShadow: `
          0px 0px 6px rgba(0, 0, 0, 0.2),
    0px 1px 2px rgba(74, 134, 255, 0.12)
          `,
          }}
          inputAdornment={{
            start: (
              <div
                css={css`
                  width: 24px;
                  height: 24px;
                `}
              >
                <Icon
                  name="Search24"
                  color="white"
                  onClick={() => search(_searchWord)}
                />
              </div>
            ),
            end: _searchWord && (
              <div
                css={css`
                  width: 20px;
                  height: 20px;
                `}
              >
                <Icon
                  name="XFilled20"
                  fill={colors.grey500}
                  onClick={() => search('')}
                />
              </div>
            ),
          }}
        />
      </form>
      <TagContainer>
        {tag.map((v) => (
          <Tag key={v} onClick={() => clickTag(v)}>
            <Text
              typography="cp"
              fontWeight="regular"
              color={searchWord === v ? colors.white : 'rgba(88, 101, 137, 1)'}
              css={css`
                padding: 8px 12px 8px 12px;
              `}
              stringToJSX
            >
              {`#${v}`}
            </Text>
          </Tag>
        ))}
      </TagContainer>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        {playlists?.map((playlist, i) => (
          <PlaylistItem {...playlist} key={i} hasAuth={user !== undefined} />
        ))}
      </div>
      <BottomTab />
    </div>
  );
}

function PlaylistItem(props: Playlist & { hasAuth?: boolean }) {
  const {
    playlistId,
    title,
    thumbnailUrl,
    isLiked,
    likeCount,
    viewCount,
    hashtag = [],
    hasAuth = false,
    ...rest
  } = props;

  const [likedForDisplay, setLikedForDisplay] = useState<Boolean | undefined>(
    isLiked
  );

  const router = useRouter();

  const like = useCallback(
    (evt: React.MouseEvent<SVGElement, MouseEvent>) => {
      evt.stopPropagation();

      if (!hasAuth) {
        router.push('/my');
        return;
      }

      setLikedForDisplay((prev) => !prev);

      debounce(() => {
        http.patch(`/playlists/like`, { playlistId, like: !likedForDisplay });
      }, 1000);
    },
    [likedForDisplay, playlistId, hasAuth, router]
  );

  return (
    <div className="playlist-item-container">
      <div
        className="playlist-image-container"
        onClick={() => router.push(`/detail/${playlistId}`)}
      >
        <Image alt="" src={thumbnailUrl} fill style={{ objectFit: 'cover' }} />
        {likedForDisplay ? (
          <Icon
            name="HeartFilled24"
            color="white"
            css={heartStyle}
            onClick={like}
          />
        ) : (
          <Icon name="Heart24" color="white" css={heartStyle} onClick={like} />
        )}
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
          {title}
        </Text>
      </div>
      <div className="playlist-stats-container">
        <Icon name="HeartFilled20" color="red400" />
        <Text
          typography="cp"
          fontWeight="regular"
          color={colors.grey600}
          className="playlist-stat-text"
        >
          {new Intl.NumberFormat('en', { notation: 'compact' }).format(
            likeCount
          )}
        </Text>
        <Icon name="EyeFilled20" color="grey400" style={{ marginLeft: 8 }} />
        <Text
          typography="cp"
          fontWeight="regular"
          color={colors.grey600}
          className="playlist-stat-text"
        >
          {new Intl.NumberFormat('en', { notation: 'compact' }).format(
            viewCount
          )}
        </Text>
      </div>
    </div>
  );
}

const TagContainer = styled.div`
  display: flex;
  margin-top: 16px;
`;
const Tag = styled.div`
  margin-right: 8px;
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-image: radial-gradient(
      100% 100% at 56.44% 0%,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    radial-gradient(
      100% 100% at 56.44% 0%,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    );
  border: 1px solid transparent;

  //padding: 8px 12px 8px 12px;
  border-radius: 16px;
  gap: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const heartStyle = css`
  position: absolute;
  right: 0;
  padding: 16px;
`;
