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
  const { memorials, posts, serviceTypes, addPost, candlesByName, startNameCandle } = useApp();
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
            <Button variant="ghost" onPress={() => startNameCandle(memorial.id)}>Place name candle ($3)</Button>
          )}
        </View>
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
                  backgroundColor: scheme === 'dark' ? 'rgba(234, 223, 204, 0.10)' : Colors[scheme].ivory,
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
                    <ThemedText style={{ fontWeight: 'bold', fontSize: 20 }} type="defaultSemiBold">{p.type.toUpperCase()}</ThemedText>
                  </View>
                  <ThemedText style={{ color: Colors[scheme].muted,}}>{new Date(p.created_at).toDateString()}</ThemedText>
                </View>
                {p.text ? (
                  <ThemedText style={{ marginTop: 6 }}>{p.text}</ThemedText>
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
          {/* Static delivery photo example */}
          <Card>
            <RNImage
              source={require('@/assets/images/delivery_cementery.jpg')}
              style={{ width: '100%', height: 200, borderRadius: 12 }}
              resizeMode="cover"
            />
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
            <ThemedText style={{ color: Colors[scheme].muted }}>Last visit: 2 days ago</ThemedText>
          </Card>
        </ThemedView>
      )}

      {/* Services in a horizontal row */}
      <ThemedView style={styles.section}>
        <ThemedText type="title">Services</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
          {serviceTypes.map((s) => (
            <View key={s.id} style={[styles.serviceCard, { borderColor: Colors[scheme].border, backgroundColor: Colors[scheme].card }]}> 
              <View style={{ alignItems: 'center', marginBottom: 6 }}>
                {s.image ? (
                  <RNImage source={s.image} style={{ width: '100%', height: 88, borderRadius: 10 }} resizeMode="cover" />
                ) : s.key.includes('cleaning') ? (
                  <MaterialIcons name="cleaning-services" size={28} color={Colors[scheme].tint as any} />
                ) : s.key.includes('flower') ? (
                  <RNImage source={require('@/assets/images/flower.png')} style={{ width: 28, height: 28 }} />
                ) : (
                  <MaterialIcons name="miscellaneous-services" size={28} color={Colors[scheme].tint as any} />
                )}
              </View>
              <ThemedText style={{ textAlign: 'center', fontWeight: '600' }}>{s.name}</ThemedText>
              <ThemedText style={{ textAlign: 'center', color: Colors[scheme].muted }}>{s.price}</ThemedText>
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
