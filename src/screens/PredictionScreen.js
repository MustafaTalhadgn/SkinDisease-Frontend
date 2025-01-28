import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import treatments from "../treatments"; // Yol projenize göre değişebilir

const PredictionScreen = ({ route }) => {
  const { predictedClass, confidence } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tahmin Sonucu</Text>
      <Text style={styles.result}>Hastalık: {predictedClass}</Text>
      <Text style={styles.confidence}>
        Güven: %{(confidence * 100).toFixed(2)}
      </Text>
      <Text style={styles.treatmentTitle}>Tedavi Bilgileri:</Text>
      <Text style={styles.treatmentDisease}>
        {treatments[predictedClass]?.title || "Bilinmiyor"}
      </Text>
      <Text style={styles.treatmentText}>
        <Text style={styles.boldText}>Doğal Tedaviler: </Text>
        {treatments[predictedClass]?.natural?.join(", ") || "Bilinmiyor"}
      </Text>

      <Text style={styles.treatmentText}>
        <Text style={styles.boldText}>Tıbbi Tedaviler: </Text>
        {treatments[predictedClass]?.medical?.join(", ") || "Bilinmiyor"}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
    marginBottom: 10,
  },
  confidence: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  treatmentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  treatmentDisease: {
    fontWeight: "bold",
    fontSize: 18,
  },
  treatmentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
});
export default PredictionScreen;
