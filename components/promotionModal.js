import {
  StyleSheet,
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

import { AntDesign } from "@expo/vector-icons";

const termsNconditions1 =
  "Discount does not apply to surcharges, government fees, tolls or tips and cannot be combined with other offers.";
const termsNconditions2 =
  "For accounts with multiple valid promo codes, the promo with highest savings will be applied automatically to next trip.";
const termsNconditions3 =
  "Offer is non-transferable. Offer and terms are subject to change.";

const validityText1 =
  "Only valid on: Go Intercity, Intercity, Sedan Intercity, XL Intercity.";
const validityText2 = "Up to ₹2000 per trip.";

export const PromotionModal = (props) => {
  const { handleModalClose } = props;

  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  const formattedDate = futureDate.toISOString().slice(0, 10);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      //   visible={modalVisible}
      //   onRequestClose={closeModal}
    >
      <View style={styles.modal}>
        <ScrollView style={styles.modalContent}>
          <AntDesign
            name="arrowleft"
            size={34}
            color="black"
            onPress={handleModalClose}
          />
          <Text style={[styles.switchText]}>Promotion</Text>
          <Text style={{ fontSize: 30, paddingHorizontal: 10 }}>
            13% off your next 20+ trips. Up to ₹2000 per trip.
          </Text>
          <Text style={{ paddingHorizontal: 10, marginVertical: 40 }}>
            {" "}
            Expires {formattedDate}{" "}
          </Text>

          <View style={{ marginVertical: 20 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", padding: 4 }}
            >
              <Text style={styles.bullet}></Text>
              <Text style={styles.text}>{validityText1} </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 4,
                marginTop: -15,
              }}
            >
              <Text style={styles.bullet}></Text>
              <Text style={styles.text}>{validityText2} </Text>
            </View>
          </View>

          <Text style={styles.termsText}>{termsNconditions1} </Text>
          <Text style={styles.termsText}>{termsNconditions2} </Text>
          <Text style={styles.termsText}>{termsNconditions3} </Text>
        </ScrollView>
        <View
          style={{
            backgroundColor: "white",
            shadowColor: "whitesmoke",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 4,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              marginVertical: 20,
            }}
          >
            we'll apply your best deal
          </Text>
          <TouchableOpacity onPress={()=>router.push("/dashboard")} style={styles.button}>
            <Text style={styles.textBold}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    // justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    // backgroundColor: "#ffffff",
    // padding: 60,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 8,
    // justifyContent: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
    bottom: 0,
    gap: 10,
    paddingLeft: 20,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
    marginRight: 10,
    marginTop: -5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "300",
  },
  switchText: {
    fontWeight: "700",
    fontSize: 32,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  textBold: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 19,
  },
  button: {
    backgroundColor: "#21D375",
    width: 200,
    padding: 10,
    borderRadius: 50,
    position: "fixed",
    bottom: 10,
    left: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  termsText: {
    fontWeight: "300",
    fontSize: 14,
    paddingHorizontal: 10,
  },
});
