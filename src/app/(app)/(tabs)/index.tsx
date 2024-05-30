import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useDebounce from "@/src/hooks/useDebounce";

import { Character } from "@/src/components/Character";
import { Divider } from "@/src/components/Divider";
import { useCharacter } from "@/src/providers/CharacterProvider";
import { findAll } from "@/src/services/character/findAll";
import { useRouter } from "expo-router";
import Animated from "react-native-reanimated";

export default function Home() {
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 500);

  const insets = useSafeAreaInsets();

  const {data, isLoading, hasNextPage, fetchNextPage} = useInfiniteQuery({
    queryKey: ["character", debouncedSearch],
    initialPageParam: 1,
    queryFn: ({pageParam }) => findAll({ page: pageParam, name: debouncedSearch }),
    getNextPageParam: ({ info }) => {
      let nextPage = undefined;
      
      if(info.next) {
        nextPage = parseInt(info.next.split('=')[1], 10)
      }

      return nextPage
    },
    retry: false
  });

  const onSearchByName = (value: string) => setSearch(value)

  const router = useRouter();

  const {toggleFavorite, isFavorite} = useCharacter();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>

      <View style={styles.inputContainer}>
        <TextInput 
          onChangeText={onSearchByName}
          placeholder="Pesquise um personagem" 
          style={styles.input} 
        />
      </View>
      
      <Animated.FlatList 
        data={data?.pages.flatMap(page => page.results) ?? []}
        keyExtractor={item => String(item.id)}
        renderItem={({ item}) => (
          <Character 
            name={item.name} 
            imageUrl={item.image} 
            onPress={() => router.navigate({pathname: `character/${item.id}`, params: {name: item.name}})}
            onFavorite={() => toggleFavorite(item.id)}
            isFavorite={isFavorite(item.id)}
          />
        )}
        ItemSeparatorComponent={Divider}
        contentContainerStyle={{paddingBottom: insets.bottom}}
        onEndReachedThreshold={0.3}
        onEndReached={() => hasNextPage && fetchNextPage()}
        ListFooterComponent={() => isLoading && <ActivityIndicator size={32} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  inputContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#dad7cd",
    height: 48,
    marginHorizontal: 24,
    paddingHorizontal: 8,
    borderRadius: 4
  },
  input: {
    flex: 1,
  }
})