import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useLanguage } from '@/contexts/languageProvider';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].surface,
          borderTopColor: Colors[colorScheme ?? 'light'].gray200,
        },
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('Layout.tabs.index'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="mountain.2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: t('Layout.tabs.recipes'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="frying.pan.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="restaurants"
        options={{
          title: t('Layout.tabs.restaurants'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="building.2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t('Layout.tabs.explore'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="map.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="workshops"
        options={{
          title: t('Layout.tabs.workshops'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.circle.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
