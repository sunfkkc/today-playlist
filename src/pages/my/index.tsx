import { BottomTab, Divider, Icons, Text } from '@/components';
import GoogleLogin from '@/components/GoogleLogin';
import { css } from '@emotion/react';
import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/constants/colors';
import Image from 'next/image';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';

function MyPage() {
  const router = useRouter();
  const { data: user, logout } = useUser();

  const openTerms = useCallback(() => {}, []);

  return (
    <>
      {user ? (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            height: 100vh;
          `}
        >
          <Image
            alt="profile-image"
            src={user.picture}
            width={100}
            height={100}
            css={css`
              margin: 60px auto 12px auto;
            `}
          />
          <Text
            typography="h2"
            fontWeight="bold"
            css={css`
              margin: 0 auto;
            `}
          >
            {user.name}
          </Text>
          <div
            css={css`
              display: flex;
              flex-direction: row;

              margin-top: 40px;
            `}
          >
            <Container onClick={() => router.push('/like')}>
              <Icons.Heart24Filled
                width={24}
                height={24}
                stroke={colors.red500}
                fill={colors.red500}
                css={iconStyle}
              />
              <Text typography="cp" fontWeight="regular">{`찜한 플리`}</Text>
            </Container>
            <Container
              css={css`
                margin: 0 17px;
              `}
              onClick={() => router.push('/registered')}
            >
              <Icons.PlusList24
                width={24}
                height={24}
                stroke={colors.blue600}
                css={iconStyle}
              />

              <Text typography="cp" fontWeight="regular">{`등록한 플리`}</Text>
            </Container>
            <Container onClick={() => router.push('/recent')}>
              <Icons.Eye24
                width={24}
                height={24}
                stroke={colors.grey600}
                css={iconStyle}
              />

              <Text typography="cp" fontWeight="regular">{`최근 본 플리`}</Text>
            </Container>
          </div>
          <div
            css={css`
              background: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0.2) 46.88%,
                rgba(255, 255, 255, 0.08) 72.4%,
                rgba(0, 0, 0, 0.08) 100%
              );
              backdrop-filter: blur(17px);

              border-radius: 30px 30px 0px 0px;

              border: 1px solid rgba(255, 255, 255, 0.466);

              margin: 32px -16px 0 -16px;
              flex-grow: 1;
            `}
          >
            <a
              href="https://www.notion.so/45fb68dcbb0443808ca23ebceba3f1c7?pvs=4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                css={[
                  itemStyle,
                  css`
                    margin-top: 16px;
                  `,
                ]}
              >
                <Text
                  typography="b1"
                  fontWeight="regular"
                  color={colors.grey700}
                  css={css`
                    margin: auto 0;
                  `}
                >{`이용 약관`}</Text>
                <Icons.RightArrow2
                  width={24}
                  height={24}
                  stroke={colors.grey500}
                />
              </div>
            </a>
            <Divider opacity={0.4} />
            <a
              href="https://www.notion.so/45fb68dcbb0443808ca23ebceba3f1c7?pvs=4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div css={itemStyle}>
                <Text
                  typography="b1"
                  fontWeight="regular"
                  color={colors.grey700}
                  css={css`
                    margin: auto 0;
                  `}
                >{`개인정보처리방침`}</Text>
                <Icons.RightArrow2
                  width={24}
                  height={24}
                  stroke={colors.grey500}
                />
              </div>
            </a>
            <Divider opacity={0.4} />

            <Text
              typography="cp"
              fontWeight="regular"
              color={colors.grey400}
              css={css`
                padding: 16px 16px;
                cursor: pointer;
              `}
              onClick={logout}
            >{`로그아웃`}</Text>
          </div>
        </div>
      ) : (
        <GoogleLogin />
      )}
      <BottomTab />
    </>
  );
}

export default MyPage;

const Container = styled.div`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  backdrop-filter: blur(6px);

  border-radius: 20px;
  height: 72px;

  text-align: center;
  flex: 1;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.466);
`;

const iconStyle = css`
  margin: 0 auto;
  margin-bottom: 5px;
`;

const itemStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px;
  cursor: pointer;
`;
