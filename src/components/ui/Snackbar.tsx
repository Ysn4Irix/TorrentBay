import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/Text';

type SnackbarProps = {
  visible: boolean;
  message: string;
  actionLabel?: string;
  durationMs?: number;
  bottomOffset?: number;
  onAction?: () => void;
  onDismiss?: () => void;
};

export function Snackbar({
  visible,
  message,
  actionLabel,
  durationMs = 3500,
  bottomOffset = 0,
  onAction,
  onDismiss,
}: SnackbarProps) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!visible || !onDismiss) {
      return undefined;
    }

    const timeout = setTimeout(onDismiss, durationMs);

    return () => clearTimeout(timeout);
  }, [durationMs, onDismiss, visible]);

  if (!visible) {
    return null;
  }

  return (
    <View
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
      className="absolute left-4 right-4 rounded-lg border border-border bg-surface-elevated px-4 py-3 shadow-sm shadow-black/30"
      style={{ bottom: Math.max(insets.bottom, 24) + bottomOffset }}
    >
      <View className="flex-row items-center gap-3">
        <Text className="flex-1 text-content-primary">{message}</Text>
        {actionLabel && onAction ? (
          <Pressable
            accessibilityLabel={actionLabel}
            accessibilityRole="button"
            className="min-h-10 items-center justify-center rounded-md px-3 active:bg-primary-soft active:opacity-85"
            hitSlop={{ top: 4, bottom: 4 }}
            onPress={onAction}
          >
            <Text className="font-semibold text-primary">{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
