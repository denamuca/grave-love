import { PropsWithChildren } from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ButtonProps = PropsWithChildren<{
  onPress?: () => void;
  href?: any; // if used with Link asChild
  style?: StyleProp<ViewStyle>;
  variant?: 'primary' | 'ghost';
  disabled?: boolean;
}>;

export function Button({ children, onPress, style, variant = 'primary', disabled }: ButtonProps) {
  const scheme = useColorScheme() ?? 'dark';
  const bg = variant === 'primary' ? Colors[scheme].tint : 'transparent';
  const border = variant === 'primary' ? 'transparent' : Colors[scheme].tint;
  const textColor = variant === 'primary' ? '#FFFFFF' : Colors[scheme].tint;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: bg, borderColor: border, opacity: disabled ? 0.6 : pressed ? 0.85 : 1 },
        style,
      ]}>
      <ThemedText style={[styles.text, { color: textColor } as TextStyle]}>{children}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontWeight: '600' },
});
