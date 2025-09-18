import ScreenBackground from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const scheme = useColorScheme() ?? 'dark';
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialScrollRef = useRef<ScrollView>(null);

  const testimonials = [
    {
      quote: 'Even though I live far away, Grave Love keeps me connected.',
      name: 'Maria S.',
      location: 'New York, USA',
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=60',
    },
    {
      quote: 'The updates gave our family real peace of mind.',
      name: 'Daniel R.',
      location: 'Astoria, USA',
      photo: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote: 'Me and my family used Grave Love and it changed our life.',
      name: 'Dana K.',
      location: 'State Island, USA',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=60',
    },
  ];

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

        {/* Testimonials slider */}
        <View style={{ marginTop: 16 }}>
          <ScrollView
            horizontal
            pagingEnabled
            ref={testimonialScrollRef}
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const i = Math.round(e.nativeEvent.contentOffset.x / width);
              if (i !== testimonialIndex) setTestimonialIndex(i);
            }}
            scrollEventThrottle={16}
          >
            {testimonials.map((t, i) => (
              <View key={i} style={{ width }}>
                <View style={{ paddingHorizontal: 12 }}>
                  <Card style={styles.testimonialCard}>
                    <ThemedText style={styles.testimonialQuote}>“{t.quote}”</ThemedText>
                    <View style={styles.testimonialAuthorRow}>
                      <Image
                        source={{ uri: t.photo }}
                        style={styles.testimonialAvatar}
                        resizeMode="cover"
                        accessibilityLabel="Customer portrait"
                      />
                      <View style={{ flex: 1, minWidth: 0 }}>
                        <ThemedText type="defaultSemiBold">{t.name}</ThemedText>
                        <ThemedText style={{ color: Colors[scheme].muted, marginTop: 2 }}>{t.location}</ThemedText>
                      </View>
                    </View>
                  </Card>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.dotsRow}>
            {testimonials.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === testimonialIndex && { backgroundColor: Colors[scheme].gold, width: 16 }]}
              />
            ))}
          </View>
        </View>
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
  testimonialCard: {
    paddingVertical: 16,
  },
  testimonialQuote: {
    fontFamily: Fonts.display,
    fontStyle: 'italic',
    fontSize: 18,
    lineHeight: 24,
  },
  testimonialAuthorRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  testimonialAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
});
