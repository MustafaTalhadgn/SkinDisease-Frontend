import { useNavigation } from "@react-navigation/native"; // Sayfa yönlendirme için
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

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
      <Text style={styles.title}>Giriş Yap</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text> // Hata mesajı
      ) : null}
      <Button title="Giriş Yap" onPress={handleLogin} />
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
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },
});

export default Login;
