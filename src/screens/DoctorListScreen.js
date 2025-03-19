import auth from "@react-native-firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { WebView } from "react-native-webview";

const DoctorListScreen = ({ route }) => {
    const { city } = route.params;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = auth().currentUser;
                if (currentUser) {
                    const db = getFirestore();
                    const userId = currentUser.uid;
                    const userDoc = await getDoc(doc(db, "users", userId));

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUser({
                            fullName: userData.fullName || "",
                            email: userData.email || "",
                            phone: userData.phone || "",
                            birthDate: userData.birthDate || "2000-01-01",
                        });
                    } else {
                        console.log("Kullanıcı verisi bulunamadı.");
                    }
                }
            } catch (error) {
                console.error("Kullanıcı verisi alınırken hata:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const autoFillForm = `
        setTimeout(() => {
            function fillInput(id, value) {
                let input = document.getElementById(id);
                if (input) {
                    input.value = value;
                    input.dispatchEvent(new Event("input", { bubbles: true }));
                    input.dispatchEvent(new Event("change", { bubbles: true }));
                }
            }

            fillInput("dpcmp-302", "${user?.fullName.split(" ")[0] || ""}");
            fillInput("dpcmp-303", "${user?.fullName.split(" ")[1] || ""}");
            fillInput("birthDate", "${user?.birthDate}");
            fillInput("dpcmp-323", "${user?.phone}");
            fillInput("dpcmp-324", "${user?.email}");
            fillInput("dpcmp-325", "${user?.email}");

            // Sağlık verileri onay kutusunu işaretle
            let checkbox = document.querySelector(".custom-control-input");
            if (checkbox) {
                checkbox.checked = true;
                checkbox.dispatchEvent(new Event("change", { bubbles: true }));
            }
        }, 3000); // Sayfanın tamamen yüklenmesini beklemek için 3 saniye gecikme ekledik.
    `;

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>{city} için dermatologlar</Text>
            <WebView
                source={{
                    uri: `https://www.doktortakvimi.com/ara?q=Dermatoloji&loc=${city}&filters%5Bspecializations%5D%5B%5D=37`,
                }}
                style={{ flex: 1 }}
                onNavigationStateChange={(navState) => {
                    setCurrentUrl(navState.url);
                }}
                onLoadEnd={() => {
                    if (currentUrl.includes("booking/randevu-al")) {
                        console.log("Form sayfası açıldı, form dolduruluyor...");
                        this.webref.injectJavaScript(autoFillForm);
                    }
                }}
                ref={(ref) => (this.webref = ref)}
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default DoctorListScreen;
