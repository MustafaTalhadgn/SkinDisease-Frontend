import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import app from "../firebase";

const Index = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userId = currentUser.uid;
          const userDoc = await getDoc(doc(db, "users", userId));

          if (userDoc.exists()) {
            setUserName(userDoc.data().fullName);
          }
        }
      } catch (error) {
        console.error("Kullanıcı verisi alınırken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6a1b9a" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.welcomeText}>Merhaba,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("PhotoUpload")}
        style={[styles.button, styles.uploadButton]}
      >
        Fotoğraf Yükle
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate("Settings")}
        style={styles.button}
      >
        Ayarlar
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate("Records")}
        style={styles.button}
      >
        Kayıtlı Veriler
      </Button>

      <Button
        mode="text"
        onPress={() => {
          auth.signOut().then(() => {
            navigation.replace("Login");
          });
        }}
        style={styles.logoutButton}
      >
        Çıkış Yap
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
    backgroundColor: "#f3e5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3e5f5",
  },
  card: {
    width: "90%",
    padding: 20,
    maxWidth: 400,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "300",
    color: "#7b1fa2",
  },
  userName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4a148c",
    marginTop: 5,
  },
  button: {
    marginVertical: 10,
    width: "90%",
    borderRadius: 10,
  },
  uploadButton: {
    backgroundColor: "#7b1fa2",
  },
  logoutButton: {
    marginTop: 20,
    color: "#d32f2f",
  },
});

export default Index;
