import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import app from "../firebase"; // Firebase yapılandırmasını import et

const Index = ({ navigation }) => {
  const [userName, setUserName] = useState(""); // Kullanıcı adını saklamak için state
  const [userEmail, setUserEmail] = useState(""); // Kullanıcı e-posta bilgisi
  const [profilePic, setProfilePic] = useState(""); // Profil fotoğrafı için state (isteğe bağlı)

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser; // Şu an giriş yapan kullanıcı
        if (currentUser) {
          const userId = currentUser.uid; // Kullanıcının UID'sini al
          const userDoc = await getDoc(doc(db, "users", userId)); // Firestore'dan kullanıcı verisini al

          if (userDoc.exists()) {
            const userData = userDoc.data(); // Veriyi al
            setUserName(userData.fullName); // Ad soyad bilgisini state'e ata
            setUserEmail(userData.email); // E-posta bilgisini state'e ata
            // Eğer bir profil fotoğrafı alanı varsa:
            setProfilePic(userData.profilePic || "default-profile-pic-url");
          } else {
            console.log("Kullanıcı verisi bulunamadı.");
          }
        }
      } catch (error) {
        console.error("Kullanıcı verisi alınırken hata:", error);
      }
    };

    fetchUserData(); // Bileşen yüklendiğinde kullanıcı verisini getir
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoş Geldiniz, {userName}!</Text>

      {/* Profil Fotoğrafı */}
      <Image source={{ uri: profilePic }} style={styles.profileImage} />

      {/* Kullanıcı Bilgileri */}
      <Text>E-posta: {userEmail}</Text>

      {/* Fotoğraf Yükleme Alanı */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("PhotoUpload");
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
          auth.signOut().then(() => {
            navigation.replace("Login"); // Çıkış yapıldıktan sonra giriş sayfasına yönlendir
          });
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
    width: "50%",
    height: 50,
    backgroundColor: "#0056b3",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Index;
