import {
  Text,
  TextInput,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Ricksaw from "../assets/ricksaw.png";
import EvAuto from "../assets/evAuto.png";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import RideCancel from "../components/rideCancel";
import { useState } from "react";
import CancelReasonsModal from "../components/cancelReasonModal";

export default function BookedRide(props) {
  const { setShow, selectedVehicle, setDistance, clearDestinations, destinations } = props;
  const [cancelReasonModal, setCancelReasonModal] = useState(false);

  const showWhichVehicle = () => {
    if (selectedVehicle == "auto") {
      return <Image source={Ricksaw} style={styles.imgAuto} />;
    } else if (selectedVehicle == "ev") {
      return <Image source={EvAuto} style={styles.imgAuto} />;
    } else {
      return (
        <Octicons
          name="package"
          size={38}
          color="black"
          style={{ marginLeft: 8 }}
        />
      );
    }
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
          <Text style={{ color: "#1e90ff" }}> Captain on the Way! </Text>
          <View style={styles.rideContainer}>
            <View>
              <Text style={styles.rideText}>MH12 VB9129 </Text>
              <Text style={{ fontSize: 14 }}>Rakesh Roy</Text>
              <Text style={{ fontWeight: "500", fontSize: 18 }}>
                OTP : 9867
              </Text>
              <Text>
                4.1
                <Entypo name="star" size={20} color="#FDDE55" />
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <SimpleLineIcons name="user" size={42} color="black" />

              {showWhichVehicle()}
            </View>
          </View>

          <View style={styles.contactContainer}>
            <Ionicons
              name="call"
              size={20}
              color="black"
              style={{ borderWidth: 0.8, padding: 5, borderRadius: 16 }}
            />
            <View
              style={{
                borderWidth: 0.2,
                margin: 10,
                padding: 4,
                paddingHorizontal: 16,
                borderRadius: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput style={{ fontSize: 14 }}>
                Message your driver..
              </TextInput>
              <Ionicons
                name="arrow-forward-circle"
                size={24}
                color="black"
                style={{ marginLeft: 5 }}
              />
            </View>
          </View>
          <Text style={{ fontSize: 14, textAlign: "center" }}>
            Pickup Point :
          </Text>
          <Text style={styles.pickUpText}> {destinations?.length ? destinations[0].name : 'Tower11, Godrej society, Wakad'}</Text>
          
          {
            cancelReasonModal && <CancelReasonsModal setDistance={setDistance} clearDestinations={clearDestinations} setShow={setShow}/>
          }
          

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={()=>setCancelReasonModal(true)}
            >
              <Text style={styles.buttonText}> CANCEL </Text>
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}> SUPPORT </Text>
              <MaterialIcons name="support-agent" size={24} color="black" />
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    // justifyContent: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    height: "65%",
    bottom: 0,
    gap: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    borderWidth: 0.3,
    padding: 6,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginVertical: 20,
    flexDirection: "row",
    backgroundColor: "#21D375",
  },
  buttonCancel: {
    borderWidth: 0.3,
    padding: 6,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginVertical: 20,
    flexDirection: "row",
    backgroundColor: "whitesmoke",
  },
  rideContainer: {
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    justifyContent: "space-between",
    padding: 15,
    paddingVertical: 25,
    borderRadius: 12,
  },
  contactContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  pickUpText: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    borderBottomWidth: 0.6,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginHorizontal: 24,
    paddingBottom: 4,
  },
  rideText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  imgAuto: {
    height: 45,
    width: 45,
    marginBottom: 4,
    marginRight: 20,

    padding: 20,
  },
});
