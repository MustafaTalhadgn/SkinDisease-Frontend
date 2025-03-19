import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Card, Paragraph, Text, Title } from "react-native-paper";
import treatments from "../treatments"; // Yol projenize göre değişebilir

const PredictionScreen = ({ route }) => {
  const { predictedClass, confidence } = route.params;
  const navigation = useNavigation(); // Bunu ekle
  const treatmentData = treatments[predictedClass] || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {confidence < 0.75 ? (
        <Card style={styles.warningCard}>
          <Card.Content>
            <Title style={styles.warningTitle}>Dikkat!</Title>
            <Paragraph style={styles.warningText}>
              Sonuç güvenilir değil. Daha net bir tahmin için farklı bir açıdan yeni bir fotoğraf çekmeyi deneyin.
            </Paragraph>
          </Card.Content>
        </Card>
      ) : (
        <>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Tahmin Sonucu</Title>
              <Paragraph style={styles.result}>
                <Text style={styles.boldText}>Hastalık: </Text>
                {predictedClass || "Bilinmiyor"}
              </Paragraph>
              <Paragraph style={styles.result}>
                <Text style={styles.boldText}>Güven: </Text>%{(confidence * 100).toFixed(2) || "0.00"}
              </Paragraph>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.treatmentTitle}>Tedavi Bilgileri</Title>
              <Paragraph style={styles.treatmentDisease}>
                <Text style={styles.boldText}>Hastalık Adı: </Text>
                {treatmentData.title || "Bilinmiyor"}
              </Paragraph>
              <Paragraph style={styles.treatmentText}>
                <Text style={styles.boldText}>Doğal Tedaviler: </Text>
                {treatmentData.natural?.join(", ") || "Bilinmiyor"}
              </Paragraph>
              <Paragraph style={styles.treatmentText}>
                <Text style={styles.boldText}>Tıbbi Tedaviler: </Text>
                {treatmentData.medical?.join(", ") || "Bilinmiyor"}
              </Paragraph>
            </Card.Content>
          </Card>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate("CitySelection")}
            style={styles.button}
          >
            <Text>Randevu Al</Text>
          </Button>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3, // Gölge etkisi
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0056b3",
  },
  result: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333333",
  },
  treatmentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#444",
  },
  treatmentDisease: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#666",
  },
  treatmentText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  boldText: {
    fontWeight: "bold",
    color: "#000",
  },
  warningCard: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#ffebcc", // Açık turuncu arka plan
    padding: 15,
    borderWidth: 1,
    borderColor: "#ff9900",
  },
  warningTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#cc5500",
    marginBottom: 5,
  },
  warningText: {
    fontSize: 16,
    color: "#cc5500",
  },
});

export default PredictionScreen;
