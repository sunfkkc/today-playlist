import { css } from '@emotion/react';
import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { Button, Header, TextFieldLine } from '@/components';
import { colors } from '@/constants/colors';
import { useRouter } from 'next/router';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import ImageUploader from '@/domain/update-playlist/components/ImageUploader';
import TagUploader from '@/domain/update-playlist/components/TagUploader';
import PlaylistViewer from '@/domain/update-playlist/components/PlaylistViewer';
import { useForm } from '@/domain/update-playlist/hooks/useForm';
import usePlaylist from '@/hooks/usePlaylist';
import { useEnroll } from '@/domain/update-playlist/hooks/useEnroll';
import { useEdit } from '@/domain/update-playlist/hooks/useEdit';

function Page() {
  useAuthCheck();
  const router = useRouter();
  const { playlistId, usage } = router.query;

  const [form, setForm] = useForm();

  const { data } = usePlaylist(playlistId as string, {
    usage: usage as any,
  });
  const { enroll } = useEnroll();
  const { edit } = useEdit();

  const canSubmit =
    form.title && (form.image || form.thumbnailUrl) && form.songs?.length !== 0;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

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

      <PlaylistViewer
        songs={form.songs?.map((song) => ({
          ...song,
          time: usage ? song.length : song.time,
        }))}
      />

      <TagUploader
        tags={form.hashtag}
        setTags={(tags) => setForm((prev) => ({ ...prev, hashtag: tags }))}
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
