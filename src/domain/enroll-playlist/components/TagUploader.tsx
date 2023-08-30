import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Icon, Text, TextFieldLine } from '@/components';
import { colors } from '@/constants/colors';
import { css } from '@emotion/react';

interface Props {
  initialData?: string[];
  addTagHandler?: (tag?: string) => void;
  removeTagHandler?: (i: number) => void;
}

function TagUploader(props: Props) {
  const { addTagHandler, initialData = [], removeTagHandler } = props;
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState(initialData);

  useEffect(() => {
    setTags(initialData);
  }, [initialData]);

  return (
    <TagContainer>
      <Text
        typography="sh2"
        color={colors.grey800}
        fontWeight="bold"
      >{`태그`}</Text>
      <TextFieldLine
        data-testid="input"
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
              data-testid="add-button"
              onClick={() => {
                addTagHandler?.(tag);
                setTags((prev) => prev.concat(tag));
                setTag('');
              }}
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

      {tags?.length !== 0 && (
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            margin-top: 6px;
          `}
        >
          {tags?.map((v, i) => (
            <TagItem key={i}>
              <Text
                typography="cp"
                fontWeight="regular"
                color="#586589"
              >{`#${v}`}</Text>

              <Icon
                data-testid={`remove-button-${i}`}
                name="XFilled20"
                fill={colors.grey400}
                onClick={() => {
                  removeTagHandler?.(i);
                  setTags((prev) => prev.filter((_, _i) => _i !== i));
                }}
              />
            </TagItem>
          ))}
        </div>
      )}
    </TagContainer>
  );
}

export default TagUploader;

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
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const TagItem = styled.div`
  border-radius: 20px;
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
  padding: 8px 8px 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
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
  border: 1px solid rgba(255, 255, 255, 0.3);
`;
