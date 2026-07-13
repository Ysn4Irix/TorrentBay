import type { ComponentType } from 'react';
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  HardDrive,
  UserRound,
} from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';
import { cn } from '@/utils/cn';

export type MetricPillType =
  'seeders' | 'leechers' | 'size' | 'date' | 'uploader';

type MetricIcon = ComponentType<{
  color: string;
  size: number;
  strokeWidth?: number;
}>;

type MetricPillProps = {
  type: MetricPillType;
  value?: number | string;
  label?: string;
  compact?: boolean;
  className?: string;
};

type MetricTone = {
  accessibilityLabel: string;
  className: string;
  icon: MetricIcon;
  iconColor: string;
  label: string;
  textClassName: string;
};

const metricNumberFormatter = new Intl.NumberFormat();

function formatMetricValue(value?: number | string): string | null {
  if (typeof value === 'number') {
    return metricNumberFormatter.format(value);
  }

  const text = value?.trim();
  return text || null;
}

function getMetricTone({
  type,
  value,
  label,
}: MetricPillProps): MetricTone | null {
  const text = label?.trim() || formatMetricValue(value);

  if (!text) {
    return null;
  }

  if (type === 'seeders') {
    return {
      accessibilityLabel: `${text} seeders`,
      className: 'border-success/35 bg-success/10',
      icon: ArrowUp,
      iconColor: colors.success,
      label: text,
      textClassName: 'text-success',
    };
  }

  if (type === 'leechers') {
    return {
      accessibilityLabel: `${text} leechers`,
      className: 'border-warning/35 bg-warning/10',
      icon: ArrowDown,
      iconColor: colors.warning,
      label: text,
      textClassName: 'text-warning',
    };
  }

  if (type === 'size') {
    return {
      accessibilityLabel: `Size ${text}`,
      className: 'border-border bg-surface-muted',
      icon: HardDrive,
      iconColor: colors.textSecondary,
      label: text,
      textClassName: 'text-content-secondary',
    };
  }

  if (type === 'date') {
    return {
      accessibilityLabel: `Uploaded ${text}`,
      className: 'border-border bg-surface-muted',
      icon: CalendarDays,
      iconColor: colors.textSecondary,
      label: text,
      textClassName: 'text-content-secondary',
    };
  }

  return {
    accessibilityLabel: `Uploader ${text}`,
    className: 'border-border bg-surface-muted',
    icon: UserRound,
    iconColor: colors.textSecondary,
    label: text,
    textClassName: 'text-content-secondary',
  };
}

export function MetricPill(props: MetricPillProps) {
  const tone = getMetricTone(props);

  if (!tone) {
    return null;
  }

  const Icon = tone.icon;

  return (
    <View
      accessibilityLabel={tone.accessibilityLabel}
      accessible
      className={cn(
        'min-h-8 flex-row items-center gap-1.5 rounded-full border px-2.5 py-1.5',
        props.compact ? 'min-h-7 px-2 py-1' : null,
        tone.className,
        props.className,
      )}
    >
      <Icon
        color={tone.iconColor}
        size={props.compact ? 13 : 15}
        strokeWidth={2.25}
      />
      <Text
        className={cn(
          props.compact ? 'text-xs' : 'text-sm',
          'font-bold leading-[18px]',
          tone.textClassName,
        )}
        style={{ fontVariant: ['tabular-nums'] }}
      >
        {tone.label}
      </Text>
    </View>
  );
}
