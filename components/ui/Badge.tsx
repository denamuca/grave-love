import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

type BadgeProps = PropsWithChildren<{ color?: string; background?: string }>

export function Badge({ children, color, background }: BadgeProps) {
  const scheme = useColorScheme() ?? 'dark';
  const tint = Colors[scheme].tint;
  const fg = color ?? tint;
  const bg = background ?? 'rgba(200,161,75,0.18)';
  return (
    <View style={[styles.badge, { backgroundColor: bg, borderColor: tint }]}> 
      <ThemedText style={[styles.text, { color: fg }]}>{children}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999, borderWidth: StyleSheet.hairlineWidth },
  text: { fontSize: 12, fontWeight: '700' },
});
