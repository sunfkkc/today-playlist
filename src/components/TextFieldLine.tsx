import { InputHTMLAttributes, useCallback, useRef } from 'react';
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
    >
      <input
        {...inputProps}
        ref={inputRef}
        className={classNames('text-field-line__input')}
        value={value}
        autoComplete={autoComplete}
        style={{ ...style, color: fontColor }}
        css={css`
          &::placeholder {
            color: ${placeholderColor};
          }
          margin-left: ${inputAdornment?.start ? 'none' : '6px'};
        `}
        placeholder={inputProps.placeholder}
        onChange={(e) => {
          inputProps.onChange?.(e);
        }}
      />
    </TextFieldLineContainer>
  );
}
