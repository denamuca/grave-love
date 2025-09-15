/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Gold accent for a dignified palette
const gold = '#C8A14B';

// Force dark mode for the prototype look
export const ForceDark = true;

export const Colors = {
  light: {
    // Use a dark UI even when system is light to keep the brand look consistent
    text: '#E6E7EA',
    background: '#0F1115',
    tint: gold,
    icon: '#8C919A',
    tabIconDefault: '#6F7480',
    tabIconSelected: gold,
    // Additions for components
    card: '#141821',
    border: '#262C36',
    muted: '#A0A4AA',
    gold,
  },
  dark: {
    text: '#E6E7EA',
    background: '#0F1115',
    tint: gold,
    icon: '#8C919A',
    tabIconDefault: '#6F7480',
    tabIconSelected: gold,
    card: '#141821',
    border: '#262C36',
    muted: '#A0A4AA',
    gold,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
