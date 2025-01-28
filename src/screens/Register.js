import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  Provider,
  RadioButton,
  Text,
  TextInput,
} from "react-native-paper";
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
  const [visible, setVisible] = useState(false);

  const auth = getAuth(app);
  const db = getFirestore(app); // Firestore bağlantısı

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: birthDate,
      onChange: (event, selectedDate) =>
        setBirthDate(selectedDate || birthDate),
      mode: "date",
      is24Hour: true,
    });
  };

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

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Kayıt Ol</Text>

        {error && <HelperText type="error">{error}</HelperText>}
        {success && <Text style={styles.successText}>{success}</Text>}

        <TextInput
          label="Ad Soyad"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="E-posta"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Şifre"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Telefon Numarası"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Doğum Tarihi"
          value={birthDate.toLocaleDateString()}
          editable={false}
          style={styles.input}
          mode="outlined"
        />
        <Button
          mode="contained"
          onPress={showDatePicker}
          style={styles.dateButton}
        >
          Doğum Tarihi Seç
        </Button>

        <Text style={styles.genderTitle}>Cinsiyet</Text>
        <RadioButton.Group onValueChange={setGender} value={gender}>
          <View style={styles.genderContainer}>
            <View style={styles.genderOption}>
              <RadioButton value="Erkek" />
              <Text>Erkek</Text>
            </View>
            <View style={styles.genderOption}>
              <RadioButton value="Kadın" />
              <Text>Kadın</Text>
            </View>
          </View>
        </RadioButton.Group>

        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.registerButton}
        >
          Kayıt Ol
        </Button>
      </View>
    </Provider>
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
    marginBottom: 10,
  },
  successText: {
    color: "green",
    marginBottom: 15,
    textAlign: "center",
  },
  genderTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateButton: {
    marginBottom: 15,
  },
  registerButton: {
    marginTop: 20,
  },
});

export default Register;
