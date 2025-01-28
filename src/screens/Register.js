import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import app from "../firebase"; // Firebase config dosyasını import edin

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const auth = getAuth(app);
  const db = getFirestore(app); // Firestore bağlantısı

  const handleRegister = async () => {
    // Giriş doğrulama kontrolleri
    if (!fullName || !email || !password || !phone || !gender) {
      setError("Lütfen tüm alanları doldurun.");
      setSuccess("");
      return;
    }
    if (!email.includes("@")) {
      setError("Geçersiz e-posta formatı");
      setSuccess("");
      return;
    }
    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır");
      setSuccess("");
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Telefon numarası 10 haneli olmalıdır.");
      setSuccess("");
      return;
    }

    try {
      // Kullanıcının mevcut olup olmadığını kontrol et
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setError("Bu e-posta zaten kullanımda");
        return;
      }

      // Firebase Authentication ile kullanıcı oluşturma
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      console.log("Firebase Authentication başarılı, UID:", userId);

      // Kullanıcı verilerini Firestore'a kaydetme
      const userData = {
        fullName,
        email,
        phone,
        birthDate: birthDate.toISOString(),
        gender,
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, "users", userId), userData);
      console.log("Kullanıcı verileri Firestore'a kaydedildi:", userData);

      // Başarı mesajını burada göster
      setSuccess("Kullanıcı başarıyla oluşturuldu!");
      setError("");

      // Form alanlarını temizleme
      setFullName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setBirthDate(new Date());
      setGender("");

      // Başarı mesajını birkaç saniye sonra kaldır
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Kayıt sırasında bir hata oluştu:", error.message);
      setError("Kayıt sırasında bir hata oluştu: " + error.message);
      setSuccess("");
      setTimeout(() => setError(""), 3000); // Hata mesajını kaldır
    }
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: birthDate,
      onChange: (event, selectedDate) =>
        setBirthDate(selectedDate || birthDate),
      mode: "date",
      is24Hour: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {success && <Text style={styles.successText}>{success}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        value={fullName}
        onChangeText={setFullName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Telefon Numarası"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Doğum Tarihi (GG/AA/YYYY)"
        value={birthDate.toLocaleDateString()}
        onFocus={showDatePicker}
        editable={false}
      />
      <Button title="Doğum Tarihi Seç" onPress={showDatePicker} />
      <View style={styles.genderContainer}>
        <Text style={styles.genderTitle}>Cinsiyet</Text>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "Erkek" && styles.genderButtonSelected,
          ]}
          onPress={() => setGender("Erkek")}
        >
          <Text
            style={[
              styles.genderText,
              gender === "Erkek" && styles.genderTextSelected,
            ]}
          >
            Erkek
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "Kadın" && styles.genderButtonSelected,
          ]}
          onPress={() => setGender("Kadın")}
        >
          <Text
            style={[
              styles.genderText,
              gender === "Kadın" && styles.genderTextSelected,
            ]}
          >
            Kadın
          </Text>
        </TouchableOpacity>
      </View>
      <Button title="Kayıt Ol" onPress={handleRegister} />
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
  errorText: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
  successText: {
    color: "green",
    marginBottom: 15,
    textAlign: "center",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  genderTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  genderButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
  },
  genderButtonSelected: {
    backgroundColor: "#0056b3",
    borderColor: "#0056b3",
  },
  genderText: {
    color: "black",
  },
  genderTextSelected: {
    color: "white",
  },
});

export default Register;
