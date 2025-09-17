import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ScreenBackgroundProps = PropsWithChildren<{ style?: any }>;

export function ScreenBackground({ children, style }: ScreenBackgroundProps) {
  const scheme = useColorScheme() ?? 'light';
  const grad = Colors[scheme].gradient as { start: string; end: string };

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={[grad.start, grad.end]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });

export default ScreenBackground;

