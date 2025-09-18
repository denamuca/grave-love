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
              textAlign: 'center',
            }}
          >
            Grave Love helps families care for the resting places of loved ones, no matter where they are.
          </ThemedText>
          <ThemedText style={{ marginTop: 10, color: Colors[scheme].muted, textAlign:'center' }}>
            From fresh flowers to regular cleaning, our services keep
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
 {/* Gentle, welcoming photo strip */}
 <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12, gap: 12, marginTop: 6 }}
        >
          <Image source={require('@/assets/images/flower_bouqet_memorial.jpeg')} style={styles.galleryImage} resizeMode="cover" />
          <Image source={require('@/assets/images/candle_memorial.webp')} style={styles.galleryImage} resizeMode="cover" />
          <Image source={require('@/assets/images/grave_cleaning.webp')} style={styles.galleryImage} resizeMode="cover" />
          <Image source={require('@/assets/images/photo_service.webp')} style={styles.galleryImage} resizeMode="cover" />
        </ScrollView>
        {/* How it works */}
        <ThemedView lightColor="transparent" darkColor="transparent" style={{ alignItems: 'center', marginTop: 24 }}>
          <ThemedText style={{ fontFamily: Fonts.display, fontSize: 28 }}>How It Works</ThemedText>
        </ThemedView>

        {/* Steps – vertical, welcoming copy */}
        <View style={{ paddingHorizontal: 12, marginTop: 8 }}>
          {/* Step 1 */}
          <Card style={[styles.stepCard, { backgroundColor: 'transparent', padding: 12 }] }>
            <View style={styles.stepIcon}>
              <MaterialIcons name="local-florist" size={20} color={Colors[scheme].gold as any} />
            </View>
            <View style={styles.stepContent}>
              <ThemedText type="defaultSemiBold">Choose a Service</ThemedText>
              <ThemedText style={[styles.stepDescription, { color: Colors[scheme].muted }]}>
                Select from <ThemedText type="defaultSemiBold">Flower Placement</ThemedText>, <ThemedText type="defaultSemiBold">Candle Lighting</ThemedText>, or <ThemedText type="defaultSemiBold">Grave Care</ThemedText> to honor your loved one.
              </ThemedText>
            </View>
          </Card>

          {/* Step 2 */}
          <Card style={[styles.stepCard, { backgroundColor: 'transparent', padding: 12 }] }>
            <View style={styles.stepIcon}>
              <MaterialIcons name="push-pin" size={20} color={Colors[scheme].gold as any} />
            </View>
            <View style={styles.stepContent}>
              <ThemedText type="defaultSemiBold">Share the Details</ThemedText>
              <ThemedText style={[styles.stepDescription, { color: Colors[scheme].muted }]}>Enter the gravesite location and any special requests.</ThemedText>
            </View>
          </Card>

          {/* Step 3 */}
          <Card style={[styles.stepCard, { backgroundColor: 'transparent', padding: 12 }] }>
            <View style={styles.stepIcon}>
              <MaterialIcons name="volunteer-activism" size={20} color={Colors[scheme].gold as any} />
            </View>
            <View style={styles.stepContent}>
              <ThemedText type="defaultSemiBold">We Care With Love</ThemedText>
              <ThemedText style={[styles.stepDescription, { color: Colors[scheme].muted }]}>Our team visits, completes the service, and ensures dignity and respect every step of the way.</ThemedText>
            </View>
          </Card>

          {/* Step 4 */}
          <Card style={[styles.stepCard, { backgroundColor: 'transparent', padding: 12 }] }>
            <View style={styles.stepIcon}>
              <MaterialIcons name="photo-camera" size={20} color={Colors[scheme].gold as any} />
            </View>
            <View style={styles.stepContent}>
              <ThemedText type="defaultSemiBold">Receive Updates</ThemedText>
              <ThemedText style={[styles.stepDescription, { color: Colors[scheme].muted }]}>Get photo confirmation directly in your app — feel connected, no matter the distance.</ThemedText>
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
          <Link href="/auth/sign-up" asChild>
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
    gap: 12,
    alignItems:'center',
    flexDirection:"row",
  },
  stepContent: {
    flex: 1,
    minWidth: 0,
  },
  stepDescription: {
    marginTop: 4,
    opacity: 0.95,
  },
  stepIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryImage: {
    width: 220,
    height: 140,
    borderRadius: 14,
  },
});
