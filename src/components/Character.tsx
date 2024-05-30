import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type Props = TouchableOpacityProps & {
  name: string;
  imageUrl: string;
  onFavorite: () => void;
  isFavorite: boolean;
}

export function Character({name, imageUrl, onFavorite, isFavorite,...rest} : Props) {
  
  return (
    <TouchableOpacity style={styles.character} {...rest}>
      <Image source={{uri: imageUrl}} style={styles.avatar}/>

      <View style={styles.info}>
        <Text>{name}</Text>
      </View>

    
      <TouchableOpacity onPress={onFavorite}>
        <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24}  />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  character: {
    paddingHorizontal: 24,
    paddingVertical:12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    flex: 1,
    marginLeft: 12
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 99,
  }
})