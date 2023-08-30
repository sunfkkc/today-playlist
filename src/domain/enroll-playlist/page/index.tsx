import { css } from '@emotion/react';
import React, { ChangeEvent, useCallback, useEffect } from 'react';
import {
  Button,
  Divider,
  Header,
  Icon,
  Text,
  TextFieldLine,
} from '@/components';
import { colors } from '@/constants/colors';
import { useEnrollPlaylistForm } from '@/atoms/enrollPlaylistForm';
import useEnrollPlaylist from '@/hooks/useEnrollPlaylist';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import usePlaylist from '@/hooks/usePlaylist';
import useEditPlaylist from '@/hooks/useEditPlaylist';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import ImageUploader from '@/domain/enroll-playlist/components/ImageUploader';
import TagUploader from '@/domain/enroll-playlist/components/TagUploader';

function Page() {
  useAuthCheck();
  const router = useRouter();
  const { playlistId, usage } = router.query;

  const [form, setForm] = useEnrollPlaylistForm();

  const { data } = usePlaylist(playlistId as string, {
    usage: usage as any,
  });
  const { mutate: enroll } = useEnrollPlaylist();
  const { mutate: edit } = useEditPlaylist();

  const canSubmit =
    form.title && (form.image || form.thumbnailUrl) && form.songs?.length !== 0;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const addTag = useCallback(
    (tag?: string) => {
      if (tag) {
        setForm((prev) => ({ ...prev, hashtag: form.hashtag?.concat(tag) }));
      }
    },
    [setForm, form]
  );

  const removeTag = useCallback(
    (i: number) => {
      setForm((prev) => ({
        ...prev,
        hashtag: prev.hashtag?.filter((_, _i) => _i !== i),
      }));
    },
    [setForm]
  );

  const setTitle = useCallback(
    (title?: string) => {
      setForm((prev) => ({ ...prev, title }));
    },
    [setForm]
  );

  const submit = useCallback(() => {
    if (!canSubmit) {
      return;
    }

    return playlistId
      ? edit({ ...form, playlistId: playlistId as string })
      : enroll(form);
  }, [edit, enroll, playlistId, form, canSubmit]);

  useEffect(() => {
    if (playlistId && data) {
      setForm(data);
    }
  }, [playlistId, data, setForm]);

  return (
    <div className="homepage-container">
      <Header title={`플리 ${playlistId ? '수정' : '등록'}`} />
      <div
        css={css`
          margin-bottom: 16px;
        `}
      />
      <ImageUploader
        handleFileChange={handleFileChange}
        initialImageUrl={form.thumbnailUrl}
      />
      <TextFieldLine
        placeholder="플리 제목을 입력해주세요"
        placeholderColor={colors.grey500}
        fontColor={colors.grey900}
        value={form.title}
        onChange={(evt) => setTitle(evt.target.value)}
        containerStyle={{ marginTop: 16, marginBottom: 16 }}
        style={{ fontSize: '14px', fontWeight: 400 }}
      />
      <PlaylistContainer>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <Text
            typography="sh2"
            color={colors.grey800}
            fontWeight="bold"
          >{`플레이리스트 추가`}</Text>
          <Icon
            name="Plus24"
            color="grey500"
            onClick={() => router.push('/add')}
          />
        </div>
        {form.songs?.length !== 0 && (
          <div
            css={css`
              margin-top: 10px;
            `}
          >
            {form.songs?.map((v, i) => (
              <React.Fragment key={i}>
                <Item>
                  <Text
                    typography="cp"
                    fontWeight="regular"
                    color={colors.grey900}
                    stringToJSX
                    style={{ width: '76%' }}
                  >
                    {v.title}
                  </Text>
                  <Text
                    typography="cp"
                    fontWeight="regular"
                    color={colors.grey700}
                    stringToJSX
                  >{`${usage ? v.length : v.time}`}</Text>
                </Item>
                {form.songs && form.songs?.length - 1 !== i && (
                  <Divider opacity={0.16} backgroundColor={colors.grey800} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </PlaylistContainer>

      <TagUploader
        addTagHandler={addTag}
        initialData={form.hashtag}
        removeTagHandler={removeTag}
      />

      <Button onClick={submit} disabled={!canSubmit}>{`등록하기`}</Button>
      <div
        css={css`
          margin-bottom: 32px;
        `}
      />
    </div>
  );
}

export default Page;

const PlaylistContainer = styled.div`
  flex-shrink: 0;
  border-radius: 25px;
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
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04) inset;
  backdrop-filter: blur(8px);
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
