import ScreenBackground from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const scheme = useColorScheme() ?? 'dark';
  const insets = useSafeAreaInsets();

  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 12 }]}
        contentInsetAdjustmentBehavior="always"
      >
      <View style={{ alignItems: 'center' }}>
        <Image source={require('@/assets/images/grave_love_header.png')} style={{ width: 160, height: 80, marginBottom: 6 }} resizeMode="contain" />
      </View>
        <ThemedView lightColor="transparent" darkColor="transparent" style={{ paddingHorizontal: 20 }}>
          <ThemedText
            style={{
              fontFamily: Fonts.display,
              fontSize: 32,
              lineHeight: 38,
              textAlign: 'left',
            }}
          >
            Grave Love helps families care for the resting places of loved ones,
          </ThemedText>
          <ThemedText style={{ marginTop: 10, color: Colors[scheme].muted }}>
            no matter where they are. From fresh flowers to regular cleaning, our services keep
            memories alive with dignity and love.
          </ThemedText>
        </ThemedView>

        {/* Services */}
        <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 12, marginTop: 18 }}>
          <Card style={[styles.serviceCard, {backgroundColor:'transparent'}]}>
            <MaterialIcons name="local-florist" size={28} color={Colors[scheme].gold as any} style={{ marginBottom: 8 }} />
            <ThemedText type="defaultSemiBold" style={{textAlign:'center'}}>Flower Placement</ThemedText>
            <ThemedText style={[styles.serviceText, {textAlign:'center'}]}>Deliver and place flowers at gravesite.</ThemedText>
          </Card>
          <Card style={[styles.serviceCard, {backgroundColor:'transparent'}]}>
            <MaterialIcons name="local-fire-department" size={28} color={Colors[scheme].gold as any} style={{ marginBottom: 8 }} />
            <ThemedText type="defaultSemiBold" style={{textAlign:'center'}}>Candle Lighting</ThemedText>
            <ThemedText style={[styles.serviceText, {textAlign:'center'}]}>Honor loved ones with a warm glow.</ThemedText>
          </Card>
          <Card style={[styles.serviceCard, {backgroundColor:'transparent'}]}>
            <MaterialIcons name="cleaning-services" size={28} color={Colors[scheme].gold as any} style={{ marginBottom: 8 }} />
            <ThemedText type="defaultSemiBold" style={{textAlign:'center'}}>Grave Care</ThemedText>
            <ThemedText style={[styles.serviceText, {textAlign:'center'}]}>Professional cleaning with photo updates.</ThemedText>
          </Card>
        </View>

        {/* How it works */}
        <ThemedView lightColor="transparent" darkColor="transparent" style={{ alignItems: 'center', marginTop: 24 }}>
          <ThemedText style={{ fontFamily: Fonts.display, fontSize: 28 }}>How It Works</ThemedText>
        </ThemedView>
        <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 12, marginTop: 8 }}>
        <Card style={[styles.stepCard, { alignSelf: 'stretch', backgroundColor:"transparent" }] }>
            <ThemedText type="defaultSemiBold" style={styles.stepNumber}>1</ThemedText>
            <View>
              <ThemedText type="defaultSemiBold">Select a Service</ThemedText>
              <ThemedText style={styles.serviceText}>Choose a service</ThemedText>
            </View>
            
          </Card>
          <Card style={[styles.stepCard, { alignSelf: 'stretch', backgroundColor:"transparent" }] }>
            <ThemedText type="defaultSemiBold" style={styles.stepNumber}>2</ThemedText>
            <View>
              <ThemedText type="defaultSemiBold">Receive Updates</ThemedText>
              <ThemedText style={styles.serviceText}>Photos and completion notices</ThemedText>
            </View>
           
          </Card>
        </View>
        <View style={{ paddingHorizontal: 12 }}>
          <Card style={[styles.stepCard, { alignItems: 'center',justifyContent:'center', backgroundColor:"transparent" }] }>
            <ThemedText type="defaultSemiBold" style={styles.stepNumber}>3</ThemedText>
            <View>
              <ThemedText type="defaultSemiBold">Personalize & Schedule</ThemedText>
              <ThemedText style={styles.serviceText}>Add notes, photos and select a date</ThemedText>
            </View>
           
          </Card>
        </View>

        {/* Quote */}
        <ThemedView lightColor="transparent" darkColor="transparent" style={{ paddingHorizontal: 20, marginTop: 12 }}>
          <ThemedText
            style={{ fontFamily: Fonts.display, fontStyle: 'italic', textAlign: 'center', fontSize: 20 }}
          >
            “Even though I live far away, Grave love keeps me connected.”
          </ThemedText>
        </ThemedView>

        {/* CTA */}
        <View style={{ paddingHorizontal: 20, marginTop: 16, marginBottom: 24 }}>
          <Link href="/(main)/profile" asChild>
            <Button variant="ghost" style={{ paddingVertical: 14 }}>
              Sign up
            </Button>
          </Link>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingTop: 24, paddingBottom: 16 },
  serviceCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  serviceText: {
    marginTop:5,
    opacity: 0.85,
  },
  stepCard: {
    flex: 1,
    // gap: 2,
    alignItems:'flex-start',
    flexDirection:"row"
  },
  stepNumber: {
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
});
