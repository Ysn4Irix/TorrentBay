import { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { cn } from '@/utils/cn';

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ children, className }: CardProps) {
  return (
    <View
      className={cn(
        'rounded-lg border border-border bg-surface p-5 shadow-sm shadow-black/20',
        className,
      )}
    >
      {children}
    </View>
  );
}
