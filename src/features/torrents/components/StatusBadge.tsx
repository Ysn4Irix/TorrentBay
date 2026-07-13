import type { ComponentType } from 'react';
import {
  ShieldCheck,
  Crown,
  Database,
  HeartPulse,
  Tag,
} from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';
import { cn } from '@/utils/cn';

export type TorrentHealthStatus =
  'healthy' | 'active' | 'low' | 'inactive' | 'unknown';

export type StatusBadgeType =
  'category' | 'subcategory' | 'trusted' | 'vip' | 'health' | 'cached';

type BadgeIcon = ComponentType<{
  color: string;
  size: number;
  strokeWidth?: number;
}>;

type StatusBadgeProps = {
  type: StatusBadgeType;
  label?: string;
  health?: TorrentHealthStatus;
  className?: string;
};

type BadgeTone = {
  accessibilityLabel: string;
  className: string;
  icon: BadgeIcon;
  iconColor: string;
  label: string;
  textClassName: string;
};

const healthLabels: Record<TorrentHealthStatus, string> = {
  healthy: 'Healthy',
  active: 'Active',
  low: 'Low',
  inactive: 'Inactive',
  unknown: 'Unknown',
};

const healthClasses: Record<TorrentHealthStatus, string> = {
  healthy: 'border-success/40 bg-success/10',
  active: 'border-primary/40 bg-primary-soft',
  low: 'border-warning/40 bg-warning/10',
  inactive: 'border-error/40 bg-error/10',
  unknown: 'border-border bg-surface-muted',
};

const healthTextClasses: Record<TorrentHealthStatus, string> = {
  healthy: 'text-success',
  active: 'text-primary',
  low: 'text-warning',
  inactive: 'text-error',
  unknown: 'text-content-secondary',
};

const healthIconColors: Record<TorrentHealthStatus, string> = {
  healthy: colors.success,
  active: colors.primary,
  low: colors.warning,
  inactive: colors.error,
  unknown: colors.textSecondary,
};

function getBadgeTone({
  type,
  label,
  health = 'unknown',
}: StatusBadgeProps): BadgeTone | null {
  if (type === 'category') {
    const value = label?.trim();

    if (!value) {
      return null;
    }

    return {
      accessibilityLabel: `Category: ${value}`,
      className: 'border-info/35 bg-info/10',
      icon: Tag,
      iconColor: colors.info,
      label: value,
      textClassName: 'text-info',
    };
  }

  if (type === 'subcategory') {
    const value = label?.trim();

    if (!value) {
      return null;
    }

    return {
      accessibilityLabel: `Subcategory: ${value}`,
      className: 'border-border bg-surface-muted',
      icon: Tag,
      iconColor: colors.textSecondary,
      label: value,
      textClassName: 'text-content-secondary',
    };
  }

  if (type === 'trusted') {
    return {
      accessibilityLabel: 'Uploader marked trusted by provider',
      className: 'border-success/40 bg-success/10',
      icon: ShieldCheck,
      iconColor: colors.success,
      label: label?.trim() || 'Trusted',
      textClassName: 'text-success',
    };
  }

  if (type === 'vip') {
    return {
      accessibilityLabel: 'Uploader marked VIP by provider',
      className: 'border-vip/40 bg-vip/10',
      icon: Crown,
      iconColor: colors.vip,
      label: label?.trim() || 'VIP',
      textClassName: 'text-vip',
    };
  }

  if (type === 'cached') {
    return {
      accessibilityLabel: 'Cached saved metadata',
      className: 'border-warning/40 bg-warning/10',
      icon: Database,
      iconColor: colors.warning,
      label: label?.trim() || 'Cached',
      textClassName: 'text-warning',
    };
  }

  return {
    accessibilityLabel: `Health status: ${healthLabels[health]}`,
    className: healthClasses[health],
    icon: HeartPulse,
    iconColor: healthIconColors[health],
    label: label?.trim() || healthLabels[health],
    textClassName: healthTextClasses[health],
  };
}

export function deriveTorrentHealth(seeders?: number): TorrentHealthStatus {
  if (typeof seeders !== 'number') {
    return 'unknown';
  }

  if (seeders >= 50) {
    return 'healthy';
  }

  if (seeders >= 10) {
    return 'active';
  }

  if (seeders >= 1) {
    return 'low';
  }

  return 'inactive';
}

export function StatusBadge(props: StatusBadgeProps) {
  const tone = getBadgeTone(props);

  if (!tone) {
    return null;
  }

  const Icon = tone.icon;

  return (
    <View
      accessibilityLabel={tone.accessibilityLabel}
      accessible
      className={cn(
        'min-h-7 flex-row items-center gap-1.5 rounded-sm border px-2 py-1',
        tone.className,
        props.className,
      )}
    >
      <Icon color={tone.iconColor} size={13} strokeWidth={2.25} />
      <Text
        className={cn(
          'text-[11px] font-semibold leading-[15px]',
          tone.textClassName,
        )}
      >
        {tone.label}
      </Text>
    </View>
  );
}
