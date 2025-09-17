/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const accentBlue = '#3a7ca5';
const accentPurple = '#7C3AED';
// Brand tones
const brandGold = '#c7a98d';
const brandGoldSoft = '#EADFCC';
const brandSilver = '#C9CCD6';
const silverLight = '#667085';
const midnight = '#0B0E14';
const dusk = '#151A27';
const softBackground = '#F4F6F9';
const ivory = '#F7F3E8';
const cardWhite = '#FFFFFF';
const borderLight = '#E5E7EB';
const textDark = '#1F2937';
const mutedGray = '#6B7280';

// Candle gold accent used sparingly
const gold = '#F2C15A';
const glow = '#FADCA0';

// Force the app to use dark mode only
export const ForceDark = true;

export const Colors = {
  light: {
    text: textDark,
    background: softBackground,
    tint: accentBlue,
    purple: accentPurple,
    icon: '#64748B',
    tabIconDefault: '#94A3B8',
    tabIconSelected: accentBlue,
    card: cardWhite,
    border: borderLight,
    muted: mutedGray,
    gold,
    // Brand additions
    silver: silverLight,
    ivory,
    glow,
    gradient: { start: '#EAF0FF', end: '#FFFFFF' },
  },
  dark: {
    // Dark theme palette (locked)
    text: '#cccabe',
    background: '#1b141b',
    tint: brandGold,
    icon: '#8C919A',
    tabIconDefault: '#6F7480',
    tabIconSelected: brandGold,
    card: '#0e0d12',
    border: '#262C36',
    muted: '#A0A4AA',
    gold,
    purple: accentPurple,
    // Brand additions
    silver: brandSilver,
    ivory: brandGoldSoft,
    glow,
    // Background gradient: light black to brown
    gradient: { start: '#1b141b', end: '#321e1f' },
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS serif that feels elegant without custom font files */
    serif: 'Baskerville',
    /** Prefer serif for titles */
    display: 'Baskerville',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  android: {
    sans: 'sans-serif',
    serif: 'serif',
    display: 'serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    display: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    // Prefer Inter/Open Sans for copy, Playfair/Merriweather for headings
    sans: "'Inter', 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "'Merriweather', Georgia, 'Times New Roman', serif",
    display: "'Playfair Display', 'Merriweather', Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Optional helper tokens (not yet used but available for styling)
export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
} as const;

export const Shadows = {
  dark: 'rgba(0,0,0,0.40)',
  light: 'rgba(0,0,0,0.08)',
  glow,
} as const;
