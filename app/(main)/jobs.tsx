import { FlatList, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { jobs } from '@/data/mock';
import { Link } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function JobsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Jobs (Provider)</ThemedText>
      <FlatList
        data={jobs}
        keyExtractor={(j) => j.id}
        renderItem={({ item }) => (
          <Link href={{ pathname: '/job/[jobId]', params: { jobId: item.id } }} asChild>
            <Card>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <ThemedText type="defaultSemiBold">{item.memorial_name}</ThemedText>
                  <ThemedText>
                    {item.type} · {item.scheduled_date}
                  </ThemedText>
                </View>
                <Badge>{item.status}</Badge>
              </View>
              <ThemedText type="link" style={{ marginTop: 8 }}>Open job →</ThemedText>
            </Card>
          </Link>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { padding: 12 },
});
