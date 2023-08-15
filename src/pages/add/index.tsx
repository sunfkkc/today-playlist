import { useEnrollPlaylistForm } from '@/atoms/enrollPlaylistForm';
import {
  Button,
  Divider,
  Header,
  Icon,
  Text,
  TextFieldLine,
} from '@/components';
import { colors } from '@/constants/colors';
import useRegisterSong from '@/hooks/useRegisterSong';
import useSearchSong, { SearchSongResponse } from '@/hooks/useSearchSong';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';
import { useCallback, useState } from 'react';

function Page() {
  const router = useRouter();
  const [form, setForm] = useEnrollPlaylistForm();
  const [searchWord, setSearchWord] = useState('');
  const { search: searchSongs } = useSearchSong();
  const { mutateAsync } = useRegisterSong();
  const [list, setList] = useState<
    SearchSongResponse['searchResults'] | undefined
  >(undefined);

  const search = useCallback(async () => {
    const { searchResults } = await searchSongs(searchWord);
    setList(searchResults?.filter((v) => v.videoId));
  }, [searchWord, searchSongs]);

  const add = useCallback(
    async (id?: string, title?: string) => {
      const { time } = await mutateAsync({ videoId: id, title });

      setForm((prev) => ({
        ...prev,
        songs: prev.songs?.concat({ id, title, time }),
      }));
    },
    [setForm, mutateAsync]
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

  const submit = useCallback(() => {
    if (form.songs?.length === 0) {
      return;
    }
    router.back();
  }, [form, router]);

  return (
    <div className="homepage-container">
      <Header title="플레이리스트 추가" />
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          search();
        }}
      >
        <TextFieldLine
          containerStyle={{ marginTop: 16 }}
          value={searchWord}
          onChange={(evt) => setSearchWord(evt.target.value)}
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
                <Icon name="Search24" color="white" onClick={search} />
              </div>
            ),
            end: searchWord && (
              <div
                css={css`
                  width: 20px;
                  height: 20px;
                `}
              >
                <Icon
                  name="XFilled20"
                  fill={colors.grey500}
                  onClick={() => setSearchWord('')}
                />
              </div>
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
            {list.map((v, i) => (
              <React.Fragment key={v.videoId}>
                <Item>
                  <Text
                    typography="cp"
                    fontWeight="regular"
                    color={colors.grey900}
                    stringToJSX
                    style={{ width: '70%' }}
                  >
                    {v.title}
                  </Text>
                  <Icon
                    name="PlusFilled24"
                    fill={colors.blue300}
                    onClick={() => add(v.videoId, v.title)}
                  />
                </Item>
                {list.length - 1 !== i && (
                  <Divider opacity={0.16} backgroundColor={colors.grey800} />
                )}
              </React.Fragment>
            ))}
          </Container>
        )}

        {form?.songs?.length !== 0 && (
          <Container>
            <Text
              typography="sh2"
              fontWeight="bold"
              color={colors.grey800}
              style={{ marginTop: 4, marginBottom: 12 }}
            >{`선택한 영상 리스트`}</Text>
            {form?.songs?.map((v, i) => (
              <React.Fragment key={i}>
                <Item>
                  <Text
                    typography="cp"
                    fontWeight="regular"
                    color={colors.grey900}
                    stringToJSX
                    style={{ width: '70%' }}
                  >
                    {v.title}
                  </Text>
                  <div
                    css={css`
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      flex-shrink: 0;
                    `}
                  >
                    <Text
                      typography="cp"
                      fontWeight="regular"
                      stringToJSX
                      color={colors.grey700}
                      style={{ marginRight: 4 }}
                    >
                      {v.time}
                    </Text>
                    <Icon
                      name="SubtractFilled24"
                      onClick={() => remove(i)}
                      fill={colors.red400}
                    />
                  </div>
                </Item>
                {form.songs && form.songs?.length - 1 !== i && (
                  <Divider opacity={0.16} backgroundColor={colors.grey800} />
                )}
              </React.Fragment>
            ))}
          </Container>
        )}
      </form>
      <Button
        onClick={submit}
        disabled={form.songs?.length === 0}
      >{`등록하기`}</Button>
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
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;
