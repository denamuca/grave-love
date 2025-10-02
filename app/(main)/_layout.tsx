import { Tabs, useRouter } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useApp } from '@/lib/store/AppContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useApp();
  const router = useRouter();

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'dark'].tabIconDefault,
        tabBarStyle: { backgroundColor: Colors[colorScheme ?? 'dark'].card, borderTopColor: Colors[colorScheme ?? 'dark'].border },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass" color={color} />,
          href: isAuthenticated ? undefined : null,
        }}
        listeners={{
          tabPress: (e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              router.push('/auth/sign-in');
            }
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Family',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
          href: isAuthenticated ? undefined : null,
        }}
        listeners={{
          tabPress: (e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              router.push('/auth/sign-in');
            }
          },
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="tray.full.fill" color={color} />,
          href: isAuthenticated ? undefined : null,
        }}
        listeners={{
          tabPress: (e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              router.push('/auth/sign-in');
            }
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle" color={color} />,
          href: isAuthenticated ? undefined : null,
        }}
        listeners={{
          tabPress: (e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              router.push('/auth/sign-in');
            }
          },
        }}
      />
    </Tabs>
  );
}
