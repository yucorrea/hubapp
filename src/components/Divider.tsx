import { StyleSheet, View } from "react-native";

export function Divider() {
  return <View style={styles.container} />
}

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: "#dad7cd"
  },
})