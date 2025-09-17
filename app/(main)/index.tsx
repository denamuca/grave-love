import MemorialCard from '@/components/MemorialCard';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/Card';
import LottieOverlay from '@/components/ui/LottieOverlay';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useApp } from '@/lib/store/AppContext';
import { Link, router } from 'expo-router';
import { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function FamilyHomeScreen() {
  const scheme = useColorScheme() ?? 'light';
  const { memorials, posts } = useApp();
  const recentPosts = useMemo(() => {
    return [...posts].sort((a, b) => (a.created_at < b.created_at ? 1 : -1)).slice(0, 3);
  }, [posts]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'transparent', dark: 'transparent' }}
      headerHeight={100}
      headerImage={<View />}
    >
      {/* Brand header image above section titles */}
      <View style={{ alignItems: 'center', marginTop: 4, marginBottom: 6 }}>
        <Image
          source={require('@/assets/images/grave_love_header.png')}
          style={{ width: 160, height: 80 }}
          resizeMode="contain"
        />
      </View>
      <ThemedView lightColor="transparent" darkColor="transparent" style={styles.section}>
        <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', marginBottom:20 }}>
          <ThemedText type="title" style={{ textAlign: 'center' }}>Your Memorials</ThemedText>
        </View>
        {memorials.map((item) => (
          <MemorialCard
            key={item.id}
            memorial={item}
            onPress={() => router.push({ pathname: '/memorial/[id]', params: { id: item.id } })}
          />
        ))}
      </ThemedView>

      <ThemedView lightColor="transparent" darkColor="transparent" style={styles.section}>
        <ThemedText type="title">Recent Activity</ThemedText>
        {recentPosts.map((p) => (
          <Card
            key={p.id}
            style={
              p.type === 'message'
                ? {
                    // richer gold tint in both modes
                    backgroundColor:
                      scheme === 'dark'
                        ? 'rgba(242, 193, 90, 0.18)'
                        : 'rgba(242, 193, 90, 0.22)',
                    borderColor: Colors[scheme].gold,
                    // gentle gold glow
                    shadowColor: Colors[scheme].gold,
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                    shadowOffset: { width: 0, height: 4 },
                    elevation: 3,
                  }
                : undefined
            }>
            {p.type === 'candle' ? (
              <LottieOverlay
                source={require('@/assets/lottie/candle_giff.json')}
                width={80}
                height={90}
                style={{ position: 'absolute', right: 4, bottom: 10 }}
              />
            ) : p.type === 'message' ? (
              <LottieOverlay
                source={require('@/assets/lottie/message.json')}
                width={80}
                height={80}
                style={{ position: 'absolute', right: 4, bottom: 10 }}
              />
            ) : p.type === 'flowers' ? (
              <LottieOverlay
                source={require('@/assets/lottie/flower_giff.json')}
                width={80}
                height={80}
                style={{ position: 'absolute', right: 4, bottom: 10 }}
                // fallbackSource={require('@/assets/images/flower.png')}
              />
            ) : null}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, paddingRight: (p.type === 'candle' || p.type === 'message' || p.type === 'flowers') ? 96 : 0 }}>
              <ThemedText style={{fontSize:20, fontWeight: 'bold'}} type="defaultSemiBold">{p.type.toUpperCase()}</ThemedText>
            </View>
            <ThemedText style={{fontSize:18}}>{p.text}</ThemedText>
            <ThemedText style={{ opacity: 0.7, marginTop: 6 , textAlign: 'center'}}>
              {new Date(p.created_at).toDateString()}
            </ThemedText>
          </Card>
        ))}
        <Link href={{ pathname: '/memorial/[id]', params: { id: memorials[0].id } }}>
          <ThemedText type="link">View more on timeline →</ThemedText>
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: { height: 178, width: 290, bottom: 0, left: 0, position: 'absolute' },
  section: { gap: 8, marginBottom: 16 },
  card: {
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    marginVertical: 6,
  },
  post: { paddingVertical: 6 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
