import { css } from '@emotion/react';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
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

function Page() {
  const router = useRouter();
  const { playlistId, usage } = router.query;

  const [tag, setTag] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useEnrollPlaylistForm();

  const { data } = usePlaylist(playlistId as string, {
    usage: usage as any,
  });
  const { mutate: enroll } = useEnrollPlaylist();
  const { mutate: edit } = useEditPlaylist();

  const selectImage = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const addTag = useCallback(() => {
    if (tag) {
      setForm((prev) => ({ ...prev, hashtag: form.hashtag?.concat(tag) }));
      setTag('');
    }
  }, [setForm, setTag, tag, form]);

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
    if (!form.title || !form.image || form.songs?.length === 0) {
      return;
    }

    return playlistId
      ? edit({ ...form, playlistId: playlistId as string })
      : enroll(form);
  }, [edit, enroll, playlistId, form]);

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
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        ref={fileInputRef}
        css={css`
          display: none;
        `}
      />
      {!form.image && !form.thumbnailUrl ? (
        <ImageContainer onClick={selectImage}>
          <Icon name="Plus24" color="white" />
        </ImageContainer>
      ) : (
        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          <Image
            src={
              form.image
                ? URL.createObjectURL(form.image)
                : form.thumbnailUrl ?? ''
            }
            alt="preview"
            onClick={selectImage}
            width={156}
            height={156}
            style={{ cursor: 'pointer', borderRadius: 20 }}
          />
        </div>
      )}
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
                  >{`1:03:35`}</Text>
                </Item>
                {form.songs && form.songs?.length - 1 !== i && (
                  <Divider opacity={0.16} backgroundColor={colors.grey800} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </PlaylistContainer>
      <TagContainer>
        <Text
          typography="sh2"
          color={colors.grey800}
          fontWeight="bold"
        >{`태그`}</Text>
        <TextFieldLine
          value={tag}
          onChange={(evt) => setTag(evt.target.value)}
          placeholderColor={colors.white}
          placeholder="# 태그를 입력해주세요. (선택사항)"
          placeholderStyle={{
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: 16,
            letterSpacing: -0.4,
          }}
          containerStyle={{
            marginTop: 10,
            background: 'rgba(25, 35, 71, 0.08)',
            padding: '5px 5px 5px 10px',
          }}
          style={{
            fontWeight: 700,
            fontSize: '12px',
            textShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)',
          }}
          fontColor={colors.white}
          inputAdornment={{
            end: (
              <AddButton
                onClick={() => addTag()}
                style={{
                  background: tag
                    ? `linear-gradient(0deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06)),
                linear-gradient(114.48deg, rgba(252, 190, 204, 0.4) 0%, #c0deff 83.65%)`
                    : `
                linear-gradient(114.48deg, rgba(193, 199, 213, 0.6) 35.21%, rgba(255, 255, 255, 0.4) 100%),
                radial-gradient(50% 155.02% at 50.91% 50%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%) ,
                radial-gradient(100% 100% at 6.86% 0%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%),
                radial-gradient(100% 100% at 92.68% 100%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)
                `,
                  cursor: tag ? 'pointer' : 'inherit',
                }}
              >
                <Text
                  typography="sh1"
                  fontWeight="bold"
                  color={colors.white}
                >{`+추가`}</Text>
              </AddButton>
            ),
          }}
        />

        {form.hashtag?.length !== 0 && (
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
            `}
          >
            {form.hashtag?.map((v, i) => (
              <TagItem key={i}>
                <Text
                  typography="cp"
                  fontWeight="regular"
                  color="#586589"
                >{`#${v}`}</Text>

                <Icon
                  name="XFilled20"
                  fill={colors.grey400}
                  onClick={() => removeTag(i)}
                />
              </TagItem>
            ))}
          </div>
        )}
      </TagContainer>
      <Button
        onClick={submit}
        disabled={!form.title || !form.image || form.songs?.length === 0}
      >{`등록하기`}</Button>
      <div
        css={css`
          margin-bottom: 32px;
        `}
      />
    </div>
  );
}

export default Page;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 156px;
  height: 156px;
  flex-shrink: 0;
  border-radius: 20px;
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
  margin: 0 auto;
  cursor: pointer;
`;

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
`;

const TagContainer = styled.div`
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
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

const AddButton = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06)),
    linear-gradient(114.48deg, rgba(252, 190, 204, 0.4) 0%, #c0deff 83.65%);
  border-radius: 100px;
  height: 32px;
  width: 74px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TagItem = styled.div`
  border-radius: 16px;
  background: radial-gradient(
      100% 100% at 56.44% 0%,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15));

  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-right: 8px;
  padding: 8px 12px;
`;
