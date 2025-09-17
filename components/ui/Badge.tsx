import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { PropsWithChildren } from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

type BadgeProps = PropsWithChildren<{ color?: string; background?: string; iconSource?: ImageSourcePropType; iconSize?: number }>

export function Badge({ children, color, background, iconSource, iconSize = 14 }: BadgeProps) {
  const scheme = useColorScheme() ?? 'dark';
  const tint = Colors[scheme].tint;
  const fg = color ?? tint;
  const bg = background ?? 'rgba(199,169,141,0.18)';
  return (
    <View style={[styles.badge, { backgroundColor: bg, borderColor: tint }]}> 
      {iconSource ? (
        <Image source={iconSource} style={{ width: iconSize, height: iconSize, marginRight: 6 }} resizeMode="contain" />
      ) : null}
      <ThemedText style={[styles.text, { color: fg }]}>{children}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, borderWidth: StyleSheet.hairlineWidth },
  text: { fontSize: 14, fontWeight: '600' },
});
