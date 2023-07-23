import { useEnrollPlaylistForm } from '@/atoms/enrollPlaylistForm';
import { Button, Header, Icons, Text, TextFieldLine } from '@/components';
import { colors } from '@/constants/colors';
import useSearchSong, { SearchSongResponse } from '@/hooks/useSearchSong';
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
        videoId: prev.videoId?.concat({ id, title }),
      }));
    },
    [setForm]
  );

  const remove = useCallback(
    (i: number) => {
      setForm((prev) => ({
        ...prev,
        videoId: prev.videoId?.filter((_, _i) => _i !== i),
      }));
    },
    [setForm]
  );

  return (
    <>
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
        <Container>
          {!list ? (
            <Text>{`검색 내역이 없습니다.`}</Text>
          ) : (
            <div>
              {list.map((v) => (
                <React.Fragment key={v.videoId}>
                  <div>
                    <Text>{v.title}</Text>
                    <Icons.Plus24Filled
                      width={24}
                      height={24}
                      fill={colors.blue300}
                      onClick={() => add(v.videoId, v.title)}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </Container>
        {form?.videoId?.length !== 0 && (
          <Container>
            {form?.videoId?.map((v, i) => (
              <React.Fragment key={i}>
                <div>
                  <Text>{v.title}</Text>
                  <Icons.Subtract24Filled
                    width={24}
                    height={24}
                    fill={colors.red400}
                    onClick={() => remove(i)}
                  />
                </div>
              </React.Fragment>
            ))}
          </Container>
        )}
      </form>
      <Button onClick={() => router.back()}>{`등록하기`}</Button>
    </>
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
  display: flex;
  justify-content: center;
  align-items: center;
`;
