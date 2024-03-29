import React, { SVGAttributes } from 'react';
import { Icons } from '.';
import { css } from '@emotion/react';
import { colors, filterColors } from '@/constants/colors';

function Icon(props: IconProps) {
  const { name, onClick, color, fill, shadow, ...rest } = props;
  const size = props.size ?? name.slice(-2);
  const Icon = Icons[name];

  return (
    <Icon
      width={size}
      height={size}
      onClick={onClick}
      css={css`
        ${color &&
        `filter: ${filterColors[color]} ${
          shadow ? `drop-shadow(${shadow})` : ''
        };`}
      `}
      style={{ ...props.style, cursor: onClick ? 'pointer' : 'inherit' }}
      fill={fill ?? 'none'}
      {...rest}
    />
  );
}

export default Icon;

interface IconProps extends SVGAttributes<SVGElement> {
  name: keyof typeof Icons;
  color?: keyof typeof colors;
  size?: number;
  shadow?: string;
}
