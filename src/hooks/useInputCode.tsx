import { useCallback, useState } from 'react';

import { UseInputCodeProps } from 'interfaces/InputCode';
import { kRegexDictionary } from 'constants/InputCode';

export const useInputCode = ({
  inputRegex,
  inputType,
  onChange,
  length,
}: UseInputCodeProps) => {
  const [codeValue, setCodeValue] = useState<string[]>([]);

  const getSibling = (e: React.FormEvent<HTMLInputElement>) =>
    ({
      prev: e.currentTarget.previousElementSibling,
      next: e.currentTarget.nextElementSibling,
    } as Record<'prev' | 'next', (EventTarget & HTMLInputElement) | null>);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const tester =
        typeof inputRegex === 'string' ? new RegExp(inputRegex) : inputRegex!;

      if (
        (inputType === 'custom' && inputRegex && !tester.test(e?.key)) ||
        (inputType &&
          inputType !== 'all' &&
          inputType !== 'custom' &&
          kRegexDictionary[inputType].test(e?.key))
      )
        return e.preventDefault();
    },
    [inputRegex, inputType]
  );

  // * Comes from antd to make field select all value
  // * when clicked (focus).
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e?.currentTarget?.select();
  }, []);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const nextInput = getSibling(e).next;
      const currInput = e.currentTarget;
      const target = e?.target as HTMLElement;
      const currInputIdx = Array.from(target?.parentNode!.children).indexOf(
        target
      );
      const value: string = e.currentTarget?.value;

      const newCodeValue = [...codeValue];

      if (currInputIdx !== null && currInputIdx !== undefined) {
        newCodeValue[currInputIdx] = value;
      }

      setCodeValue(newCodeValue);
      onChange?.(newCodeValue);

      if (!nextInput || !currInput || !value) return;

      if (nextInput) nextInput.select();
      else if (!nextInput) currInput.blur();
    },
    [onChange, codeValue]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          getSibling(e).prev?.select();
          break;
        case 'ArrowRight':
          e.preventDefault();
          getSibling(e).next?.select();
          break;
        default:
          break;
      }

      return;
    },
    []
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const target = e?.target as HTMLElement;
      const currentInput = Array.from(target?.parentNode!.children);
      const currentInputIdx = currentInput.indexOf(target);

      const getClipboardData = e.clipboardData.getData('text');

      const tester =
        typeof inputRegex === 'string' ? new RegExp(inputRegex) : inputRegex!;

      if (
        (inputType === 'custom' &&
          inputRegex &&
          !tester.test(getClipboardData)) ||
        (inputType &&
          inputType !== 'all' &&
          inputType !== 'custom' &&
          kRegexDictionary[inputType].test(getClipboardData))
      )
        return;

      const clipboardDataArray = getClipboardData
        .split('')
        .slice(0, length - currentInputIdx);
      let currentValue = [...codeValue];

      if (!currentValue || currentValue.length < 1)
        currentValue = Array(length).fill('');

      for (let i = 0; i < length; i++) {
        if (clipboardDataArray[i])
          currentValue[i + currentInputIdx] = clipboardDataArray[i];
      }

      setCodeValue(currentValue);
      onChange?.(currentValue);

      if (currentInput[clipboardDataArray.length + currentInputIdx]) {
        (
          currentInput[
            clipboardDataArray.length + currentInputIdx
          ] as HTMLInputElement
        ).select();
      } else {
        (
          currentInput[
            clipboardDataArray.length + currentInputIdx - 1
          ] as HTMLInputElement
        ).focus();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [length, onChange, codeValue]
  );

  return {
    handleChange,
    handleFocus,
    handleKeyDown,
    handleKeyPress,
    handlePaste,
    codeValue,
  };
};
