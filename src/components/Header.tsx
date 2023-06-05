import React from 'react';
import { Icons, Text } from '@/components';
import { colors } from '@/constants/colors';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';

function Header(props: Props) {
  const { title } = props;
  const router = useRouter();
  return (
    <div
      css={css`
        height: 48px;
        display: flex;
        align-items: center;
      `}
    >
      <div>
        <Icons.LeftArrow
          width={20}
          height={20}
          stroke={colors.primary900}
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
}
