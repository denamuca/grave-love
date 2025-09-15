import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Image as RNImage } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/lib/store/AppContext';
import { Link } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function MemorialDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { memorials, posts, serviceTypes, addPost } = useApp();
  const memorial = memorials.find((m) => m.id === id) ?? memorials[0];
  const timeline = posts.filter((p) => p.memorial_id === memorial.id);
  const scheme = useColorScheme() ?? 'dark';

  // Update header title and hide back text
  useEffect(() => {
    navigation.setOptions?.({ title: memorial.name_full, headerBackTitleVisible: false });
  }, [memorial, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">{memorial.name_full}</ThemedText>
        <ThemedText>{`${memorial.date_birth} — ${memorial.date_death}`}</ThemedText>
        {memorial.cemetery ? (
          <ThemedText style={{ color: Colors[scheme].muted }}>{memorial.cemetery}</ThemedText>
        ) : null}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">About</ThemedText>
        <Card>
          <ThemedText>{memorial.bio ?? 'No bio yet.'}</ThemedText>
        </Card>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Timeline</ThemedText>
        <Card>
          <View style={styles.rowBetween}>
            <Link href={{ pathname: '/order/new', params: { memorialId: memorial.id, serviceId: serviceTypes[0]?.id } }} asChild>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Button variant="ghost">+ Light a candle</Button>
              </View>
            </Link>
            <Button
              variant="ghost"
              onPress={() => addPost({ memorial_id: memorial.id, type: 'candle', text: 'Lighting a candle', author: 'You' })}>
              Quick add
            </Button>
          </View>
        </Card>
        {timeline.map((p) => (
          <Card key={p.id}>
            <ThemedText type="defaultSemiBold">{p.type.toUpperCase()}</ThemedText>
            <ThemedText>{p.text}</ThemedText>
            {p.media_url ? (
              <RNImage source={{ uri: p.media_url }} style={{ height: 160, borderRadius: 8, marginTop: 8 }} />
            ) : null}
          </Card>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Services</ThemedText>
        {serviceTypes.map((s) => (
          <Card key={s.id}>
            <View style={styles.rowBetween}>
              <ThemedText>
                {s.name} · {s.price}
              </ThemedText>
              <Link href={{ pathname: '/order/new', params: { memorialId: memorial.id, serviceId: s.id } }} asChild>
                <View>
                  <Button>Order</Button>
                </View>
              </Link>
            </View>
            <View style={{ marginTop: 8 }}>
              <Link href={{ pathname: '/subscription/new', params: { memorialId: memorial.id } }} asChild>
                <View>
                  <Button variant="ghost">Subscribe (flowers/cleaning)</Button>
                </View>
              </Link>
            </View>
          </Card>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">QR / Visitors</ThemedText>
        <Card>
          <ThemedText>QR tag linked: Yes (simulated)</ThemedText>
          <ThemedText>Recent visitors: 12 (simulated)</ThemedText>
        </Card>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  header: { gap: 6 },
  section: { gap: 8 },
  card: {
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
  },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
});
