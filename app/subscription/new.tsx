import { useLocalSearchParams, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/lib/store/AppContext';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function NewSubscription() {
  const isAuthenticated = useRequireAuth();

  const { memorialId } = useLocalSearchParams<{ memorialId?: string }>();
  const { memorials, addSubscription } = useApp();
  const memorial = useMemo(() => memorials.find((m) => m.id === memorialId) ?? memorials[0], [memorialId, memorials]);
  const [plan, setPlan] = useState<'flowers_monthly' | 'cleaning_seasonal'>('flowers_monthly');

  if (!isAuthenticated) {
    return (
      <ThemedView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}> 
        <ThemedText type="title">Please log in</ThemedText>
        <ThemedText style={{ marginTop: 8, opacity: 0.7, textAlign: 'center' }}>
          Subscription plans unlock after you sign in.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Subscribe</ThemedText>
      <ThemedText>Memorial: {memorial.name_full}</ThemedText>
      <View style={styles.group}>
        <Button variant={plan === 'flowers_monthly' ? 'primary' : 'ghost'} onPress={() => setPlan('flowers_monthly')}>
          Flowers monthly
        </Button>
        <Button variant={plan === 'cleaning_seasonal' ? 'primary' : 'ghost'} onPress={() => setPlan('cleaning_seasonal')}>
          Cleaning seasonal
        </Button>
      </View>
      <Button onPress={() => {
        const next = plan === 'flowers_monthly' ? new Date(Date.now() + 30*24*3600*1000) : new Date(Date.now() + 90*24*3600*1000);
        addSubscription({ memorial_id: memorial.id, plan_key: plan, next_run: next.toISOString().slice(0,10) });
        alert('Subscription started. You will receive phone updates for each delivery.');
        router.back();
      }}>Start Subscription</Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  group: { flexDirection: 'row', gap: 12 },
});
