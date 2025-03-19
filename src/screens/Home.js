import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/doktor.png")} style={styles.image} />
      <Text variant="headlineMedium" style={styles.title}>
        Hoş Geldiniz!
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Register")}
        style={styles.button}
      >
        <Text>Kayıt Ol</Text>
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      >
        <Text>Giriş Yap</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  image: {
    width: 256,
    height: 256,
    marginBottom: 30,
  },
  button: {
    width: 200,
    marginVertical: 10,
  },
});

export default Home;
