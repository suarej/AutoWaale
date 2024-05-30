import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { DB, FIREBASE_STORAGE } from "../firebaseConfig";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { AntDesign } from "@expo/vector-icons";

export default function UploadModal(props) {
  const { setImage, modalVisible, closeModal } = props;

  const uploadImageAndStoreURL = async (uri) => {
    const storage = getStorage();
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileName = uri.split("/").pop();
    const storageRef = ref(storage, `profileImages/${fileName}`);
    const metadata = {
      contentType: 'image/jpeg',
    };

    await uploadBytes(storageRef, blob, metadata).then((snapshot) => {
      console.log("Uploaded the image!");
    });

    await getDownloadURL(
      ref(storage, `profileImages/${fileName}`)
    )
      .then((downloadURL) => {
        setImage(uri, downloadURL, fileName);
      })
      .catch((error) => {
        console.log(error, "error1234");
      });
  };

  const pickImageFromGallery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImageAndStoreURL(result.assets[0].uri);
    }
  };

  const pickImageFromCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={pickImageFromCamera}>
              <View style={styles.profileIcon}>
                <MaterialCommunityIcons
                  name="camera-plus-outline"
                  size={25}
                  color="#21D375"
                />
                <Text> Camera</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImageFromGallery}>
              <View style={styles.profileIcon}>
                <FontAwesome name="photo" size={25} color="#21D375" />
                <Text>Gallery</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal}>
              <View style={styles.profileIcon}>
                <AntDesign name="closesquareo" size={25} color="#21D375" />
                <Text> Close </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
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
    // backgroundColor: "#ffffff",
    // padding: 60,
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    gap: 10,
    // width: 5
  },
  closeModal: {
    backgroundColor: "#e1e1e1",
  },
  profileIcon: {
    backgroundColor: "#e1e1e1",
    borderWidth: 0.5,
    alignItems: "center",
    fontWeight: "bold",
    borderRadius: 5,
    padding: 2
  },
});
