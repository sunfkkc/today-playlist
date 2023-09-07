import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { Divider, Icon, Text } from '@/components';
import { colors } from '@/constants/colors';
import { useRouter } from 'next/router';

interface Props {
  songs?: { title?: string; time?: string }[];
}

function PlaylistViewer({ songs }: Props) {
  const router = useRouter();

  return (
    <Container>
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
          data-testid="add-button"
          name="Plus24"
          color="grey500"
          onClick={() => router.push('/add')}
        />
      </div>
      {songs?.length !== 0 && (
        <div
          css={css`
            margin-top: 10px;
          `}
        >
          {songs?.map((v, i) => (
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
                >
                  {v.time}
                </Text>
              </Item>
              {songs && songs?.length - 1 !== i && (
                <Divider opacity={0.16} backgroundColor={colors.grey800} />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </Container>
  );
}

export default PlaylistViewer;

const Container = styled.div`
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
