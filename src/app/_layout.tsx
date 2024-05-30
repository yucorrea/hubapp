import { client } from "@/src/services/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {  
  return (
   <SafeAreaProvider>
    <QueryClientProvider client={client}>
      <RootSiblingParent>
        <Slot />
      </RootSiblingParent>
    </QueryClientProvider>
   </SafeAreaProvider>
  )
}