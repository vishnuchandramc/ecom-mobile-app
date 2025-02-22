import { Tabs } from "expo-router";
import React from "react";
import { ThemedView } from "@/components/ui/atoms";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HapticTab } from "@/components/ui/atoms/Haptic";
import TabBarBackground from "@/components/ui/organisms/TabBarBackground";
import { Colors } from "@/constants";
import { useColorScheme } from "react-native";
import HomeIcon from "@/assets/icons/HomeIcon";
import DiscoverIcon from "@/assets/icons/DiscoverIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import ProtectedRoute from "../ProtectedRoute";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { top, bottom } = useSafeAreaInsets();

  return (
    <ProtectedRoute>
      <ThemedView
        style={{
          flex: 1,
          backgroundColor: Colors[colorScheme ?? "light"].background,
          paddingTop: top,
        }}
      >
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            animation: "shift",
            lazy: true,
            tabBarItemStyle: {
              padding: 10,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: "AtypTextMedium",
            },
            tabBarBackground: TabBarBackground,
            tabBarStyle: {
              backgroundColor: Colors[colorScheme ?? "light"].background,
              borderTopWidth: 1,
              elevation: 0,
              height: 80 + bottom,
              paddingBottom: bottom,
            },
          }}
        >
          <Tabs.Screen
            name="screens/index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => <HomeIcon size={22} color={color} />,
            }}
          />
          <Tabs.Screen
            name="screens/explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ color }) => (
                <DiscoverIcon color={color} size={24} />
              ),
            }}
          />
          <Tabs.Screen
            name="screens/profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }) => (
                <ProfileIcon size={28} color={color} />
              ),
            }}
          />
        </Tabs>
      </ThemedView>
    </ProtectedRoute>
  );
}
