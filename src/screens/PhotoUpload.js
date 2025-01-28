import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PhotoUpload = ({ navigation }) => {
  const [image, setImage] = useState(null); // Seçilen fotoğraf
  const [uploading, setUploading] = useState(false); // Yükleme durumu
  const [predictedClass, setPredictedClass] = useState(null); // Tahmin edilen hastalık
  const [confidence, setConfidence] = useState(null); // Güven oranı

  // Fotoğraf seçme işlemi (Klasörden)
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Kare fotoğraf seçimi için
      quality: 1, // En yüksek kalite
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Fotoğraf çekme işlemi (Kamera ile)
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1], // Kare fotoğraf çekimi için
      quality: 1, // En yüksek kalite
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Fotoğrafı Flask backend'ine gönderme
  const uploadImage = async () => {
    if (!image) {
      alert("Lütfen önce bir fotoğraf seçin.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", {
        uri: image,
        name: "photo.jpg", // Fotoğrafın adı
        type: "image/jpeg", // Fotoğrafın MIME tipi
      });

      // Flask backend'e POST isteği gönderme
      const res = await fetch("http://192.168.85.234:5000/process-image", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        setPredictedClass(result.class); // Tahmin edilen sınıf
        setConfidence(result.confidence); // Güven oranı

        // Tahmin ekranına yönlendirme
        navigation.navigate("PredictionScreen", {
          predictedClass: result.class,
          confidence: result.confidence,
        });
      } else {
        console.error("Backend hatası:", res.statusText);
        alert("Fotoğraf gönderimi sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Fotoğraf gönderimi sırasında bir hata oluştu.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fotoğraf Yükleme</Text>

      {/* Seçilen fotoğrafı göster */}
      {image && <Image source={{ uri: image }} style={styles.image} />}

      {/* Fotoğraf Seç Butonu */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Klasörden Fotoğraf Seç</Text>
      </TouchableOpacity>

      {/* Fotoğraf Çek Butonu */}
      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Fotoğraf Çek</Text>
      </TouchableOpacity>

      {/* Fotoğraf Yükleme Butonu */}
      <TouchableOpacity
        style={[styles.button, uploading && styles.disabledButton]}
        onPress={uploadImage}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>
          {uploading ? "Yükleniyor..." : "Fotoğraf Gönder"}
        </Text>
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#0056b3",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: "#999",
  },
});

export default PhotoUpload;
