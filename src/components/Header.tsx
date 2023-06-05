import React from 'react';
import { Icons, Text } from '@/components';
import { colors } from '@/constants/colors';
import { useRouter } from 'next/router';

function Header(props: Props) {
  const { title } = props;
  const router = useRouter();
  return (
    <div
      style={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{}}>
        <Icons.LeftArrow
          width={20}
          height={20}
          stroke={colors.primary900}
          onClick={() => router.back()}
        />
      </div>
      <div style={{ marginLeft: 36 }}>
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
