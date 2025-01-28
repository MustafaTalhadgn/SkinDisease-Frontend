import { useNavigation } from "@react-navigation/native"; // Sayfa yönlendirme için
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Hata mesajı
  const auth = getAuth();
  const navigation = useNavigation(); // Sayfa yönlendirme

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User signed in:", userCredential.user);
        // Giriş başarılı olduğunda main.js sayfasına yönlendir
        navigation.replace("Main");
      })
      .catch((error) => {
        setErrorMessage("E-posta veya şifre yanlış!"); // Hata mesajını ayarla
        console.error("Error during login:", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Giriş Yap
          </Text>

          {/* E-posta Girişi */}
          <TextInput
            mode="outlined"
            label="E-posta"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          {/* Şifre Girişi */}
          <TextInput
            mode="outlined"
            label="Şifre"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          {/* Hata Mesajı */}
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}

          {/* Giriş Yap Butonu */}
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            <Text> Giriş Yap</Text>
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Login;
