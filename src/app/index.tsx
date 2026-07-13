import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { BrandMark } from '@/components/brand/BrandMark';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';

export default function SplashScreen() {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.replace('/home');
    }, 900);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Screen centered contentClassName="bg-background px-8">
      <BrandMark size={88} />

      <Text className="mt-5 text-center text-4xl font-bold text-content-primary">
        <Text className="text-4xl font-bold text-content-primary">Torrent</Text>
        <Text className="text-4xl font-bold text-primary">Bay</Text>
      </Text>
      <Text className="mt-3 text-center text-base text-content-secondary">
        Public metadata search
      </Text>

      <View className="mt-12 h-1.5 w-40 overflow-hidden rounded-full bg-surface-elevated">
        <View className="h-full w-2/3 rounded-full bg-primary" />
      </View>
      <Text className="mt-5 text-center text-sm font-medium text-primary">
        Loading...
      </Text>
    </Screen>
  );
}
