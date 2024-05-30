import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Character } from "@/src/components/Character";
import { Divider } from "@/src/components/Divider";
import { useCharacter } from "@/src/providers/CharacterProvider";
import { findById } from "@/src/services/character/findById";
import { useRouter } from "expo-router";

export default function Home() {
  const insets = useSafeAreaInsets();

  const {favorites, toggleFavorite, isFavorite} = useCharacter();

  const {data, isLoading } = useQuery({
    queryKey: [favorites],
    queryFn: () => findById(favorites),
    retry: false,
    enabled: favorites.length >= 1
  });


  const router = useRouter();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <FlatList 
        data={data ?? []}
        keyExtractor={item => String(item.id)}
        renderItem={({ item}) => (
          <Character 
            name={item.name} 
            imageUrl={item.image} 
            onPress={() => router.push({pathname: `character/${item.id}`, params: {name: item.name}})}
            onFavorite={() => toggleFavorite(item.id)}
            isFavorite={isFavorite(item.id)}
          />
        )}
        ItemSeparatorComponent={Divider}
        contentContainerStyle={{paddingBottom: insets.bottom}}
        onEndReachedThreshold={0.3}
        ListFooterComponent={() => isLoading && <ActivityIndicator size={32} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
})