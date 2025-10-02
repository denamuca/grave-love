import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { useApp } from '@/lib/store/AppContext';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import * as ImagePicker from 'expo-image-picker';

export default function CreateMemorial() {
  const isAuthenticated = useRequireAuth();

  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const { addMemorial } = useApp();
  const [name, setName] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [dateDeath, setDateDeath] = useState('');
  const [cemetery, setCemetery] = useState('');
  const [slugVal, setSlugVal] = useState(slug ?? '');
  const [bio, setBio] = useState('');
  const [coverImage, setCoverImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const scheme = useColorScheme() ?? 'light';

  if (!isAuthenticated) {
    return (
      <ScrollView contentContainerStyle={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}> 
        <ThemedText type="title">Create an account first</ThemedText>
        <ThemedText style={{ marginTop: 8, textAlign: 'center', color: Colors[scheme].muted }}>
          Starting a memorial requires an account so family members can collaborate securely.
        </ThemedText>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={{ gap: 16 }}>
        <Card style={styles.heroCard}>
          <ThemedText type="title">Create Memorial</ThemedText>
          <ThemedText style={{ color: Colors[scheme].muted }}>
            Share their story, add a portrait, and choose where family can gather online.
          </ThemedText>
        </Card>

        <Card style={styles.formCard}>
          <View style={styles.sectionHeader}>
            <ThemedText type="defaultSemiBold">About your loved one</ThemedText>
            <ThemedText style={[styles.sectionHint, { color: Colors[scheme].muted }]}>These details appear at the top of the memorial.</ThemedText>
          </View>
          <View style={styles.field}>
            <ThemedText style={styles.label}>Full name</ThemedText>
          <TextInput
            value={name}
            onChangeText={setName}
            style={[styles.input, { color: Colors[scheme].text, backgroundColor: Colors[scheme].background, borderColor: Colors[scheme].border }]}
            placeholderTextColor={Colors[scheme].muted}
            placeholder="John A. Doe"
          />
          </View>
          <View style={[styles.row, { gap: 12 }] }>
            <View style={[styles.field, { flex: 1 }]}>
              <ThemedText style={styles.label}>Date of birth</ThemedText>
          <TextInput
            value={dateBirth}
            onChangeText={setDateBirth}
                style={[styles.input, { color: Colors[scheme].text, backgroundColor: Colors[scheme].background, borderColor: Colors[scheme].border }]}
            placeholderTextColor={Colors[scheme].muted}
                placeholder="YYYY-MM-DD"
          />
            </View>
            <View style={[styles.field, { flex: 1 }]}>
              <ThemedText style={styles.label}>Date of passing</ThemedText>
          <TextInput
            value={dateDeath}
            onChangeText={setDateDeath}
                style={[styles.input, { color: Colors[scheme].text, backgroundColor: Colors[scheme].background, borderColor: Colors[scheme].border }]}
            placeholderTextColor={Colors[scheme].muted}
                placeholder="YYYY-MM-DD"
          />
            </View>
          </View>
          <View style={styles.field}>
            <ThemedText style={styles.label}>Bio (optional)</ThemedText>
          <TextInput
            value={bio}
            onChangeText={setBio}
            style={[styles.input, styles.textArea, { color: Colors[scheme].text, backgroundColor: Colors[scheme].background, borderColor: Colors[scheme].border }]}
            placeholderTextColor={Colors[scheme].muted}
            placeholder="Share a short story or tribute"
            multiline
          />
          </View>
          <View style={styles.field}>
            <ThemedText style={styles.label}>Cemetery (optional)</ThemedText>
          <TextInput
            value={cemetery}
            onChangeText={setCemetery}
            style={[styles.input, { color: Colors[scheme].text, backgroundColor: Colors[scheme].background, borderColor: Colors[scheme].border }]}
            placeholderTextColor={Colors[scheme].muted}
            placeholder="Greenwood Cemetery"
          />
          </View>
        </Card>

        <Card style={styles.formCard}>
          <View style={styles.sectionHeader}>
            <ThemedText type="defaultSemiBold">Memorial page details</ThemedText>
            <ThemedText style={[styles.sectionHint, { color: Colors[scheme].muted }]}>Add a portrait and customize the memorial link.</ThemedText>
          </View>
          <View style={styles.field}>
            <ThemedText style={styles.label}>Cover photo</ThemedText>
            <Button
              variant="ghost"
              onPress={async () => {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                  alert('Please allow access to your photos to upload a cover image.');
                  return;
                }
                const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  quality: 0.85,
                });
                if (!result.canceled) {
                  setCoverImage(result.assets[0]);
                }
              }}
            >
              {coverImage ? 'Change photo' : 'Choose photo from device'}
            </Button>
            {coverImage ? (
              <View style={{ gap: 8 }}>
                <Image
                  source={{ uri: coverImage.uri }}
                  style={styles.previewImage}
                />
                <Button variant="ghost" onPress={() => setCoverImage(null)}>
                  Remove photo
                </Button>
              </View>
            ) : (
              <ThemedText style={[styles.sectionHint, { color: Colors[scheme].muted }]}>Square or portrait images look best.</ThemedText>
            )}
          </View>
          <View style={styles.field}>
            <ThemedText style={styles.label}>QR / Slug</ThemedText>
          <TextInput
            value={slugVal}
            onChangeText={(text) => setSlugVal(text.replace(/\s+/g, '-').toLowerCase())}
            style={[styles.input, { color: Colors[scheme].text, backgroundColor: Colors[scheme].background, borderColor: Colors[scheme].border }]}
            placeholderTextColor={Colors[scheme].muted}
            placeholder="john-doe"
            autoCapitalize="none"
          />
          </View>
        </Card>

        <Button
          onPress={() => {
            if (!name || !dateBirth || !dateDeath) {
              alert('Please fill name and dates');
              return;
            }
            const normalizedSlug = (slugVal || name.toLowerCase().replace(/\s+/g, '-')).trim();
            const newMemorial = addMemorial({
              slug: normalizedSlug,
              name_full: name.trim(),
              date_birth: dateBirth.trim(),
              date_death: dateDeath.trim(),
              bio: bio.trim(),
              cemetery: cemetery.trim(),
              plot: '',
              cover_image: coverImage ? { uri: coverImage.uri } : undefined,
            } as any);
            router.replace({ pathname: '/memorial/[id]', params: { id: newMemorial.id } });
          }}
        >
          Create Memorial
        </Button>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16, backgroundColor: '#1b141b' },
  heroCard: { gap: 8, padding: 20 },
  formCard: { gap: 16, padding: 20 },
  sectionHeader: { gap: 4 },
  sectionHint: { fontSize: 13, opacity: 0.75 },
  label: { fontWeight: '600', opacity: 0.85 },
  field: { gap: 6 },
  input: { borderWidth: StyleSheet.hairlineWidth, borderRadius: 12, padding: 12 },
  textArea: { minHeight: 90, textAlignVertical: 'top' },
  row: { flexDirection: 'row' },
  previewImage: { marginTop: 8, height: 160, borderRadius: 14 },
});
