import { Text as NativeText, TextProps as NativeTextProps } from 'react-native';

import { cn } from '@/utils/cn';

type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodyStrong'
  | 'small'
  | 'caption'
  | 'metric';

type TextProps = NativeTextProps & {
  className?: string;
  variant?: TextVariant;
};

const variantClasses: Record<TextVariant, string> = {
  display: 'text-[32px] font-bold leading-[38px]',
  h1: 'text-2xl font-bold leading-[30px]',
  h2: 'text-xl font-bold leading-[26px]',
  h3: 'text-[17px] font-semibold leading-[23px]',
  body: 'text-[15px] font-normal leading-[21px]',
  bodyStrong: 'text-[15px] font-semibold leading-[21px]',
  small: 'text-[13px] font-normal leading-[18px]',
  caption: 'text-[11px] font-medium leading-[15px]',
  metric: 'text-sm font-bold leading-[18px]',
};

export function Text({ className, variant = 'body', ...props }: TextProps) {
  return (
    <NativeText
      className={cn('text-content-primary', variantClasses[variant], className)}
      {...props}
    />
  );
}
