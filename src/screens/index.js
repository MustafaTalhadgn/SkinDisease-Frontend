import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import app from "../firebase"; // Firebase bağlantısı

const Main = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const auth = getAuth(app);

  useEffect(() => {
    const user = auth.currentUser; // Firebase'deki oturum açan kullanıcıyı al
    if (user) {
      setUserName(user.displayName || "Kullanıcı Adı Bulunamadı");
      setUserEmail(user.email);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoş Geldiniz, {userName}!</Text>

      {/* Profil Fotoğrafı */}
      <Image
        source={{ uri: "user-profile-pic-url" }}
        style={styles.profileImage}
      />

      {/* Kullanıcı Bilgileri */}
      <Text>E-posta: {userEmail}</Text>

      {/* Fotoğraf Yükleme Alanı */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          /* fotoğraf yükleme işlemi */
        }}
      >
        <Text style={styles.buttonText}>Fotoğraf Yükle</Text>
      </TouchableOpacity>

      {/* Diğer Sayfalara Navigasyon */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={styles.buttonText}>Ayarlar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Records")}
      >
        <Text style={styles.buttonText}>Kayıtlı Veriler</Text>
      </TouchableOpacity>

      {/* Çıkış Butonu */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          /* çıkış yapma işlemi */
        }}
      >
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  button: {
    width: "50%", // Yüzde 50 genişlik
    height: 50, // Sabit yükseklik
    backgroundColor: "#0056b3",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10, // Butonlar arası boşluk
    borderRadius: 5, // Kenar yuvarlama
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Main;
