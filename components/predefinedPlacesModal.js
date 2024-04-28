import { Modal, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useContext } from "react";
import { AppContext } from "../context";
import { ref, set, update } from "firebase/database";
import { DB } from "../firebaseConfig";

export default function PredefinedPlaces(props) {
  const { modalVisible, closeModal, pageTitle } = props;
  const { setHome, setWork, isUserSignedIn } = useContext(AppContext);
  const key = "AIzaSyDs6dddB4WI6-2C2XIPIRY1Lqdc64BuwZk";

  const handleSetPlace = (details) => {
    const userRef = ref(DB, "users/" + isUserSignedIn + "/profileData");
    if(pageTitle == "Set Home") {
        try {
            update(userRef, {
                home: {
                    description: "Home",
                    geometry: {
                      location: {
                        lat: details?.geometry.location.lat,
                        lng: details?.geometry.location.lng,
                      },
                    },
                  }
              });
            setHome({
                description: "Home",
                geometry: {
                  location: {
                    lat: details?.geometry.location.lat,
                    lng: details?.geometry.location.lng,
                  },
                },
              });
          } catch (error) {
            console.log(error, "error");
          }
    } else {
        try {
            update(userRef, {
                work: {
                    description: "Work",
                    geometry: {
                      location: {
                        lat: details?.geometry.location.lat,
                        lng: details?.geometry.location.lng,
                      },
                    },
                  }
              });
        } catch (err) {
            console.log(err);
        };
        setWork({
            description: "Work",
            geometry: {
              location: {
                lat: details?.geometry.location.lat,
                lng: details?.geometry.location.lng,
              },
            },
          });
    }
    
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={{ flexDirection: "row" }}>
            <Text>{pageTitle}</Text>
            <AntDesign
              name="closesquareo"
              size={25}
              color="#21D375"
              onPress={closeModal}
            />
          </View>
          <GooglePlacesAutocomplete
            placeholder={pageTitle}
            fetchDetails={true}
            onPress={(data, details = null) => {
                handleSetPlace(details);
            }}
            query={{
              key: key,
              language: "en",
              components: "country:in",
            }}
            styles={{
              container: styles.mapTextContainer,
              textInput: styles.input,
              textInputContainer: styles.mapInputContainer,
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mapTextContainer: {
    flex: 1,
    // width: "100%",
    // borderWidth: 1,
  },
  input: {
    marginLeft: 0,
    marginRight: 0,
    // height: 38,
    color: "#5d5d5d",
    fontSize: 16,
  },
  mapInputContainer: {
    borderWidth: 0.5,
    borderRadius: 4,
    // width: "70%",
    marginLeft: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    gap: 10,
  },
});
