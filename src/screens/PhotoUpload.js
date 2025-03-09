import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";
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
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Fotoğraf çekme işlemi (Kamera ile)
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
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
        name: "photo.jpg",
        type: "image/jpeg",
      });

      const res = await fetch("http://192.168.1.33:5000/process-image", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        setPredictedClass(result.class);
        setConfidence(result.confidence);

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
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Fotoğraf Yükleme
          </Text>

          {/* Seçilen fotoğrafı göster */}
          {image ? (
            <Card>
              <Image source={{ uri: image }} style={styles.image} />
            </Card>
          ) : (
            <Text style={styles.placeholder}>
              Henüz bir fotoğraf seçilmedi.
            </Text>
          )}

          {/* Fotoğraf Seç Butonu */}
          <Button
            mode="outlined"
            icon="image"
            onPress={pickImage}
            style={styles.button}
          >
            <Text> Klasörden Fotoğraf Seç</Text>
          </Button>

          {/* Fotoğraf Çek Butonu */}
          <Button
            mode="outlined"
            icon="camera"
            onPress={takePhoto}
            style={styles.button}
          >
            <Text> Fotoğraf Çek</Text>
          </Button>

          {/* Fotoğraf Yükleme Butonu */}
          <Button
            mode="contained"
            icon="upload"
            onPress={uploadImage}
            style={styles.button}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <ActivityIndicator animating={true} size="small" />
                <Text style={styles.uploadingText}> Yükleniyor...</Text>
              </>
            ) : (
              "Fotoğraf Gönder"
            )}
          </Button>
        </Card.Content>
      </Card>
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
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 10,
  },
  placeholder: {
    textAlign: "center",
    marginVertical: 20,
    color: "#aaa",
  },
  button: {
    marginVertical: 10,
  },
  uploadingText: {
    marginLeft: 10,
  },
});

export default PhotoUpload;
