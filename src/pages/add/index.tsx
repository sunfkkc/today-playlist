import { useEnrollPlaylistForm } from '@/atoms/enrollPlaylistForm';
import {
  Button,
  Divider,
  Header,
  Icons,
  Text,
  TextFieldLine,
} from '@/components';
import { colors } from '@/constants/colors';
import useSearchSong, { SearchSongResponse } from '@/hooks/useSearchSong';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';
import { FormEvent, useCallback, useState } from 'react';

function Page() {
  const router = useRouter();
  const [form, setForm] = useEnrollPlaylistForm();
  const [searchWord, setSearchWord] = useState('');
  const { search: searchSongs } = useSearchSong();
  const [list, setList] = useState<
    SearchSongResponse['searchResults'] | undefined
  >(undefined);

  const search = useCallback(
    async (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      const { searchResults } = await searchSongs(searchWord);
      setList(searchResults);
    },
    [searchWord, searchSongs]
  );

  const add = useCallback(
    (id?: string, title?: string) => {
      setForm((prev) => ({
        ...prev,
        songs: prev.songs?.concat({ id, title }),
      }));
    },
    [setForm]
  );

  const remove = useCallback(
    (i: number) => {
      setForm((prev) => ({
        ...prev,
        songs: prev.songs?.filter((_, _i) => _i !== i),
      }));
    },
    [setForm]
  );

  return (
    <div className="homepage-container">
      <Header title="플레이리스트 추가" />
      <form onSubmit={search}>
        <TextFieldLine
          value={searchWord}
          onChange={(evt) => setSearchWord(evt.target.value)}
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

        {!list ? (
          <Container
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <Text
              typography="cp"
              color={colors.grey500}
              css={css`
                margin: 20px 0;
              `}
            >{`검색 내역이 없습니다.`}</Text>
          </Container>
        ) : (
          <Container>
            {list.map((v) => (
              <React.Fragment key={v.videoId}>
                <Item>
                  <Text
                    typography="cp"
                    fontWeight="regular"
                    color={colors.grey900}
                  >
                    {v.title}
                  </Text>
                  <Icons.Plus24Filled
                    width={24}
                    height={24}
                    fill={colors.blue300}
                    onClick={() => add(v.videoId, v.title)}
                    style={{ cursor: 'pointer' }}
                  />
                </Item>
                <Divider opacity={0.16} backgroundColor={colors.grey800} />
              </React.Fragment>
            ))}
          </Container>
        )}

        {form?.songs?.length !== 0 && (
          <Container>
            {form?.songs?.map((v, i) => (
              <React.Fragment key={i}>
                <Item>
                  <Text
                    typography="cp"
                    fontWeight="regular"
                    color={colors.grey900}
                  >
                    {v.title}
                  </Text>
                  <Icons.Subtract24Filled
                    width={24}
                    height={24}
                    fill={colors.red400}
                    onClick={() => remove(i)}
                    style={{ cursor: 'pointer' }}
                  />
                </Item>
                <Divider opacity={0.16} backgroundColor={colors.grey800} />
              </React.Fragment>
            ))}
          </Container>
        )}
      </form>
      <Button onClick={() => router.back()}>{`등록하기`}</Button>
      <div
        css={css`
          height: 32px;
        `}
      />
    </div>
  );
}

export default Page;

const Container = styled.div`
  border-radius: 25px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04) inset;
  backdrop-filter: blur(8px);
  background: linear-gradient(
      275.5deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 0) 54.4%
    ),
    linear-gradient(
      264.5deg,
      rgba(255, 255, 255, 0) 45.6%,
      rgba(255, 255, 255, 0.8) 100%
    );
  margin-top: 16px;
  padding: 20px;
  margin-bottom: 16px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  padding: 5px 0;
`;
