import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Switch, View } from 'react-native';
import ScreenBackground from '@/components/screen-background';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/lib/store/AppContext';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function ProfileScreen() {
  const isAuthenticated = useRequireAuth();
  const [birthday, setBirthday] = useState(true);
  const [passing, setPassing] = useState(true);
  const [religious, setReligious] = useState(false);
  const insets = useSafeAreaInsets();
  const { setAuthenticated } = useApp();

  if (!isAuthenticated) {
    return (
      <ScreenBackground>
        <ThemedView
          lightColor="transparent"
          darkColor="transparent"
          style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}
        >
          <ThemedText type="title">Sign in required</ThemedText>
          <ThemedText style={{ marginTop: 8, opacity: 0.7, textAlign: 'center' }}>
            Profile settings, reminders, and sign out controls are available after you log in.
          </ThemedText>
        </ThemedView>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
    <ThemedView lightColor="transparent" darkColor="transparent" style={[styles.container, { paddingTop: insets.top + 12 }] }>
      <View style={{ alignItems: 'center' }}>
        <Image source={require('@/assets/images/grave_love_header.png')} style={{ width: 160, height: 80, marginBottom: 6 }} resizeMode="contain" />
      </View>
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
      <Button
        variant="ghost"
        style={{ marginTop: 12 }}
        onPress={() => {
          setAuthenticated(false);
          router.replace('/(main)/home');
        }}
      >
        Sign out
      </Button>
    </ThemedView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
});
