import React, { CSSProperties } from 'react';
import { Icon, Text } from '@/components';
import { colors } from '@/constants/colors';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';

function Header(props: Props) {
  const { title, style } = props;
  const router = useRouter();
  return (
    <div
      css={css`
        height: 48px;
        display: flex;
        align-items: center;
      `}
      style={style}
    >
      <div>
        <Icon
          name="LeftArrow24"
          color="primary900"
          onClick={() => router.back()}
        />
      </div>
      <div
        css={css`
          margin-left: 36px;
        `}
      >
        <Text typography="h1" color={colors.grey900} fontWeight="bold">
          {title}
        </Text>
      </div>
    </div>
  );
}

export default Header;

interface Props {
  title: string;
  style?: CSSProperties;
}
