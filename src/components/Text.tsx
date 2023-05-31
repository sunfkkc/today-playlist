import { colors } from '@/constants/colors';
import classNames from 'classnames';
import React, {
  AllHTMLAttributes,
  CSSProperties,
  ReactNode,
  Ref,
  forwardRef,
} from 'react';

export const Typography = {
  H5: 'h5',
  H4: 'h4',
  H3: 'h3',
  H2: 'h2',
  H1: 'h1',
  SH2: 'sh2',
  SH2L: 'sh2l',
  SH1: 'sh1',
  SH1L: 'sh1l',
  B2: 'b2',
  B2L: 'b2l',
  B1: 'b1',
  B1L: 'b1l',
  CP: 'cp',
} as const;
export type TypographyValue = (typeof Typography)[keyof typeof Typography];
export const FontWeight = {
  Regular: 'regular' as const,
  Medium: 'medium' as const,
  Semibold: 'semibold' as const,
  Bold: 'bold' as const,
};
export type FontWeightValue = (typeof FontWeight)[keyof typeof FontWeight];
export interface BaseProps {
  children?: ReactNode;
  className?: string;
  typography?: TypographyValue;
  fontWeight?: FontWeightValue;
  color?: string;
  ellipsisAfterLines?: number;
  stringToJSX?: boolean;
  display?: CSSProperties['display'];
  textAlign?: CSSProperties['textAlign'];
  /**
   * @description word-break: keep-all을 적용할지 여부를 나타냅니다.
   * @default true
   */
  wordBreak?: boolean;
}
export type Props = BaseProps;
type TextProps = BaseProps & AllHTMLAttributes<Element>;
function Text(props: TextProps, ref: Ref<HTMLElement>) {
  const {
    className,
    children,
    ellipsisAfterLines,
    typography,
    fontWeight,
    color = colors.black,
    stringToJSX,
    display = 'inline-block',
    textAlign,
    style,
    wordBreak = true,
    role,
    ...rest
  } = props;

  const isSingleLine =
    ellipsisAfterLines !== undefined && ellipsisAfterLines === 1;
  const isMultiLine =
    ellipsisAfterLines !== undefined && ellipsisAfterLines > 1;

  return (
    <span
      ref={ref}
      role={role}
      className={classNames(
        'text',
        {
          'text--single-line': isSingleLine,
          'text--multi-line': isMultiLine,
          'text--word-break': isSingleLine ? false : wordBreak,
          [`typography-${typography}`]: typography,
          [`text--font-weight-${fontWeight}`]: fontWeight,
          [`text--display-${display}`]:
            display && !isSingleLine && !isMultiLine,
        },
        className
      )}
      style={{
        color,
        WebkitLineClamp: isMultiLine ? ellipsisAfterLines : undefined,
        textAlign,
        ...style,
      }}
      {...rest}
    >
      {stringToJSX === true && typeof children === 'string'
        ? convertNewLineToJSX(children)
        : children}
    </span>
  );
}

export default forwardRef(Text);

function convertNewLineToJSX(str: string) {
  return str.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {index > 0 ? <br /> : ''}
      {line}
    </React.Fragment>
  ));
}
