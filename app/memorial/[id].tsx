import ScreenBackground from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import LottieOverlay from '@/components/ui/LottieOverlay';
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
  const { memorials, posts, serviceTypes, orders, addPost, candlesByName, startNameCandle } = useApp();
  const memorial = memorials.find((m) => m.id === id) ?? memorials[0];
  const timeline = useMemo(() => posts.filter((p) => p.memorial_id === memorial.id), [posts, memorial.id]);
  const scheme = useColorScheme() ?? 'light';
  const [tab, setTab] = useState<'wall' | 'timeline' | 'visits'>('wall');

  // Ensure the header shows only a back button (no title/label)
  useEffect(() => {
    navigation.setOptions?.({ headerTitle: '', headerBackTitle: '', headerBackTitleVisible: false });
  }, [navigation]);

  const candleUntil = candlesByName?.[memorial.id] ?? null;
  const isNameCandleActive = !!(candleUntil && new Date(candleUntil).getTime() > Date.now());

  function niceDate(iso: string) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return iso;
    }
  }

  function timeAgo(iso: string) {
    try {
      const now = Date.now();
      const then = new Date(iso).getTime();
      const diff = Math.max(0, now - then);
      const s = Math.floor(diff / 1000);
      if (s < 60) return 'just now';
      const m = Math.floor(s / 60);
      if (m < 60) return `${m}m ago`;
      const h = Math.floor(m / 60);
      if (h < 24) return `${h}h ago`;
      const d = Math.floor(h / 24);
      if (d < 30) return `${d}d ago`;
      const mo = Math.floor(d / 30);
      if (mo < 12) return `${mo}mo ago`;
      const y = Math.floor(mo / 12);
      return `${y}y ago`;
    } catch {
      return iso;
    }
  }

  type VisitEvent = { id: string; date: string; label: string; icon: keyof typeof MaterialIcons.glyphMap };
  const visitEvents = useMemo<VisitEvent[]>(() => {
    const items: VisitEvent[] = [];
    // From posts
    for (const p of posts.filter((p) => p.memorial_id === memorial.id)) {
      let label: string | null = null;
      if (p.type === 'flowers') {
        label = `${p.author ?? 'Someone'} purchased flowers for ${memorial.name_full}'s grave`;
      } else if (p.type === 'candle') {
        label = `${p.author ?? 'Someone'} lit a candle in remembrance`;
      } else if (p.type === 'message') {
        label = `${p.author ?? 'Someone'} left a message${p.text ? `: "${p.text}"` : ''}`;
      } else if (p.type === 'cleaning') {
        label = `${p.author ?? 'Someone'} cleaned the tombstone`;
      } else if (p.type === 'photo' || p.type === 'video' || p.type === 'story') {
        label = `${p.author ?? 'Someone'} shared a ${p.type}${p.text ? `: "${p.text}"` : ''}`;
      }
      if (label) {
        const icon: VisitEvent['icon'] =
          p.type === 'flowers' ? 'local-florist' :
          p.type === 'candle' ? 'whatshot' :
          p.type === 'cleaning' ? 'cleaning-services' :
          p.type === 'message' ? 'mode-comment' : 'history';
        items.push({ id: p.id, date: p.created_at, label, icon });
      }
    }
    // From completed orders
    for (const o of orders.filter((o) => o.memorial_id === memorial.id && o.status === 'completed')) {
      const st = serviceTypes.find((s) => s.id === o.service_type_id);
      const key = st?.key ?? '';
      const icon: VisitEvent['icon'] = key.includes('flower') ? 'local-florist' : key.includes('cleaning') ? 'cleaning-services' : 'event-available';
      const label = key.includes('flower')
        ? 'Flowers delivered to the memorial'
        : key.includes('cleaning')
        ? 'Grave cleaning completed'
        : `Service delivered: ${st?.name ?? 'Service'}`;
      items.push({ id: o.id, date: o.scheduled_date, label, icon });
    }

    // Sort newest first
    items.sort((a, b) => (a.date < b.date ? 1 : -1));
    return items;
  }, [posts, orders, serviceTypes, memorial.id, memorial.name_full]);

  return (
    <ScreenBackground>
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView lightColor="transparent" darkColor="transparent" style={styles.header}>
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
            <View style={[styles.candleInner, { backgroundColor: Colors[scheme].gold }] }>
              <RNImage source={require('@/assets/images/candle.png')} style={{ width: 18, height: 18 }} />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <ThemedText type="title" style={styles.name}>{memorial.name_full}</ThemedText>
          {isNameCandleActive ? (
            <RNImage source={require('@/assets/images/candle.png')} style={{ width: 20, height: 20 }} />
          ) : null}
        </View>
        <View style={{ marginTop: 6 }}>
          {isNameCandleActive ? (
            <ThemedText style={{ textAlign: 'center', color: Colors[scheme].muted }}>
              Candle burning until {new Date(candleUntil!).toDateString()}
            </ThemedText>
          ) : (
            <Button variant="ghost" onPress={() => startNameCandle(memorial.id)}>Place name candle</Button>
          )}
        </View>
        <ThemedText style={{ color: Colors[scheme].muted }}>{`${niceDate(memorial.date_birth)} - ${niceDate(memorial.date_death)}`}</ThemedText>
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
        <ThemedView lightColor="transparent" darkColor="transparent" style={styles.section}>
          <ThemedText type="title">Memorial Wall</ThemedText>
          <Card>
            <View style={styles.rowBetween}>
              <Link href={{ pathname: '/order/new', params: { memorialId: memorial.id, serviceId: serviceTypes[0]?.id } }} asChild>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Button variant="ghost">+ Light a candle</Button>
                </View>
              </Link>
              <Button
                variant="ghost"
                onPress={() => addPost({ memorial_id: memorial.id, type: 'candle', text: 'Lighting a candle from M.', author: 'You' })}>
                Quick add
              </Button>
            </View>
          </Card>
          {timeline.map((p) => {
            const isMessage = p.type === 'message';
            const postStyle = isMessage
              ? {
                  backgroundColor: '#c2a387',
                  borderColor: Colors[scheme].gold,
                }
              : undefined;
            return (
              <Card key={p.id} style={[postStyle, { position: 'relative' }]}>
                {/* Lottie animation on the right for memorial wall */}
                {p.type === 'candle' ? (
                  <LottieOverlay
                    source={require('@/assets/lottie/candle_giff.json')}
                    width={72}
                    height={72}
                    style={{ position: 'absolute', right: 4, bottom: 4 }}
                  />
                ) : p.type === 'message' ? (
                  <LottieOverlay
                    source={require('@/assets/lottie/message.json')}
                    width={72}
                    height={72}
                    style={{ position: 'absolute', right: 4, bottom: 4 }}
                  />
                ) : p.type === 'flowers' ? (
                  <LottieOverlay
                    source={require('@/assets/lottie/flower_giff.json')}
                    width={72}
                    height={72}
                    style={{ position: 'absolute', right: 4, bottom: 4 }}
                  />
                ) : null}

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: (p.type === 'candle' || p.type === 'message' || p.type === 'flowers') ? 80 : 0 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <ThemedText
                      style={{ fontWeight: 'bold', fontSize: 20, ...(isMessage ? { color: '#1b141b' } : {}) }}
                      type="defaultSemiBold"
                    >
                      {p.type.toUpperCase()}
                    </ThemedText>
                  </View>
                  <ThemedText style={{ color: isMessage ? '#321e1f' : Colors[scheme].muted }}>
                    {new Date(p.created_at).toDateString()}
                  </ThemedText>
                </View>
                {p.text ? (
                  <ThemedText style={{ marginTop: 6, ...(isMessage ? { color: '#1b141b' } : {}) }}>{p.text}</ThemedText>
                ) : null}
                {p.media_url ? (
                  <RNImage source={{ uri: p.media_url }} style={{ height: 160, borderRadius: 8, marginTop: 8 }} />
                ) : null}
              </Card>
            );
          })}
        </ThemedView>
      )}

      {tab === 'timeline' && (
        <ThemedView lightColor="transparent" darkColor="transparent" style={styles.section}>
          <ThemedText type="title">Family Timeline</ThemedText>
          {/* Quick add to post a candle-like message */}
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <ThemedText style={{ color: Colors[scheme].muted }}>Post to timeline</ThemedText>
              <Button
                variant="ghost"
                onPress={() =>
                  addPost({
                    memorial_id: memorial.id,
                    type: 'candle',
                    text: 'Lighting a candle in your memory',
                    author: 'You',
                  })
                }
              >
                + Lighting a candle
              </Button>
            </View>
          </Card>
          {timeline.map((p) => (
            <Card key={p.id}>
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <RNImage
                  source={
                    p.media_url
                      ? { uri: p.media_url }
                      : p.type === 'candle'
                      ? require('@/assets/images/candle_memorial.webp')
                      : p.type === 'flowers'
                      ? require('@/assets/images/flower_bouqet_memorial.jpeg')
                      : require('@/assets/images/old_photo_memorial.webp')
                  }
                  style={{ width: 104, height: 104, borderRadius: 14, backgroundColor: Colors[scheme].card }}
                />
                <View style={{ flex: 1 }}>
                  <ThemedText style={{ fontSize: 16 }}>
                    {p.text ?? (p.type === 'candle' ? 'Lighting a candle in your memory' : p.type)}
                  </ThemedText>
                  {p.author ? (
                    <ThemedText style={{ color: Colors[scheme].muted, marginTop: 6 }}>– {p.author}</ThemedText>
                  ) : null}
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <MaterialIcons name="favorite-border" size={18} color={Colors[scheme].tint as any} />
                  <ThemedText style={{ color: Colors[scheme].muted }}>1</ThemedText>
                </View>
                <MaterialIcons name="local-florist" size={18} color={Colors[scheme].tint as any} />
                <MaterialIcons name="water-drop" size={18} color={Colors[scheme].tint as any} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
                  <MaterialIcons name="mode-comment" size={18} color={Colors[scheme].muted as any} />
                  <ThemedText style={{ color: Colors[scheme].muted }}>12</ThemedText>
                </View>
              </View>
            </Card>
          ))}
        </ThemedView>
      )}

      {tab === 'visits' && (
        <ThemedView lightColor="transparent" darkColor="transparent" style={styles.section}>
          <ThemedText type="title">Visit History</ThemedText>
          <Card>
            {visitEvents.length > 0 ? (
              <ThemedText style={{ color: Colors[scheme].muted }}>Last visit: {timeAgo(visitEvents[0].date)}</ThemedText>
            ) : (
              <ThemedText style={{ color: Colors[scheme].muted }}>No visits recorded yet</ThemedText>
            )}
          </Card>
          {visitEvents.map((e, idx) => {
            const isLast = idx === visitEvents.length - 1;
            return (
              <View key={e.id} style={{ flexDirection: 'row', gap: 12 }}>
                {/* Timeline rail */}
                <View style={{ alignItems: 'center' }}>
                  <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: Colors[scheme].tint, marginTop: 8 }} />
                  {!isLast ? (
                    <View style={{ width: 2, flex: 1, backgroundColor: Colors[scheme].border, marginTop: 4, marginBottom: 8 }} />
                  ) : (
                    <View style={{ width: 2, height: 8, backgroundColor: 'transparent' }} />
                  )}
                </View>
                {/* Content */}
                <Card style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <MaterialIcons name={e.icon} size={18} color={Colors[scheme].tint as any} />
                    <ThemedText style={{ color: Colors[scheme].muted }}>{timeAgo(e.date)}</ThemedText>
                  </View>
                  <ThemedText>{e.label}</ThemedText>
                </Card>
              </View>
            );
          })}
        </ThemedView>
      )}

      <ThemedView style={[styles.section, {backgroundColor:'transparent'}]}>
        <ThemedText type="title">Services</ThemedText>
        <Card style={{ padding: 12 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingRight: 4 }}>
            {serviceTypes.map((s) => (
              <View key={s.id} style={[styles.serviceCard, { borderColor: Colors[scheme].border,}]}> 
                <View style={{ alignItems: 'center', marginBottom: 6 }}>
                  {s.image ? (
                    <RNImage source={s.image} style={{ width: '100%', height: 88, borderRadius: 10 }} resizeMode="cover" />
                  ) : s.key.includes('cleaning') ? (
                    <RNImage source={require('@/assets/images/grave_cleaning.webp')} style={{ width: 60, height: 60 }} />
                  ) : s.key.includes('flower') ? (
                    <RNImage source={require('@/assets/images/flower_bouqet_memorial.jpeg')} style={{ width: 60, height: 60 }} />
                  ) : s.key.includes('candle') ? (
                    <RNImage source={require('@/assets/images/candle_service.png')} style={{ width: 60, height: 60 }} />
                  ) : s.key.includes('photo') ? (
                    <RNImage source={require('@/assets/images/photo_service.webp')} style={{ width: 60, height: 60 }} />
                  ) : s.key.includes('stone') || s.key.includes('polish') ? (
                    <RNImage source={require('@/assets/images/headstone_polish.jpg')} style={{ width: 60, height: 60 }} />
                  ) : (
                    <MaterialIcons name="miscellaneous-services" size={28} color={Colors[scheme].tint as any} />
                  )}
                </View>
                <ThemedText style={{ textAlign: 'center', fontWeight: '600' }}>{s.name}</ThemedText>
                {/* <ThemedText style={{ textAlign: 'center', color: Colors[scheme].muted }}>{s.price}</ThemedText> */}
                {s.desc ? (
                  <ThemedText style={{ textAlign: 'center', marginTop: 4, color: Colors[scheme].muted }}>{s.desc}</ThemedText>
                ) : null}
                <View style={{ alignItems: 'center', marginTop: 8 }}>
                  <Link href={{ pathname: '/order/new', params: { memorialId: memorial.id, serviceId: s.id } }} asChild>
                    <Button>Order now</Button>
                  </Link>
                </View>
              </View>
            ))}
          </ScrollView>
        </Card>
      </ThemedView>
    </ScrollView>
    </ScreenBackground>
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
  section: { gap: 8, marginBottom:20 },
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
  serviceCard: {
    width: 160,
    padding: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom:30
  },
});
