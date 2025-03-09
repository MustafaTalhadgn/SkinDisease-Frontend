import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import app from "../firebase"; // Firebase yapılandırmasını import et

const Index = ({ navigation }) => {
  const [userName, setUserName] = useState(""); // Kullanıcı adını saklamak için state
  const [userEmail, setUserEmail] = useState(""); // Kullanıcı e-posta bilgisi
  const [profilePic, setProfilePic] = useState(""); // Profil fotoğrafı için state
  const [loading, setLoading] = useState(true); // Yükleniyor durumunu takip etmek için state

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
            setProfilePic(userData.profilePic || "default-profile-pic-url"); // Profil fotoğrafı
          } else {
            console.log("Kullanıcı verisi bulunamadı.");
          }
        }
      } catch (error) {
        console.error("Kullanıcı verisi alınırken hata:", error);
      } finally {
        setLoading(false); // Veriler alındıktan sonra loading durumunu false yap
      }
    };

    fetchUserData(); // Bileşen yüklendiğinde kullanıcı verisini getir
  }, []);

  if (loading) {
    // Eğer veriler hala yükleniyorsa, yüklenme göstergesi göster
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Avatar.Image
            size={100}
            source={{ uri: profilePic }}
            style={styles.avatar}
          />
          <Text variant="headlineMedium" style={styles.title}>
            Hoş Geldiniz, {userName}
          </Text>
        </Card.Content>
      </Card>

      {/* Fotoğraf Yükle Butonu */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate("PhotoUpload")}
        style={styles.button}
      >
        <Text>Fotoğraf Yükle</Text>
      </Button>

      {/* Ayarlar Butonu */}
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("Settings")}
        style={styles.button}
      >
        <Text>Ayarlar</Text>
      </Button>

      {/* Kayıtlı Veriler Butonu */}
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("Records")}
        style={styles.button}
      >
        <Text>Kayıtlı Veriler</Text>
      </Button>

      {/* Çıkış Yap Butonu */}
      <Button
        mode="text"
        onPress={() => {
          auth.signOut().then(() => {
            navigation.replace("Login");
          });
        }}
        style={styles.logoutButton}
      >
        <Text>Çıkış Yap</Text>
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
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "90%",
    marginBottom: 20,
    alignItems: "center",
  },
  avatar: {
    alignSelf: "center",
    marginBottom: 15,
  },
  title: {
    textAlign: "center",
    marginBottom: 5,
  },
  email: {
    textAlign: "center",
    color: "#555",
    marginBottom: 10,
  },
  button: {
    marginVertical: 10,
    width: "90%",
  },
  logoutButton: {
    marginTop: 20,
    width: "90%",
  },
});

export default Index;
