import React from 'react';
import { Google } from './icons';
import Text from './Text';
import { colors } from '@/constants/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useGoogleLogin } from '@react-oauth/google';
import useGoogle from '@/hooks/useGoogleLogin';

function Login() {
  const { mutate } = useGoogle();

  const onClick = () => {
    const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirect_uri = 'https://api.todayplaylist.site/auth/google/redirect';

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=openid+profile+email`;
  };

  return (
    <Contaier onClick={() => onClick()}>
      <Google />
      <Text
        typography="sh2"
        color={colors.grey700}
        fontWeight="bold"
        css={css`
          margin-left: 10px;
        `}
      >
        {`Google 계정으로 로그인`}
      </Text>
    </Contaier>
  );
}

export default Login;

const Contaier = styled.div`
  height: 50px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.8) 31.77%,
    rgba(255, 255, 255, 0) 100%
  );
  backdrop-filter: blur(8px);
  border-radius: 25px;

  border-image-source: radial-gradient(
      100% 100% at 92.68% 100%,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    radial-gradient(
      100% 100% at 6.86% 0%,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    radial-gradient(
      50% 155.02% at 50.91% 50%,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    );
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;
