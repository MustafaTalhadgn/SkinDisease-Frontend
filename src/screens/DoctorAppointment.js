// DoctorListScreen.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { WebView } from "react-native-webview";

const DoctorAppointment = ({ route }) => {
  const { city } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{city} için dermatologlar</Text>
      <WebView
        source={{
          uri: `https://www.doktortakvimi.com/ara?q=Dermatoloji&loc=${city}&filters%5Bspecializations%5D%5B%5D=37`,
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default DoctorAppointment;