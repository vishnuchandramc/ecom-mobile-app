import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/ui/atoms/Haptic";
import TabBarBackground from "@/components/ui/organisms/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import DiscoverIcon from "@/assets/icons/DiscoverIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import HomeIcon from "@/assets/icons/HomeIcon";
import { ProtectedRoute } from "@/app/(auth)/ProtectedRoute";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          animation: "fade",
          tabBarButton: HapticTab,
          tabBarItemStyle: {
            padding: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "AtypTextMedium",
          },
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <HomeIcon size={22} color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => <DiscoverIcon color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <ProfileIcon size={28} color={color} />,
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
