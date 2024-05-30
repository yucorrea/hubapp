import { Redirect, Stack } from "expo-router";
export default function Layout() {
  const session = true;

  if(!session) return <Redirect href={"sign-in"}/>

  return (
    <Stack screenOptions={{headerBackTitle: "Voltar"}}>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
      <Stack.Screen 
        name="character/[characterId]" 
        options={({ route }) => ({
          title: route.params.name, 
          presentation: "modal"
        })} 
      />
    </Stack>
  )
}