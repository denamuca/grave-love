import { useLocalSearchParams, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { jobs as allJobs } from '@/data/mock';
import { Button } from '@/components/ui/Button';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function JobDetail() {
  const isAuthenticated = useRequireAuth();

  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const job = useMemo(() => allJobs.find((j) => j.id === jobId) ?? allJobs[0], [jobId]);
  const [beforeAdded, setBeforeAdded] = useState(false);
  const [afterAdded, setAfterAdded] = useState(false);

  if (!isAuthenticated) {
    return (
      <ThemedView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ThemedText type="title">Crew access only</ThemedText>
        <ThemedText style={{ marginTop: 8, opacity: 0.7, textAlign: 'center' }}>
          Log in to upload before/after photos and close out jobs.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{job.memorial_name}</ThemedText>
      <ThemedText>
        {job.type} · {job.scheduled_date}
      </ThemedText>
      <ThemedText>Status: {job.status}</ThemedText>

      <View style={styles.section}>
        <ThemedText type="subtitle">Upload Proof (simulated)</ThemedText>
        <Button onPress={() => setBeforeAdded(true)}>
          {beforeAdded ? 'Before photo ✓' : 'Add before photo'}
        </Button>
        {beforeAdded ? (
          <Image source={{ uri: 'https://picsum.photos/seed/before/300/200' }} style={styles.photo} />
        ) : null}
        <Button onPress={() => setAfterAdded(true)}>
          {afterAdded ? 'After photo ✓' : 'Add after photo'}
        </Button>
        {afterAdded ? (
          <Image source={{ uri: 'https://picsum.photos/seed/after/300/200' }} style={styles.photo} />
        ) : null}
      </View>

      <Button
        disabled={!beforeAdded || !afterAdded}
        onPress={() => {
          alert('Job completed! Family will be notified (simulated).');
          router.back();
        }}
      >
        Mark Complete
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  section: { gap: 8 },
  photo: { height: 140, borderRadius: 10, marginVertical: 8 },
});
