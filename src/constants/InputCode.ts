import { UseInputCodeProps } from 'interfaces/InputCode';

export const kRegexDictionary: Record<
  NonNullable<Exclude<UseInputCodeProps['inputType'], 'all' | 'custom'>>,
  RegExp
> = {
  alphabet: /[^A-Za-z]/,
  'alphabet-numeric': /[\W_]/,
  'alphabet-symbol': /[\d]|[^\S]/,
  numeric: /\D/,
  'numeric-symbol': /[A-Za-z]|[^\S]/,
  symbol: /[^\W_]|[^\S]/,
};
