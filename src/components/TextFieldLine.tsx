import { CSSProperties, InputHTMLAttributes, useCallback, useRef } from 'react';
import TextFieldLineContainer, {
  TextFieldLineContainerBaseProps,
} from '@/components/TextFieldLineContainer';
import classNames from 'classnames';
import { css } from '@emotion/react';

export interface Props
  extends TextFieldLineContainerBaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'onClick'> {
  placeholderColor?: string;
  fontColor?: string;
  containerStyle?: CSSProperties;
  placeholderStyle?: CSSProperties;
}

export default function TextFieldLine({
  className,
  hasError,
  style,
  autoComplete = 'off',
  focused,
  placeholderColor = 'black',
  fontColor = 'black',
  inputAdornment,
  containerStyle,
  placeholderStyle,
  ...inputProps
}: Props) {
  const value = inputProps.value;
  const inputRef = useRef<HTMLInputElement>(null);

  const hasValue = value !== '';

  const handleClick = useCallback(() => inputRef.current?.focus(), []);

  return (
    <TextFieldLineContainer
      className={className}
      hasError={hasError}
      disabled={inputProps.disabled}
      hasValue={hasValue}
      onClick={handleClick}
      value={value as any}
      inputAdornment={inputAdornment}
      style={containerStyle}
    >
      <input
        {...inputProps}
        ref={inputRef}
        className={classNames('text-field-line__input')}
        value={value}
        autoComplete={autoComplete}
        style={{
          ...style,
          color: fontColor,
          marginLeft: 6,
        }}
        css={css`
          &::placeholder {
            color: ${placeholderColor ?? placeholderStyle?.color};
            font-size: ${placeholderStyle?.fontSize};
            font-weight: ${placeholderStyle?.fontWeight};
          }
        `}
        placeholder={inputProps.placeholder}
        onChange={(e) => {
          inputProps.onChange?.(e);
        }}
      />
    </TextFieldLineContainer>
  );
}
