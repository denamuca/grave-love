import ScreenBackground from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useApp } from '@/lib/store/AppContext';
import { useRequireAuth } from '@/hooks/use-require-auth';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image as RNImage, StyleSheet, TextInput, View } from 'react-native';

export default function NewOrderScreen() {
  const isAuthenticated = useRequireAuth();

  const { memorialId, serviceId } = useLocalSearchParams<{ memorialId?: string; serviceId?: string }>();
  const { memorials, serviceTypes, createOrder } = useApp();
  const memorial = useMemo(() => memorials.find((m) => m.id === memorialId) ?? memorials[0], [memorialId, memorials]);
  const service = useMemo(() => serviceTypes.find((s) => s.id === serviceId) ?? serviceTypes[0], [serviceId, serviceTypes]);
  const scheme = useColorScheme() ?? 'dark';

  const todayIso = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(todayIso);
  const [notes, setNotes] = useState('Please tidy the area and place flowers neatly.');

  if (!isAuthenticated) {
    return (
      <ScreenBackground>
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <ThemedText type="title" style={{ textAlign: 'center' }}>Sign in to place an order</ThemedText>
          <ThemedText style={{ marginTop: 8, color: Colors[scheme].muted, textAlign: 'center' }}>
            Schedule grave care services after creating an account.
          </ThemedText>
        </ThemedView>
      </ScreenBackground>
    );
  }

  function setDateOffset(days: number) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    setDate(d.toISOString().slice(0, 10));
  }

  function serviceIcon(key: string) {
    if (key.includes('cleaning')) return <MaterialIcons name="cleaning-services" size={20} color={Colors[scheme].tint as any} />;
    if (key.includes('flower')) return <RNImage source={require('@/assets/images/flower.png')} style={{ width: 18, height: 18 }} />;
    if (key.includes('candle')) return <RNImage source={require('@/assets/images/candle.png')} style={{ width: 18, height: 18 }} />;
    if (key.includes('photo')) return <MaterialIcons name="photo-camera" size={20} color={Colors[scheme].tint as any} />;
    if (key.includes('wreath')) return <MaterialIcons name="park" size={20} color={Colors[scheme].tint as any} />;
    if (key.includes('flag')) return <MaterialIcons name="outlined-flag" size={20} color={Colors[scheme].tint as any} />;
    if (key.includes('stone') || key.includes('polish')) return <MaterialIcons name="handyman" size={20} color={Colors[scheme].tint as any} />;
    return <MaterialIcons name="miscellaneous-services" size={20} color={Colors[scheme].tint as any} />;
  }

  return (
    <ScreenBackground>
      <ThemedView lightColor="transparent" darkColor="transparent" style={styles.container}>
        <ThemedText type="title" style={{ textAlign: 'center' }}>Order Service</ThemedText>

        <Card>
          <View style={{ gap: 8 }}>
            <ThemedText type="defaultSemiBold">{memorial.name_full}</ThemedText>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              {serviceIcon(service.key)}
              <ThemedText>{service.name}</ThemedText>
              <ThemedText style={{ marginLeft: 'auto', color: Colors[scheme].muted }}>{service.price}</ThemedText>
            </View>
            {service.desc ? (
              <ThemedText style={{ color: Colors[scheme].muted }}>{service.desc}</ThemedText>
            ) : null}
          </View>
        </Card>

        <Card>
          <View style={{ gap: 10 }}>
            <ThemedText type="defaultSemiBold">Schedule</ThemedText>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button variant="ghost" onPress={() => setDateOffset(0)}>Today</Button>
              <Button variant="ghost" onPress={() => setDateOffset(1)}>Tomorrow</Button>
              <Button variant="ghost" onPress={() => setDateOffset(7)}>In 1 week</Button>
            </View>
            <ThemedText style={{ color: Colors[scheme].muted }}>Date (YYYY-MM-DD)</ThemedText>
            <TextInput
              value={date}
              onChangeText={setDate}
              style={[styles.input, { backgroundColor: Colors[scheme].card, borderColor: Colors[scheme].border, color: Colors[scheme].text }]}
            />
          </View>
        </Card>

        <Card>
          <View style={{ gap: 10 }}>
            <ThemedText type="defaultSemiBold">Notes</ThemedText>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              style={[styles.input, { height: 100, backgroundColor: Colors[scheme].card, borderColor: Colors[scheme].border, color: Colors[scheme].text }]}
              multiline
            />
          </View>
        </Card>

        <Button
          onPress={() => {
            createOrder({ memorial_id: memorial.id, service_type_id: service.id, scheduled_date: date, notes });
            alert('Order placed! You will receive phone updates after completion.');
            router.replace('/(main)/orders');
          }}
        >
          Pay {service.price}
        </Button>
      </ThemedView>
    </ScreenBackground>
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
