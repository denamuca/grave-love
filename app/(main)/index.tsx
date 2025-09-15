import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useApp } from '@/lib/store/AppContext';
import { Link } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

export default function FamilyHomeScreen() {
  const scheme = useColorScheme() ?? 'dark';
  const { memorials, posts } = useApp();
  const recentPosts = useMemo(() => posts.slice(0, 3), [posts]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors[scheme].background, dark: Colors[scheme].background }}
      headerHeight={100}
      headerImage={<View />}
    >
      <ThemedView style={styles.section}>
        <View style={styles.rowBetween}>
          <ThemedText type="title">Your Memorials</ThemedText>
          <Link href="/memorial/create" asChild>
            <View>
              <Button variant="ghost">+ Create</Button>
            </View>
          </Link>
        </View>
        {memorials.map((item) => (
          <Link key={item.id} href={{ pathname: '/memorial/[id]', params: { id: item.id } }} asChild>
            <Card>
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                <IconSymbol name="person.crop.circle" size={40} color={Colors[scheme].tint} />
                <View style={{ flex: 1, gap: 2 }}>
                  <ThemedText type="defaultSemiBold">{item.name_full}</ThemedText>
                  <ThemedText style={{ opacity: 0.8 }}>{`${item.date_birth} · ${item.date_death}`}</ThemedText>
                  {item.cemetery ? (
                    <ThemedText style={{ opacity: 0.7 }}>{item.cemetery}</ThemedText>
                  ) : null}
                </View>
                <IconSymbol name="chevron.right" size={20} color={Colors[scheme].muted} />
              </View>
            </Card>
          </Link>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="title">Recent Activity</ThemedText>
        {recentPosts.map((p) => (
          <Card key={p.id}>
            <ThemedText type="defaultSemiBold" style={{ marginBottom: 4 }}>
              {p.type.toUpperCase()}
            </ThemedText>
            <ThemedText>{p.text}</ThemedText>
            <ThemedText style={{ opacity: 0.7, marginTop: 6 }}>
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
});
