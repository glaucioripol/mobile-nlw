import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color: "#fff"}}>Aeee o carai 222</Text>
      <Button color="red"  title="Oi, clica aqui" onPress={() => alert("te amoo esposa")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
