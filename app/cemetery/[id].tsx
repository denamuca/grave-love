import { useEffect, useMemo } from 'react';
import { Image, Linking, ScrollView, StyleSheet, View } from 'react-native';

import ScreenBackground from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useApp } from '@/lib/store/AppContext';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';

export default function CemeteryDetailScreen() {
  const isAuthenticated = useRequireAuth();

  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const scheme = useColorScheme() ?? 'light';
  const { cemeteries } = useApp();

  const cemetery = useMemo(() => cemeteries.find((c) => c.id === id) ?? cemeteries[0], [cemeteries, id]);

  useEffect(() => {
    navigation.setOptions?.({
      title: cemetery.name,
      headerBackTitleVisible: false,
      headerStyle: { backgroundColor: Colors[scheme].card },
      headerTintColor: Colors[scheme].text,
      headerTitleStyle: { color: Colors[scheme].text },
      headerShadowVisible: false,
    });
  }, [cemetery.name, navigation, scheme]);

  function openWebsite() {
    if (!cemetery.website) return;
    Linking.openURL(cemetery.website).catch(() => undefined);
  }

  if (!isAuthenticated) {
    return (
      <ScreenBackground>
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <ThemedText type="title" style={{ textAlign: 'center' }}>Sign in to explore cemeteries</ThemedText>
          <ThemedText style={{ marginTop: 8, color: Colors[scheme].muted, textAlign: 'center' }}>
            Partner cemetery profiles unlock after you log in.
          </ThemedText>
        </ThemedView>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {cemetery.image ? (
          <Image source={cemetery.image} style={styles.heroImage} resizeMode="cover" />
        ) : null}

        <ThemedView
          lightColor="transparent"
          darkColor="transparent"
          style={[styles.container, { backgroundColor: Colors[scheme].card, borderColor: Colors[scheme].border }]}
        >
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <ThemedText type="title" style={styles.title}>{cemetery.name}</ThemedText>
              <View style={styles.metaRow}>
                <IconSymbol name="mappin.and.ellipse" size={18} color={Colors[scheme].muted} />
                <ThemedText style={styles.meta}>{cemetery.location}</ThemedText>
              </View>
            </View>
            {cemetery.founded ? (
              <View style={[styles.badge, { backgroundColor: Colors[scheme].background, borderColor: Colors[scheme].border }]}>
                <ThemedText style={styles.badgeText}>Est. {cemetery.founded}</ThemedText>
              </View>
            ) : null}
          </View>

          {cemetery.description ? (
            <ThemedText style={[styles.meta, { marginTop: 12 }]}>{cemetery.description}</ThemedText>
          ) : null}

          <View style={styles.section}>
            <View style={styles.statsRow}>
              {cemetery.acres ? (
                <View style={styles.statBox}>
                  <ThemedText type="defaultSemiBold">{cemetery.acres}</ThemedText>
                  <ThemedText style={styles.meta}>acres</ThemedText>
                </View>
              ) : null}
              {cemetery.notable ? (
                <View style={[styles.statBox, { flex: 2 }] }>
                  <IconSymbol name="heart.fill" size={14} color={Colors[scheme].tint} />
                  <ThemedText style={[styles.meta, { marginTop: 4 }]}>{cemetery.notable}</ThemedText>
                </View>
              ) : null}
            </View>
          </View>

          {cemetery.services && cemetery.services.length > 0 ? (
            <View style={styles.section}>
              <ThemedText type="defaultSemiBold">Signature services</ThemedText>
              <View style={styles.chipGroup}>
                {cemetery.services.map((service) => (
                  <View
                    key={service}
                    style={[styles.chip, { borderColor: Colors[scheme].border, backgroundColor: Colors[scheme].background }]}
                  >
                    <ThemedText style={styles.meta}>{service}</ThemedText>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          <View style={styles.section}>
            <ThemedText type="defaultSemiBold">Visitor information</ThemedText>
            {cemetery.visiting_hours ? (
              <View style={styles.metaRow}>
                <IconSymbol name="clock.fill" size={18} color={Colors[scheme].muted} />
                <ThemedText style={styles.meta}>{cemetery.visiting_hours}</ThemedText>
              </View>
            ) : null}
            {cemetery.phone ? (
              <View style={styles.metaRow}>
                <IconSymbol name="phone.fill" size={18} color={Colors[scheme].muted} />
                <ThemedText style={styles.meta}>{cemetery.phone}</ThemedText>
              </View>
            ) : null}
            {cemetery.website ? (
              <Button variant="ghost" onPress={openWebsite} style={{ marginTop: 12 }}>
                Visit website
              </Button>
            ) : null}
          </View>

          <View style={styles.section}>
            <ThemedText type="defaultSemiBold">Plan a service</ThemedText>
            <ThemedText style={[styles.meta, { marginTop: 4 }]}>
              Coordinate flowers, cleaning, and remembrance packages with our local team.
            </ThemedText>
            <Link href={{ pathname: '/order/new' }} asChild>
              <Button style={{ marginTop: 12 }}>Book with Grave Love</Button>
            </Link>
          </View>
        </ThemedView>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    height: 220,
  },
  container: {
    marginHorizontal: 16,
    marginTop: -32,
    padding: 20,
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: { fontSize: 26, lineHeight: 30 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  meta: { opacity: 0.75 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  badgeText: { fontSize: 12, fontWeight: '600' },
  section: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingTop: 16,
    gap: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.1)',
    gap: 4,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
