import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import app from "../firebase"; // Firebase config dosyasını import edin

const userSettings = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editable, setEditable] = useState({
    fullName: false,
    email: false,
    phone: false,
    gender: false,
    password: false,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setFullName(userDoc.data().fullName);
          setEmail(userDoc.data().email);
          setPhone(userDoc.data().phone);
          setGender(userDoc.data().gender);
        } else {
          console.log("No such document!");
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    const user = auth.currentUser;
    if (!user) {
      setErrorMessage("Kullanıcı bulunamadı.");
      return;
    }

    try {
      // Kullanıcıyı güncellemek için yalnızca geçerli (boş olmayan) alanları kontrol et
      const updates = {};

      if (fullName) updates.displayName = fullName;
      if (email) updates.email = email;
      if (password) {
        if (newPassword) updates.password = newPassword;
      }

      // Firebase Authentication güncellemelerini yap
      if (Object.keys(updates).length > 0) {
        await updateProfile(user, {
          displayName: updates.displayName || user.displayName,
        });
        if (updates.email) await updateEmail(user, updates.email);
        if (updates.password) await updatePassword(user, updates.password);
      }

      // Firestore güncellemeleri
      const userRef = doc(db, "users", user.uid);
      const userUpdates = {};
      if (fullName) userUpdates.fullName = fullName;
      if (email) userUpdates.email = email;
      if (phone) userUpdates.phone = phone;
      if (gender) userUpdates.gender = gender;

      if (Object.keys(userUpdates).length > 0) {
        await updateDoc(userRef, userUpdates);
      }

      setSuccessMessage("Ayarlar başarıyla güncellendi!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Bir hata oluştu: " + error.message);
      setSuccessMessage("");
    }
  };

  const handleChangeEditable = (field) => {
    setEditable((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ayarlar</Text>

      {successMessage ? (
        <Text style={styles.success}>{successMessage}</Text>
      ) : null}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ad Soyad"
          value={fullName}
          onChangeText={setFullName}
          editable={editable.fullName}
        />
        <Button
          mode="text"
          onPress={() => handleChangeEditable("fullName")}
          style={styles.editButton}
        >
          ✏️
        </Button>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={editable.email}
        />
        <Button
          mode="text"
          onPress={() => handleChangeEditable("email")}
          style={styles.editButton}
        >
          ✏️
        </Button>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Telefon Numarası"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          editable={editable.phone}
        />
        <Button
          mode="text"
          onPress={() => handleChangeEditable("phone")}
          style={styles.editButton}
        >
          ✏️
        </Button>
      </View>

      <View style={styles.genderContainer}>
        <Button
          mode="text"
          onPress={() => setGender("Erkek")}
          style={gender === "Erkek" ? styles.selected : styles.notSelected}
        >
          Erkek
        </Button>
        <Button
          mode="text"
          onPress={() => setGender("Kadın")}
          style={gender === "Kadın" ? styles.selected : styles.notSelected}
        >
          Kadın
        </Button>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Yeni Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={editable.password}
        />
        <Button
          mode="text"
          onPress={() => handleChangeEditable("password")}
          style={styles.editButton}
        >
          ✏️
        </Button>
      </View>

      <Button mode="contained" onPress={handleSaveChanges}>
        Değişiklikleri Kaydet
      </Button>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  editButton: {
    marginLeft: 10,
    padding: 0,
    width: 30,
    height: 30,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  selected: {
    color: "blue",
    fontWeight: "bold",
  },
  notSelected: {
    color: "gray",
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
});

export default userSettings;
