import { BottomTab, Header, Icons, TextFieldLine } from '@/components';
import PlaylistItem from '@/components/PlaylistItem';
import { colors } from '@/constants/colors';
import useLayoutHeight from '@/hooks/useLayoutHeight';
import usePlaylists from '@/hooks/usePlaylists';
import useScrollEndDetection from '@/hooks/useScrollEndDetection';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';

const ITEM_HEIGHT = 164;

function Page() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const isBottom = useScrollEndDetection(ref);
  const height = useLayoutHeight();
  const [_searchWord, _setSearchWord] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const { playlists, fetchNextPage } = usePlaylists({
    size: height && Math.ceil(height / ITEM_HEIGHT) * 2,
    isLiked: true,
    searchWord,
  });

  const search = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      setSearchWord(_searchWord);
    },
    [setSearchWord, _searchWord]
  );

  useEffect(() => {
    if (isBottom) {
      fetchNextPage();
    }
  }, [isBottom, fetchNextPage]);

  return (
    <div ref={ref} className="homepage-container">
      <form onSubmit={search}>
        <Header title="찜한 플리" />
        <TextFieldLine
          value={_searchWord}
          onChange={(evt) => _setSearchWord(evt.target.value)}
          placeholder="검색어를 입력해주세요."
          fontColor={colors.white}
          placeholderColor={colors.white}
          containerStyle={{ marginBottom: 16 }}
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
