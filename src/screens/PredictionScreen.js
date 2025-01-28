import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Paragraph, Text, Title } from "react-native-paper";
import treatments from "../treatments"; // Yol projenize göre değişebilir

const PredictionScreen = ({ route }) => {
  const { predictedClass, confidence } = route.params;

  const treatmentData = treatments[predictedClass] || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Tahmin Sonucu</Title>
          <Paragraph style={styles.result}>
            <Text style={styles.boldText}>Hastalık: </Text>
            {predictedClass || "Bilinmiyor"}
          </Paragraph>
          <Paragraph style={styles.result}>
            <Text style={styles.boldText}>Güven: </Text>%
            {(confidence * 100).toFixed(2) || "0.00"}
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
});

export default PredictionScreen;
