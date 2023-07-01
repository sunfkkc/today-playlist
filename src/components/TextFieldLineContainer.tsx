import classnames from 'classnames';

export interface TextFieldLineContainerBaseProps {
  /**
   * 컴포넌트의 root element(`div`)에 추가되는 className입니다.
   */
  className?: string;

  /**
   * 에러 상태를 표시합니다.
   */
  hasError?: boolean;

  disabled?: boolean;

  /**
   * 입력값이 있을 떄 label이 위로 이동하는 대신 보통 placeholder 처럼 동작하게 만듭니다.
   */

  hasValue?: boolean;

  labelHtmlFor?: string;

  focused?: boolean;

  inputAdornment?: {
    start?: React.ReactNode;
    end?: React.ReactNode;
  };
}

export type Props<Element extends keyof JSX.IntrinsicElements = 'div'> =
  TextFieldLineContainerBaseProps & {
    as?: Element;
    value?: string | number | string[];
  } & Omit<
      JSX.IntrinsicElements[Element],
      keyof TextFieldLineContainerBaseProps | 'as'
    >;

function TextFieldLineContainer<T extends keyof JSX.IntrinsicElements = 'div'>(
  props: Props<T>
) {
  const {
    as: component = 'div',
    className,
    hasError,
    disabled,
    style,
    hasValue,
    children,
    labelHtmlFor,
    value = '',
    focused,
    inputAdornment,
    ...rest
  } = props;
  const Componnet = component as any;

  return (
    <Componnet
      className={classnames(
        'text-field-line',
        'font-size--14',
        { 'text-field-line--has-value': hasValue },
        { 'text-field-line--focused': focused },
        className
      )}
      {...rest}
    >
      {inputAdornment?.start}
      {children}
      {inputAdornment?.end}
    </Componnet>
  );
}

export default TextFieldLineContainer;
