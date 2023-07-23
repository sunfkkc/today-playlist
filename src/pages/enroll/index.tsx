import { css } from '@emotion/react';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { Button, Header, Icons, Text, TextFieldLine } from '@/components';
import { colors } from '@/constants/colors';
import { useEnrollPlaylistForm } from '@/atoms/enrollPlaylistForm';
import useEnrollPlaylist from '@/hooks/useEnrollPlaylist';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

function Page() {
  const router = useRouter();
  const [tag, setTag] = useState('');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useEnrollPlaylistForm();
  const { mutate } = useEnrollPlaylist();

  const selectImage = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({ ...prev, image: e.target.files![0] }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const addTag = useCallback(() => {
    setForm((prev) => ({ ...prev, hashtag: form.hashtag?.concat(tag) }));
    setTag('');
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

  return (
    <div>
      <Header title="플리 등록" />
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        ref={fileInputRef}
        css={css`
          display: none;
        `}
      />
      {!previewSrc && (
        <ImageContainer onClick={selectImage}>
          <Icons.Plus24 width={24} height={24} stroke={colors.white} />
        </ImageContainer>
      )}
      {previewSrc && (
        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          <Image
            src={previewSrc}
            alt="preview"
            onClick={selectImage}
            width={156}
            height={156}
            style={{ cursor: 'pointer', borderRadius: 20 }}
          />
        </div>
      )}
      <TextFieldLine
        placeholder="써클 제목을 입력해주세요 (최대 34자)"
        placeholderColor={colors.grey500}
        fontColor={colors.grey900}
        onChange={(evt) => setTitle(evt.target.value)}
      />
      <PlaylistContainer>
        <Text
          typography="sh2"
          color={colors.grey800}
          fontWeight="bold"
        >{`플레이리스트 추가`}</Text>
        <Icons.Plus24
          width={24}
          height={24}
          stroke={colors.grey500}
          onClick={() => router.push('/add')}
        />
        {form.videoId?.length !== 0 && (
          <div>
            {form.videoId?.map((v, i) => (
              <div key={i}>
                <Text>{v.title}</Text>
              </div>
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
          placeholderColor={colors.black}
          placeholder="# 태그를 입력해주세요. (최대 5개)"
          inputAdornment={{
            end: (
              <div
                css={css`
                  height: 32px;
                  width: 56px;
                `}
              >
                <div onClick={addTag}>
                  <Text>{`추가`}</Text>
                </div>
              </div>
            ),
          }}
        />

        {form.hashtag?.length !== 0 &&
          form.hashtag?.map((v, i) => (
            <div
              key={i}
              css={css`
                display: inline-block;
                border-radius: 16px;
                background: rgba(255, 255, 255, 0.15);
              `}
            >
              <Text>{`#${v}`}</Text>
              <Icons.X20Filled
                width={20}
                height={20}
                fill={colors.grey400}
                onClick={() => removeTag(i)}
              />
            </div>
          ))}
      </TagContainer>
      <Button onClick={() => mutate(form)}>{`등록하기`}</Button>
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
  height: 58px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const TagContainer = styled.div`
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
`;
