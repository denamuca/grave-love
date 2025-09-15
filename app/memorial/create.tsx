import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/lib/store/AppContext';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function CreateMemorial() {
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const { addMemorial } = useApp();
  const [name, setName] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [dateDeath, setDateDeath] = useState('');
  const [cemetery, setCemetery] = useState('');
  const [slugVal, setSlugVal] = useState(slug ?? '');
  const scheme = useColorScheme() ?? 'dark';

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Create Memorial</ThemedText>
      <ThemedText style={{ opacity: 0.8 }}>After scanning, enter your loved one’s details.</ThemedText>

      <View style={styles.field}><ThemedText>Full name</ThemedText><TextInput value={name} onChangeText={setName} style={[styles.input, { color: Colors[scheme].text, backgroundColor: Colors[scheme].card, borderColor: Colors[scheme].border }]} placeholderTextColor={Colors[scheme].muted} placeholder="John A. Doe" /></View>
      <View style={styles.field}><ThemedText>Date of birth (YYYY-MM-DD)</ThemedText><TextInput value={dateBirth} onChangeText={setDateBirth} style={[styles.input, { color: Colors[scheme].text, backgroundColor: Colors[scheme].card, borderColor: Colors[scheme].border }]} placeholderTextColor={Colors[scheme].muted} placeholder="1945-03-14" /></View>
      <View style={styles.field}><ThemedText>Date of passing (YYYY-MM-DD)</ThemedText><TextInput value={dateDeath} onChangeText={setDateDeath} style={[styles.input, { color: Colors[scheme].text, backgroundColor: Colors[scheme].card, borderColor: Colors[scheme].border }]} placeholderTextColor={Colors[scheme].muted} placeholder="2023-10-30" /></View>
      <View style={styles.field}><ThemedText>Cemetery (optional)</ThemedText><TextInput value={cemetery} onChangeText={setCemetery} style={[styles.input, { color: Colors[scheme].text, backgroundColor: Colors[scheme].card, borderColor: Colors[scheme].border }]} placeholderTextColor={Colors[scheme].muted} placeholder="Greenwood Cemetery" /></View>
      <View style={styles.field}><ThemedText>QR/Slug</ThemedText><TextInput value={slugVal} onChangeText={setSlugVal} style={[styles.input, { color: Colors[scheme].text, backgroundColor: Colors[scheme].card, borderColor: Colors[scheme].border }]} placeholderTextColor={Colors[scheme].muted} placeholder="john-doe" /></View>

      <Button onPress={() => {
        if (!name || !dateBirth || !dateDeath) { alert('Please fill name and dates'); return; }
        const m = addMemorial({ slug: slugVal || name.toLowerCase().replace(/\s+/g, '-'), name_full: name, date_birth: dateBirth, date_death: dateDeath, bio: '', cemetery, plot: '', cover_image: undefined } as any);
        router.replace({ pathname: '/memorial/[id]', params: { id: m.id } });
      }}>Create Memorial</Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  field: { gap: 6 },
  input: { borderWidth: StyleSheet.hairlineWidth, borderRadius: 10, padding: 10 },
});
