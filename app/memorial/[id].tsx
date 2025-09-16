import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useApp } from '@/lib/store/AppContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, Image as RNImage, ScrollView, StyleSheet, View } from 'react-native';

export default function MemorialDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { memorials, posts, serviceTypes, addPost } = useApp();
  const memorial = memorials.find((m) => m.id === id) ?? memorials[0];
  const timeline = useMemo(() => posts.filter((p) => p.memorial_id === memorial.id), [posts, memorial.id]);
  const scheme = useColorScheme() ?? 'light';
  const [tab, setTab] = useState<'wall' | 'timeline' | 'visits'>('wall');

  // Ensure the header shows only a back button (no title/label)
  useEffect(() => {
    navigation.setOptions?.({ headerTitle: '', headerBackTitle: '', headerBackTitleVisible: false });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.header}>
        <View style={styles.portraitWrap}>
          <RNImage
            source={
              memorial.cover_image ?? {
                uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop',
              }
            }
            style={styles.portrait}
          />
          <View style={[styles.candleBadge, { backgroundColor: Colors[scheme].card, borderColor: Colors[scheme].border }] }>
            <View style={[styles.candleInner, { backgroundColor: Colors[scheme].gold }]}>
              <MaterialIcons name="local-fire-department" color={Colors[scheme].background} size={14} />
            </View>
          </View>
        </View>
        <ThemedText type="title" style={styles.name}>{memorial.name_full}</ThemedText>
        <ThemedText style={{ color: Colors[scheme].muted }}>{`${memorial.date_birth} - ${memorial.date_death}`}</ThemedText>
        {memorial.cemetery ? (
          <ThemedText style={{ color: Colors[scheme].muted }}>Resting Place: {memorial.cemetery}{memorial.plot ? `, ${memorial.plot}` : ''}</ThemedText>
        ) : null}

        {/* Segmented tabs */}
        <View style={[styles.tabs, { backgroundColor: Colors[scheme].card, borderColor: Colors[scheme].border }] }>
          {[
            { key: 'wall', label: 'Memorial Wall' },
            { key: 'timeline', label: 'Family Timeline' },
            { key: 'visits', label: 'Visit History' },
          ].map((t) => (
            <Pressable key={t.key} onPress={() => setTab(t.key as any)} style={styles.tabButton}>
              <ThemedText style={{ color: tab === t.key ? Colors[scheme].tint : Colors[scheme].muted, fontWeight: tab === t.key ? '700' : '500' }}>
                {t.label}
              </ThemedText>
            </Pressable>
          ))}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: tab === 'wall' ? '3.5%' : tab === 'timeline' ? '36%' : '70%',
              width: '26%',
              height: 3,
              borderRadius: 2,
              backgroundColor: Colors[scheme].tint,
            }}
          />
        </View>
      </ThemedView>

      {tab === 'wall' && (
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Memorial Wall</ThemedText>
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
      )}

      {tab === 'timeline' && (
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Family Timeline</ThemedText>
          {timeline.map((p) => (
            <Card key={p.id}>
              <ThemedText type="defaultSemiBold">{p.type.toUpperCase()}</ThemedText>
              <ThemedText>{p.text}</ThemedText>
              <ThemedText style={{ color: Colors[scheme].muted, marginTop: 4 }}>
                {new Date(p.created_at).toDateString()}{p.author ? ` · ${p.author}` : ''}
              </ThemedText>
              {p.media_url ? (
                <RNImage source={{ uri: p.media_url }} style={{ height: 160, borderRadius: 8, marginTop: 8 }} />
              ) : null}
            </Card>
          ))}
        </ThemedView>
      )}

      {tab === 'visits' && (
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Visit History</ThemedText>
          <Card>
            <ThemedText>Recent visitors: 12 (simulated)</ThemedText>
            <ThemedText style={{ color: Colors[scheme].muted }}>Last visit: 2 days ago</ThemedText>
          </Card>
        </ThemedView>
      )}

      {/* Services always available below */}
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
  header: { gap: 10, alignItems: 'center' },
  headerTop: { width: '100%', alignItems: 'center', marginTop: 4 },
  portraitWrap: { position: 'relative', marginTop: 6 },
  portrait: { width: 96, height: 96, borderRadius: 48 },
  candleBadge: {
    position: 'absolute',
    right: -6,
    bottom: -2,
    width: 28,
    height: 28,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  candleInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { textAlign: 'center' },
  section: { gap: 8 },
  card: {
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
  },
  tabs: {
    width: '100%',
    paddingHorizontal: 8,
    paddingTop: 12,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 10,
    marginTop: 8,
  },
  tabButton: { flex: 1, alignItems: 'center', paddingVertical: 6 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
});
