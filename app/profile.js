import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { logOut } from "../services/signout";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AppContext } from "../context";
const { width } = Dimensions.get("window");
import { DB, FIREBASE_AUTH } from "../firebaseConfig";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import UploadModal from "../components/uploadModal";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { ref, set } from "firebase/database";
import globalStyles from "../styles";

export default function Profile() {
  const { userInfo, isUserSignedIn, setUserSignedIn, colorScheme } =
    useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getImgSource();
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSettingPage = async () => {
    router.push("/settingPage");
  };

  const handleEditpage = async () => {
    router.push("/editPage");
  };

  const setAndStoreImage = (imgUri, downloadURL, fileName) => {
    setImage(imgUri);
    // const newPostKey = push(child(ref(DB), "users")).key;
    const userRef = ref(DB, "users/" + isUserSignedIn + "/profileData");

    try {
      set(userRef, {
        profileImgUrl: downloadURL || "",
        fileName: fileName || "",
      });
    } catch (error) {
      console.log(error, "error");
    }
  };

  const getImgSource = () => {
    let imgUriFromDB = userInfo?.profileData?.profileImgUrl;
    if (imgUriFromDB) {
      setImage(imgUriFromDB);
    } else {
      setImage();
    }
  };

  return (
    <View
      style={[
        globalStyles.container,
        colorScheme ? globalStyles.lightTheme : globalStyles.darkTheme,
      ]}
    >
      {modalVisible && (
        <UploadModal
          modalVisible={modalVisible}
          closeModal={closeModal}
          setImage={setAndStoreImage}
        />
      )}
      
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={openModal}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.image}
              onError={(error) => console.error("Image loading error:", error)}
            />
          ) : (
            <Ionicons name="person-circle" size={114} color="black" />
          )}

          <TouchableOpacity style={styles.editButton}>
            {!image && (
              <Feather
                name="camera"
                size={22}
                color="black"
                style={{ top: -32, left: 90 }}
              />
            )}
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={styles.basicInfo}>
          <Text> Personal Information </Text>
          <FontAwesome
            name="edit"
            size={24}
            color="black"
            onPress={handleEditpage}
          />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItems}>
            <FontAwesome6 name="user-large" size={24} color="#21D375" />
            <Text style={styles.details}>{userInfo?.name}</Text>
          </View>
          <View style={styles.infoItems}>
            <MaterialCommunityIcons name="phone" size={24} color="#21D375" />
            <Text style={styles.details}> {userInfo?.mobile}</Text>
          </View>
          <View style={styles.infoItems}>
            <Zocial name="email" size={24} color="#21D375" />
            <Text style={styles.details}> {userInfo?.email} </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    borderWidth: 0.2,
    gap: 14,
    padding: 20,
    margin: 20
  },
  infoItems: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 12

  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 35,
    alignItems: "center",
  },
  basicInfo: {
    color: "black",
    // fontWeight: "bold",
    fontSize: 12,
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 150,
  },
  titleName: {
    // fontWeight: "bold",
    fontSize: 15,
    left: 20,
    top: 20,
  },
  details: {
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 35,
    padding: 22,
  },
});
