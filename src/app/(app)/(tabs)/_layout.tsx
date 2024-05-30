import React from "react";

import { CharacterProvider } from "@/src/providers/CharacterProvider";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

type IconName = keyof typeof Ionicons.glyphMap

const iconsName : Record<string, IconName> = {
  index: "search-outline",
  favorite: "heart-outline"
}

export default function Layout() {
  return (
      <CharacterProvider>
        <Tabs screenOptions={({ route }) => ({
          tabBarIcon: ({ size, color }) => {
            return <Ionicons  name={iconsName[route.name]} size={size} color={color} />
          },
          tabBarShowLabel: false
        })} initialRouteName="index">
          <Tabs.Screen name="index" options={{ headerShown: false }}/>
          <Tabs.Screen name="favorite" options={{title: "Meus favoritos"}}/>
        </Tabs>
      </CharacterProvider>
  )
}