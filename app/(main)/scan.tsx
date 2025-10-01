import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import ScreenBackground from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useApp, type Memorial } from '@/lib/store/AppContext';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { memorials } = useApp();
  const scheme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();

  const normalizedQuery = query.trim().toLowerCase();

  const filteredMemorials = useMemo(() => {
    if (!normalizedQuery) {
      return [...memorials].sort((a, b) => a.name_full.localeCompare(b.name_full));
    }

    return memorials
      .filter((memorial) => {
        const haystack = [memorial.name_full, memorial.slug, memorial.cemetery, memorial.plot]
          .filter((value): value is string => typeof value === 'string' && value.length > 0)
          .map((value) => value.toLowerCase());
        return haystack.some((value) => value.includes(normalizedQuery));
      })
      .sort((a, b) => a.name_full.localeCompare(b.name_full));
  }, [memorials, normalizedQuery]);

  const slugSuggestion = useMemo(() => {
    if (!normalizedQuery) return '';
    return normalizedQuery
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-+|-+$)/g, '');
  }, [normalizedQuery]);

  const showCreateOption = Boolean(slugSuggestion) && !memorials.some((m) => m.slug === slugSuggestion);

  function openMemorial(memorial: Memorial) {
    router.push({ pathname: '/memorial/[id]', params: { id: memorial.id } });
  }

  function handleCreateMemorial() {
    if (!slugSuggestion) return;
    router.push({ pathname: '/memorial/create', params: { slug: slugSuggestion } });
  }

  function formatYearRange(start?: string, end?: string) {
    const born = start ? new Date(start).getFullYear().toString() : '';
    const passed = end ? new Date(end).getFullYear().toString() : '';

    if (!born && !passed) return '';
    if (born && passed) return `${born} - ${passed}`;
    return born || passed;
  }

  return (
    <ScreenBackground>
      <ThemedView
        lightColor="transparent"
        darkColor="transparent"
        style={[styles.container, { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 24 }]}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.content, { gap: 16 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerBrand}>
            <Image
              source={require('@/assets/images/grave_love_header.png')}
              style={styles.brandMark}
              resizeMode="contain"
            />
          </View>
          <View style={[styles.hero, { backgroundColor: Colors[scheme].card }]}> 
            <ThemedText type="title">Find a Memorial</ThemedText>
            <ThemedText style={styles.heroCopy}>
              Search by name, family code, or cemetery to visit and manage your loved ones.
            </ThemedText>
          </View>

          <View
            style={[
              styles.searchField,
              {
                backgroundColor: Colors[scheme].card,
                borderColor: Colors[scheme].border,
              },
            ]}
          >
            <IconSymbol name="magnifyingglass" size={20} color={Colors[scheme].muted} style={styles.leadingIcon} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search loved ones"
              placeholderTextColor={Colors[scheme].muted}
              style={[styles.input, { color: Colors[scheme].text }]}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="search"
            />
          </View>

          <ThemedText style={styles.sectionLabel}>
            {normalizedQuery ? 'Search results' : 'All memorials'}
          </ThemedText>

          {filteredMemorials.length > 0 ? (
            <View style={styles.resultsList}>
              {filteredMemorials.map((memorial) => {
                const years = formatYearRange(memorial.date_birth, memorial.date_death);
                return (
                  <TouchableOpacity
                    key={memorial.id}
                    onPress={() => openMemorial(memorial)}
                    style={[
                      styles.resultCard,
                      {
                        backgroundColor: Colors[scheme].card,
                        borderColor: Colors[scheme].border,
                      },
                    ]}
                  >
                    {memorial.cover_image ? (
                      <Image source={memorial.cover_image} style={styles.avatar} resizeMode="cover" />
                    ) : (
                      <View style={[styles.avatar, styles.avatarFallback, { backgroundColor: Colors[scheme].border }]}>
                        <IconSymbol name="person.crop.circle" size={24} color={Colors[scheme].text} />
                      </View>
                    )}
                    <View style={styles.resultContent}>
                      <ThemedText type="defaultSemiBold">{memorial.name_full}</ThemedText>
                      {years ? <ThemedText style={styles.metaText}>{years}</ThemedText> : null}
                      {memorial.cemetery ? (
                        <ThemedText style={styles.metaText}>{memorial.cemetery}</ThemedText>
                      ) : null}
                    </View>
                    <IconSymbol name="chevron.right" size={18} color={Colors[scheme].muted} />
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View
              style={[
                styles.emptyState,
                {
                  backgroundColor: Colors[scheme].card,
                  borderColor: Colors[scheme].border,
                },
              ]}
            >
              <ThemedText type="defaultSemiBold">No memorials found</ThemedText>
              <ThemedText style={styles.metaText}>
                Double-check the spelling or create a new memorial below.
              </ThemedText>
            </View>
          )}

          {showCreateOption ? (
            <Button onPress={handleCreateMemorial}>
              {`Create memorial for ${query.trim()}`}
            </Button>
          ) : null}
        </ScrollView>
      </ThemedView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingHorizontal: 16,
  },
  headerBrand: { alignItems: 'center' },
  brandMark: { width: 160, height: 80, marginBottom: 6 },
  hero: { padding: 16, borderRadius: 16, alignItems: 'center', gap: 8 },
  heroCopy: { opacity: 0.8, textAlign: 'center' },
  searchField: {
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leadingIcon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 10 },
  sectionLabel: { fontSize: 14, letterSpacing: 0.4, opacity: 0.7, textTransform: 'uppercase' },
  resultsList: { gap: 12 },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  avatar: { width: 56, height: 56, borderRadius: 14 },
  avatarFallback: { justifyContent: 'center', alignItems: 'center' },
  resultContent: { flex: 1 },
  metaText: { opacity: 0.7, marginTop: 2 },
  emptyState: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 4,
  },
});
