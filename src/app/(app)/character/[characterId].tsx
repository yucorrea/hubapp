import { findById } from "@/src/services/character/findById";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

type Params = {
  characterId?: string;  
}

export default function Character() {
  const {characterId} = useLocalSearchParams<Params>();

  const { data, isLoading } = useQuery({
    queryKey: [characterId],
    queryFn: () => findById([parseInt(characterId!, 10)]),
    enabled: !!characterId 
  });
  

  return (
    <View style={styles.container}>
       {isLoading ? <ActivityIndicator size={32}/> : (
        <Image 
          source={{uri: data ? data[0].image: ''}} 
          resizeMode="contain"
          style={StyleSheet.absoluteFill} 
      />
    )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: "#fff"
  }
})