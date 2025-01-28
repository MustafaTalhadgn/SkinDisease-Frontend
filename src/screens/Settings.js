import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper"; // Burayı güncelledik

const Settings = ({ navigation }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ayarlar</Text>
      <View style={styles.buttons}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("userSettings")}
          style={styles.Button}
        >
          <Text>Profili Değiştir</Text>
        </Button>
      </View>
      <View>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("appSettings")}
          style={styles.Button}
        >
          <Text>Uygulama Ayarları</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  buttons: {
    marginBottom: "10",
  },
  success: {
    color: "green",
    textAlign: "center",
    marginBottom: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  link: {
    color: "blue",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Settings;
