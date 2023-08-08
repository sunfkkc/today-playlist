import React, { SVGAttributes } from 'react';
import { Icons } from '.';
import { css } from '@emotion/react';
import { colors, filterColors } from '@/constants/colors';

function Icon(props: IconProps) {
  const { name, onClick, color, ...rest } = props;
  const size = props.size ?? name.slice(-2);
  const Icon = Icons[name];

  return (
    <div
      onClick={onClick}
      css={css`
        width: ${size}px;
        height: ${size}px;
      `}
      style={{
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <Icon
        width={size}
        height={size}
        onClick={(evt) => {
          evt.stopPropagation();
          onClick?.();
        }}
        css={css`
          ${color && `filter: ${filterColors[color]};`}
        `}
        {...rest}
      />
    </div>
  );
}

export default Icon;

interface IconProps extends SVGAttributes<SVGElement> {
  name: keyof typeof Icons;
  color?: keyof typeof colors;
  onClick?: () => void;
  size?: number;
}
