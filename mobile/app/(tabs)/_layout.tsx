import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '@/contexts/languageProvider';

const colors = {
  amber500: "#F59E0B",
  amber600: "#D97706",
  orange600: "#EA580C",
  white: "#FFFFFF",
  gray900: "#111827",
  gray800: "#1F2937",
  gray700: "#374151",
  gray400: "#9CA3AF",
  gray300: "#D1D5DB",
};

export default function TabLayout() {
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.amber500,
        tabBarInactiveTintColor: colors.gray700,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.gray300,
          height: 90,
          paddingBottom: 60,
          paddingTop: 6,
        },
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.3,
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('Layout.tabs.index'),
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={focused ? 30 : 26} 
              name="house.fill" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t('Layout.tabs.explore'),
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={focused ? 30 : 26} 
              name="map.fill" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="gastronomy"
        options={{
          title: t('Layout.tabs.gastronomy'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="restaurant" 
              size={focused ? 30 : 26} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="experiences"
        options={{
          title: t('Layout.tabs.experiences'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="calendar" 
              size={focused ? 30 : 26} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('Layout.tabs.settings'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="settings" 
              size={focused ? 30 : 26} 
              color={color} 
            />
          ),
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
