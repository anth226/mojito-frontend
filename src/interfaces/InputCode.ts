import type { InputProps, InputRef } from 'antd';

interface BaseInputCodeProps
  extends Omit<InputProps, 'value' | 'onChange' | 'className' | 'style'> {
  autoFocus?: boolean;
  disabled?: boolean;
  inputClassName?: InputProps['className'];
  inputStyle?: InputProps['style'];
  inputRef?: InputCodeRef;
  length?: number;
  placeholder?: string;
  onChange?: (value: string[]) => void;
  value?: string[] | null;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

interface BaseInputType extends BaseInputCodeProps {
  inputType?:
    | 'numeric'
    | 'alphabet'
    | 'symbol'
    | 'alphabet-symbol'
    | 'alphabet-numeric'
    | 'numeric-symbol'
    | 'all';
  inputRegex?: never;
}

interface CustomInputType extends BaseInputCodeProps {
  inputType: 'custom';

  inputRegex: string | RegExp;
}

export interface UseInputCodeProps {
  inputType: InputCodeProps['inputType'];
  inputRegex: InputCodeProps['inputRegex'];
  onChange: InputCodeProps['onChange'];
  length: NonNullable<InputCodeProps['length']>;
}

export type InputCodeProps = BaseInputType | CustomInputType;

export type InputCodeRef = React.MutableRefObject<InputRef[] | null[] | null>;
