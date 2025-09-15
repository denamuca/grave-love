import { useApp } from '@/lib/store/AppContext';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui/Card';
import { StyleSheet, Switch, View } from 'react-native';

export default function RemindersScreen() {
  const { memorials, reminders, setReminders } = useApp();
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Reminders</ThemedText>
      {memorials.map((m) => {
        const r = reminders[m.id] ?? { birthday: true, passing: true, religious: false };
        return (
          <Card key={m.id}>
            <ThemedText type="defaultSemiBold">{m.name_full}</ThemedText>
            <View style={styles.row}><ThemedText>Birthday</ThemedText><Switch value={r.birthday} onValueChange={(v) => setReminders(m.id, { birthday: v })} /></View>
            <View style={styles.row}><ThemedText>Passing anniversary</ThemedText><Switch value={r.passing} onValueChange={(v) => setReminders(m.id, { passing: v })} /></View>
            <View style={styles.row}><ThemedText>Religious holidays</ThemedText><Switch value={r.religious} onValueChange={(v) => setReminders(m.id, { religious: v })} /></View>
          </Card>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
});

