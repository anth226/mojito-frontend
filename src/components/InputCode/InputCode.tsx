import { forwardRef, useMemo } from 'react';

import { Input, InputProps, InputRef } from 'antd';
import cx from 'classnames';
import { useInputCode } from 'hooks/useInputCode';
import { InputCodeProps, InputCodeRef } from 'interfaces/InputCode';
import './styles.css';

const InputCodeSingle = forwardRef<InputRef, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <Input
        className={cx('input-otp__field', className)}
        maxLength={1}
        ref={ref}
        {...rest}
      />
    );
  }
);

const InputCode = forwardRef<HTMLDivElement, InputCodeProps>(
  (
    {
      autoFocus,
      disabled,
      id,
      inputClassName,
      inputRef = null,
      inputRegex,
      inputStyle,
      inputType = 'all',
      length = 6,
      onChange,
      placeholder,
      value,
      wrapperClassName,
      wrapperStyle,
      ...rest
    },
    ref
  ) => {
    const {
      handleChange,
      handleFocus,
      handleKeyDown,
      handleKeyPress,
      handlePaste,
      codeValue,
    } = useInputCode({ inputRegex, inputType, length, onChange });

    const makeLength = useMemo(() => {
      if (length < 2) return 2;
      if (length > 16) return 16;
      return length;
    }, [length]);

    return (
      <div
        className={cx('input-code', wrapperClassName)}
        id={id}
        ref={ref}
        style={wrapperStyle}
      >
        {Array(makeLength)
          .fill(null)
          .map((_, idx) => {
            return (
              <InputCodeSingle
                autoFocus={autoFocus && idx === 0}
                key={idx}
                onFocus={handleFocus}
                onInput={handleChange}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress}
                ref={(r) => {
                  if (inputRef) {
                    if (inputRef.current === null) {
                      inputRef.current = [];
                    }

                    inputRef.current[idx] = r;
                  }
                }}
                className={inputClassName}
                style={inputStyle}
                disabled={disabled}
                placeholder={
                  placeholder?.length === 1 ? placeholder : placeholder?.[idx]
                }
                value={value?.[idx] || codeValue?.[idx]}
                {...rest}
              />
            );
          })}
      </div>
    );
  }
);

export { InputCode, type InputCodeProps, type InputCodeRef };
