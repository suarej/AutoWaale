import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function EmergencyModal(props) {
  const dialService = (service) => {
    let url = "";
    if (service == "police") {
      url = `tel:${100}`;
    } else {
      url = `tel:${108}`;
    }
    props.closeEmergencyModal();
    Linking.openURL(url);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      //   visible={modalVisible}
      //   onRequestClose={closeModal}
    >
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={[styles.switchText]}>Choose a Contact</Text>

          <TouchableOpacity
            style={{flexDirection:"row",justifyContent:"space-around",borderBottomWidth:0.2,padding:5,paddingTop:15}}
            onPress={() => dialService("police")}
          >
            <MaterialIcons name="local-police" size={34} color="#21D375" />
            <Text style={{ fontSize: 18, fontWeight: "500" }}> Police </Text>
          </TouchableOpacity>

          <TouchableOpacity
           style={{flexDirection:"row",justifyContent:"space-around",borderBottomWidth:0.2,paddingLeft:18,
           paddingBottom:10}}
            onPress={() => dialService("")}
          >
            <FontAwesome5 name="ambulance" size={30} color="#21D375" />
            <Text
              style={{ fontSize: 18, fontWeight: "500", flexDirection: "row" }}
            >
              {" "}
              Ambulance{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
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
    height: "40%",
    bottom: 0,
    gap: 10,
  },
  switchText: {
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
  },
//   servicesItems: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     borderBottomWidth: 0.2,
//     marginHorizontal: 20,
//     gap: 0,
//     marginVertical: 5,
//     marginTop: 10,
//   },
});
