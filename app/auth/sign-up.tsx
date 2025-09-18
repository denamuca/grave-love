import ScreenBackground from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const scheme = useColorScheme() ?? 'dark';
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('Brian Rusi');
  const [email, setEmail] = useState('brianrusi@gmail.com');
  const [password, setPassword] = useState('GraveLove!');

  return (
    <ScreenBackground>
      <ThemedView lightColor="transparent" darkColor="transparent" style={[styles.container, { paddingTop: insets.top + 40 }]}>
        <View style={styles.brand}>
          <Image
            source={require('@/assets/images/grave_love_header.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText style={[styles.brandText, { color: Colors[scheme].ivory }]}>Grave Love</ThemedText>
        </View>

        <Card style={{ marginTop: 20 }}>
          
          <View style={{ gap: 12 }}>
            <TextInput
              placeholder="Name"
              placeholderTextColor={Colors[scheme].muted}
              value={name}
              onChangeText={setName}
              style={[styles.input, { backgroundColor: Colors[scheme].card, borderColor: Colors[scheme].border, color: Colors[scheme].text }]}
            />
            <TextInput
              placeholder="Email address"
              placeholderTextColor={Colors[scheme].muted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.input, { backgroundColor: Colors[scheme].card, borderColor: Colors[scheme].border, color: Colors[scheme].text }]}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={Colors[scheme].muted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[styles.input, { backgroundColor: Colors[scheme].card, borderColor: Colors[scheme].border, color: Colors[scheme].text }]}
            />
            <Button onPress={() => { router.replace('/(main)/home'); }}>Sign Up</Button>
          </View>
        </Card>

        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <ThemedText style={{ color: Colors[scheme].muted }}>
            Already have an account?{' '}
            <Link href="/auth/sign-in"><ThemedText type="link">Log in</ThemedText></Link>
          </ThemedText>
        </View>
      </ThemedView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12, flex: 1 },
  brand: { alignItems: 'center', gap: 8, marginBottom: 6 },
  logo: { width: 100, height: 76 },
  brandText: { fontFamily: Fonts.display, fontSize: 36, lineHeight: 42, textAlign: 'center' },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
});
