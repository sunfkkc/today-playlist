import { BottomTab, Header, Icon, TextFieldLine } from '@/components';
import PlaylistItem from '@/components/PlaylistItem';
import { colors } from '@/constants/colors';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import usePlaylists from '@/hooks/usePlaylists';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';

function Page() {
  useAuthCheck();
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);

  const [_searchWord, _setSearchWord] = useState('');
  const [searchWord, setSearchWord] = useState('');

  const { playlists } = usePlaylists({
    isLiked: true,
    searchWord,
    ref,
    itemHeight: 164,
  });

  const search = useCallback(() => {
    setSearchWord(_searchWord);
  }, [setSearchWord, _searchWord]);

  return (
    <div ref={ref} className="homepage-container">
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          search();
        }}
      >
        <Header title="찜한 플리" />
        <TextFieldLine
          value={_searchWord}
          onChange={(evt) => _setSearchWord(evt.target.value)}
          placeholder="검색어를 입력해주세요."
          fontColor={colors.white}
          placeholderColor={colors.white}
          containerStyle={{ marginBottom: 16 }}
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
                <Icon name="Search24" color="white" onClick={search} />
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
                  onClick={() => _setSearchWord('')}
                />
              </div>
            ),
          }}
        />
        {playlists?.map((props) => (
          <PlaylistItem
            key={props.playlistId}
            {...props}
            style={{ marginBottom: 16, cursor: 'pointer' }}
            onClick={() => router.push(`/detail/${props.playlistId}`)}
          />
        ))}
      </form>
      <BottomTab />
    </div>
  );
}

export default Page;
