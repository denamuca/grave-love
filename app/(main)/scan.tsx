import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useApp } from '@/lib/store/AppContext';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import ScreenBackground from '@/components/screen-background';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ScanScreen() {
  const [code, setCode] = useState('walter-bennett');
  const { memorials } = useApp();
  const scheme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();

  return (
    <ScreenBackground>
    <ThemedView lightColor="transparent" darkColor="transparent" style={[styles.container, { paddingTop: insets.top + 44 }] }>
      <View style={{ alignItems: 'center' }}>
        <Image source={require('@/assets/images/grave_love_header.png')} style={{ width: 160, height: 80, marginBottom: 6 }} resizeMode="contain" />
      </View>
      <View style={[styles.hero, { backgroundColor: Colors[scheme].card }]}> 
        <ThemedText type="title">Scan QR</ThemedText>
        <ThemedText style={{ opacity: 0.8, textAlign: 'center' }}>
          Hold your phone over the grave’s QR tag to open or link a memorial.
        </ThemedText>
      </View>

      <View style={styles.viewfinder}>
        <IconSymbol
          size={160}
          name="qrcode.viewfinder"
          color={Colors[scheme].border}
          style={styles.centerIcon}
        />
        <View style={[styles.corner, styles.tl, { borderColor: Colors[scheme].tint }]} />
        <View style={[styles.corner, styles.tr, { borderColor: Colors[scheme].tint }]} />
        <View style={[styles.corner, styles.bl, { borderColor: Colors[scheme].tint }]} />
        <View style={[styles.corner, styles.br, { borderColor: Colors[scheme].tint }]} />
      </View>

      <ThemedText style={{ opacity: 0.9, marginTop: 8 }}>Or enter code manually</ThemedText>
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="walter-bennett"
        placeholderTextColor={Colors[scheme].muted}
        style={[styles.input, { backgroundColor: Colors[scheme].card, borderColor: Colors[scheme].border, color: Colors[scheme].text }]}
      />

      <View style={styles.chipsRow}>
        {['walter-bennett', 'margaret-bennett'].map((slug) => (
          <TouchableOpacity key={slug} onPress={() => setCode(slug)} style={[styles.chip, { borderColor: Colors[scheme].border, backgroundColor: Colors[scheme].card }]}> 
            <ThemedText style={{ opacity: 0.9 }}>{slug}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <Button onPress={() => {
        const found = memorials.find((m) => m.slug === code);
        if (found) {
          router.push({ pathname: '/memorial/[id]', params: { id: found.id } });
        } else {
          router.push({ pathname: '/memorial/create', params: { slug: code } });
        }
      }}>Scan / Continue</Button>
      <ThemedText style={{ opacity: 0.7, textAlign: 'center' }}>
        If this code isn’t linked yet, you’ll create a new memorial.
      </ThemedText>
    </ThemedView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  hero: { padding: 16, borderRadius: 16, alignItems: 'center', gap: 6 },
  heroIcon: { position: 'absolute', opacity: 0.15, top: -20, right: -10 },
  viewfinder: {
    height: 220,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  centerIcon: { opacity: 0.12 },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderWidth: 3,
    borderRadius: 8,
  },
  tl: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  tr: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bl: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  br: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  input: { borderWidth: StyleSheet.hairlineWidth, borderRadius: 12, padding: 12 },
  chipsRow: { flexDirection: 'row', gap: 8 },
  chip: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, borderWidth: StyleSheet.hairlineWidth },
});
