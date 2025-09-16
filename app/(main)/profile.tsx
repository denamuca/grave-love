import { useState } from 'react';
import { Switch, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/Card';
import { Link } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const [birthday, setBirthday] = useState(true);
  const [passing, setPassing] = useState(true);
  const [religious, setReligious] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + 12 }] }>
      <ThemedText type="title" style={{ textAlign: 'center' }}>Profile & Reminders</ThemedText>
      <Card>
        <View style={styles.row}>
          <ThemedText>Birthday reminders</ThemedText>
          <Switch value={birthday} onValueChange={setBirthday} />
        </View>
        <View style={styles.row}>
          <ThemedText>Passing anniversary</ThemedText>
          <Switch value={passing} onValueChange={setPassing} />
        </View>
        <View style={styles.row}>
          <ThemedText>Religious holidays</ThemedText>
          <Switch value={religious} onValueChange={setReligious} />
        </View>
      </Card>
      <Link href="/reminders" asChild>
        <Button variant="ghost">Open reminders per memorial →</Button>
      </Link>
      <ThemedText style={{ opacity: 0.7 }}>
        Changes are local-only in this prototype. No data is stored.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
});
