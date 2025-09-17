import { Image, Platform, StyleProp, View, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';

type Props = {
  source: any;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  fallbackSource?: any;
};

export default function LottieOverlay({ source, width = 72, height = 72, style, fallbackSource }: Props) {
  // Render a static fallback image underneath. On platforms where Lottie
  // isn't available (e.g., web or Expo Go without the module), the image remains.
  if (Platform.OS === 'web') {
    return fallbackSource ? (
      <Image source={fallbackSource} style={[{ width, height }, style as any]} resizeMode="contain" />
    ) : (null as any);
  }
  return (
    <View pointerEvents="none" style={style}>
      {fallbackSource ? (
        <Image source={fallbackSource} style={{ width, height, position: 'absolute', right: 0, bottom: 0 }} resizeMode="contain" />
      ) : null}
      <LottieView source={source} autoPlay loop style={{ width, height }} />
    </View>
  );
}
