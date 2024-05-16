import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import globalStyles from "../styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { AppContext } from "../context";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { ref, set } from "firebase/database";
import { DB, FIREBASE_AUTH } from "../firebaseConfig";
import UploadModal from "../components/uploadModal";
import blankP from '../assets/blank_p.png';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons';

export default function Profile() {
  const { colorScheme, userInfo, isUserSignedIn, setUserSignedIn } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  const handleRouteChange = (routeName) => {
    router.push(`profileDetails/${routeName}`);
  };

  const logOut = async () => {
    setUserSignedIn();
    await AsyncStorage.removeItem("uid");
    FIREBASE_AUTH.signOut();
    router.push("/");
  };

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
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

  return (
    <View
      style={[
        globalStyles.container,
        styles.container,
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

      <View>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={openModal} style={{flex: 0}}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={styles.image}
                onError={(error) =>
                  console.error("Image loading error:", error)
                }
              />
            ) : (
              <TouchableOpacity onPress={openModal}>
                <Ionicons name="person-circle-outline" size={90} color="black" />
                <Feather name="camera" size={22} color="black" style={{bottom: 40, left: 65}}/>
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/editPage")} style={styles.infobox}>
            <Text> {userInfo?.name} </Text>
            <View style={styles.userInfoWrap}> 
              <Text>+91 {userInfo?.mobile}</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
              </View>
            <Text> Baner, Pune </Text>
            <Text> {userInfo?.email} </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={styles.title}> App Settings </Text>
        <TouchableOpacity
          onPress={() => router.push("/settingPage")}
          style={styles.infoItems}
        >
        <Ionicons
          name="settings"
          size={24}
          color="black"
        />
          <View style={styles.innerItem}>
            <Text style={styles.details}>Settings</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleRouteChange("safetyPage")}
          style={styles.infoItems}
        >
        <AntDesign name="Safety" size={24} color="black" />
          <View style={styles.innerItem}>
            <Text style={styles.details}>Safety CheckUp !</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleRouteChange("privacy")}
          style={styles.infoItems}
        >
          <Fontisto name="locked" size={24} color="black" />
          <View style={styles.innerItem}>
            <Text style={styles.details}>Privacy</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleRouteChange("pastRides")}
          style={styles.infoItems}
        >
          <FontAwesome5 name="tasks" size={24} color="black" />
          <View style={styles.innerItem}>
            <Text style={styles.details}>Past Rides</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
          <View />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleRouteChange("wallet")}
          style={styles.infoItems}
        >
          <Entypo name="wallet" size={24} color="black" />
          <View style={styles.innerItem}>
            <Text style={styles.details}>Wallets</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleRouteChange("faq")}
          style={styles.infoItems}
        >
          <MaterialCommunityIcons
            name="frequently-asked-questions"
            size={24}
            color="black"
          />
          <View style={styles.innerItem}>
            <Text style={styles.details}>FAQ</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleRouteChange("contactUs")}
          style={styles.infoItems}
        >
          <Ionicons name="call" size={24} color="black" />
          <View style={styles.innerItem}>
            <Text style={styles.details}>Contact Us</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={logOut}>
        <FontAwesome
          name="sign-out"
          size={32}
          color="green"
          style={{ paddingLeft: 15, bottom: -55 }}
        />
        <Text> LogOut </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  userInfoWrap: {
    flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'
  },
  infobox: {
    width: 200, 
    marginLeft: 12,
    borderWidth: 0.2,
    borderRadius: 5
  },
  topContainer: {
    flexDirection: 'row',
    borderWidth: 0.2,
    borderRadius: 8,
    alignItems: 'center',
    padding: 4
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
    padding: 10,
  },
  infoItems: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 12,
    margin: 8,

    padding: 5,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 75,
  },
  innerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 230,
    borderBottomWidth: 0.2,
  },
});
