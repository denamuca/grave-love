import { useLocalSearchParams, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useApp } from '@/lib/store/AppContext';
import { Button } from '@/components/ui/Button';

export default function NewOrderScreen() {
  const { memorialId, serviceId } = useLocalSearchParams<{ memorialId?: string; serviceId?: string }>();
  const { memorials, serviceTypes, createOrder } = useApp();
  const memorial = useMemo(() => memorials.find((m) => m.id === memorialId) ?? memorials[0], [memorialId, memorials]);
  const service = useMemo(() => serviceTypes.find((s) => s.id === serviceId) ?? serviceTypes[0], [serviceId, serviceTypes]);
  const [date, setDate] = useState('2025-10-31');
  const [notes, setNotes] = useState('Please tidy the area and place flowers neatly.');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Order Service</ThemedText>
      <ThemedText>
        Memorial: <ThemedText type="defaultSemiBold">{memorial.name_full}</ThemedText>
      </ThemedText>
      <ThemedText>
        Service: <ThemedText type="defaultSemiBold">{service.name}</ThemedText>
      </ThemedText>
      <View style={styles.field}>
        <ThemedText>Date (YYYY-MM-DD)</ThemedText>
        <TextInput value={date} onChangeText={setDate} style={styles.input} />
      </View>
      <View style={styles.field}>
        <ThemedText>Notes</ThemedText>
        <TextInput value={notes} onChangeText={setNotes} style={[styles.input, { height: 80 }]} multiline />
      </View>
      <Button
        onPress={() => {
          createOrder({ memorial_id: memorial.id, service_type_id: service.id, scheduled_date: date, notes });
          alert('Order placed! You will receive phone updates after completion.');
          router.replace('/(main)/orders');
        }}
      >
        Pay {service.price} (simulated)
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  field: { gap: 6 },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    padding: 10,
  },
});
