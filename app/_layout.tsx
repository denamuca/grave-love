import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AppProvider } from '@/lib/store/AppContext';
import { Colors, ForceDark } from '@/constants/theme';

export const unstable_settings = {
  anchor: '(main)',
};

export default function RootLayout() {
  const colorScheme = ForceDark ? 'dark' : useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppProvider>
        <Stack screenOptions={{ headerBackTitleVisible: false }}>
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen name="memorial/[id]" options={{
            // Keep minimal back button; title is the header image
            headerBackTitle: '',
            headerBackTitleVisible: false,
            headerBackButtonDisplayMode: 'minimal',
            headerStyle: { backgroundColor: Colors[colorScheme ?? 'dark'].card },
            headerTintColor: Colors[colorScheme ?? 'dark'].text,
            headerTitleStyle: { color: Colors[colorScheme ?? 'dark'].text },
            headerShadowVisible: false,
          }} />
          <Stack.Screen name="memorial/create" options={{
            title: 'Create Memorial',
            headerBackTitleVisible: false,
            headerBackTitle: '',
            headerStyle: { backgroundColor: Colors[colorScheme ?? 'dark'].card },
            headerTintColor: Colors[colorScheme ?? 'dark'].text,
            headerTitleStyle: { color: Colors[colorScheme ?? 'dark'].text },
            headerShadowVisible: false,
          }} />
          <Stack.Screen name="order/new" options={{
            title: 'New Order',
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: Colors[colorScheme ?? 'dark'].card },
            headerTintColor: Colors[colorScheme ?? 'dark'].text,
            headerTitleStyle: { color: Colors[colorScheme ?? 'dark'].text },
            headerShadowVisible: false,
          }} />
          <Stack.Screen name="subscription/new" options={{
            title: 'Subscription',
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: Colors[colorScheme ?? 'dark'].card },
            headerTintColor: Colors[colorScheme ?? 'dark'].text,
            headerTitleStyle: { color: Colors[colorScheme ?? 'dark'].text },
            headerShadowVisible: false,
          }} />
          <Stack.Screen name="job/[jobId]" options={{
            title: 'Job',
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: Colors[colorScheme ?? 'dark'].card },
            headerTintColor: Colors[colorScheme ?? 'dark'].text,
            headerTitleStyle: { color: Colors[colorScheme ?? 'dark'].text },
            headerShadowVisible: false,
          }} />
          <Stack.Screen name="reminders" options={{
            title: 'Reminders',
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: Colors[colorScheme ?? 'dark'].card },
            headerTintColor: Colors[colorScheme ?? 'dark'].text,
            headerTitleStyle: { color: Colors[colorScheme ?? 'dark'].text },
            headerShadowVisible: false,
          }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
      </AppProvider>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
