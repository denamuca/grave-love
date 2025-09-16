/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const accentBlue = '#3a7ca5';
const softBackground = '#F4F6F9';
const cardWhite = '#FFFFFF';
const borderLight = '#E5E7EB';
const textDark = '#1F2937';
const mutedGray = '#6B7280';

// Candle gold accent used sparingly
const gold = '#F2C15A';

// Do not force dark; allow system/light
export const ForceDark = false;

export const Colors = {
  light: {
    text: textDark,
    background: softBackground,
    tint: accentBlue,
    icon: '#64748B',
    tabIconDefault: '#94A3B8',
    tabIconSelected: accentBlue,
    card: cardWhite,
    border: borderLight,
    muted: mutedGray,
    gold,
  },
  dark: {
    // Keep existing pleasant dark for users on dark mode
    text: '#E6E7EA',
    background: '#0F1115',
    tint: accentBlue,
    icon: '#8C919A',
    tabIconDefault: '#6F7480',
    tabIconSelected: accentBlue,
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
    /** Display/script for titles (add custom loaded font later on native) */
    display: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    display: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    display: "'Niconne', Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
