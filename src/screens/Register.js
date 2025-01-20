import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
} from "firebase/auth";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import app from "../firebase";

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

  const handleRegister = () => {
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
    setError("");
    setSuccess("");

    // Kullanıcı varlığı kontrolü
    fetchSignInMethodsForEmail(auth, email)
      .then((methods) => {
        if (methods.length > 0) {
          setError("Bu e-posta zaten kullanımda");
          return;
        }
        // Yeni kullanıcı oluşturma
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            setSuccess("Kullanıcı başarıyla oluşturuldu!");
            setFullName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setBirthDate(new Date());
            setGender("");
          })
          .catch((error) => {
            setError("Kayıt sırasında bir hata oluştu: " + error.message);
          });
      })
      .catch((error) => {
        setError(
          "E-posta kontrolü sırasında bir hata oluştu: " + error.message
        );
      });
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
        placeholder="Telefon Numarası (Opsiyonel)"
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
          <Text style={styles.genderText}>Erkek</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "Kadın" && styles.genderButtonSelected,
          ]}
          onPress={() => setGender("Kadın")}
        >
          <Text style={styles.genderText}>Kadın</Text>
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
    backgroundColor: "black",
    borderColor: "#0056b3",
  },
  genderText: {
    color: "black",
  },
});

export default Register;
