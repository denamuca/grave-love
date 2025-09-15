import { useApp } from '@/lib/store/AppContext';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OrdersScreen() {
  const { orders, memorials, serviceTypes, setOrderCompleted } = useApp();
  const insets = useSafeAreaInsets();

  function memorialName(id: string) {
    return memorials.find((m) => m.id === id)?.name_full ?? 'Memorial';
  }
  function serviceName(id: string) {
    return serviceTypes.find((s) => s.id === id)?.name ?? 'Service';
  }

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + 12 }] }>
      <ThemedText type="title">Orders</ThemedText>
      {orders.length === 0 ? (
        <ThemedText style={{ opacity: 0.7 }}>No orders yet. Place one from a memorial.</ThemedText>
      ) : null}
      {orders.map((o) => (
        <Card key={o.id}>
          <ThemedText type="defaultSemiBold">{memorialName(o.memorial_id)}</ThemedText>
          <ThemedText>
            {serviceName(o.service_type_id)} · {o.price}
          </ThemedText>
          <ThemedText>Scheduled: {o.scheduled_date}</ThemedText>
          <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <ThemedText>Status: {o.status}</ThemedText>
            {o.status !== 'completed' ? (
              <Button onPress={() => { setOrderCompleted(o.id); alert('Phone update: Your order has been delivered (simulated).'); }}>Mark delivered</Button>
            ) : null}
          </View>
        </Card>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({ container: { padding: 16, gap: 12 } });
