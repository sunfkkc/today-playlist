import { Icon } from '@/components';
import { css } from '@emotion/react';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';

interface Props {
  handleFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  initialImageUrl?: string;
}

function ImageUploader(props: Props) {
  const { handleFileChange, initialImageUrl } = props;
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <>
      <input
        data-testid="file-input"
        type="file"
        onChange={(evt) => {
          handleFileChange?.(evt);
          setSelectedImage(evt.target.files![0]);
        }}
        accept="image/*"
        ref={fileInputRef}
        css={css`
          display: none;
        `}
      />
      {!selectedImage && !initialImageUrl ? (
        <Button onClick={selectImage} data-testid="select-image-button">
          <Icon name="Plus24" color="white" />
        </Button>
      ) : (
        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
          data-testid="selected-image"
        >
          <Image
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : initialImageUrl ?? ''
            }
            alt="preview"
            onClick={selectImage}
            width={156}
            height={156}
            style={{ cursor: 'pointer', borderRadius: 20 }}
          />
        </div>
      )}
    </>
  );
}

export default ImageUploader;

const Button = styled.div`
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
