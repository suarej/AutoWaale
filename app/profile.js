import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { logOut } from "../services/signout";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useContext } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { AppContext } from "../context";
const { width } = Dimensions.get("window");
import { FIREBASE_AUTH } from "../firebaseConfig";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const {userInfo, isUserSignedIn, setUserSignedIn} = useContext(AppContext);

  const logOut = async() => {
    setUserSignedIn();
    await AsyncStorage.removeItem('uid');
    FIREBASE_AUTH.signOut();
    router.push("/");
  };
  
  return (
    <>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="user-edit" size={55} color="black" />
        <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}} onPress={logOut}>
          <FontAwesome name="sign-out" size={32} color="black" style={{paddingLeft: 15}}/>
          <Text> LogOut </Text>
        </TouchableOpacity>
        
        <Text style={styles.basicInfo}> Profile Info </Text>
        <View style={styles.container}>
          <View style={styles.basicInfoContainer}>
            <View style={[styles.underlineDetails, { width: width * 0.8 }]}>
              <Text style={styles.titleName}> Name:</Text>
              <Text style={styles.details}>{userInfo.name}</Text>
              <AntDesign
                name="edit"
                size={24}
                color="black"
                style={{ position: "absolute", right: 20, top: 30 }}
              />
            </View>
            <View style={[styles.underlineDetails, { width: width * 0.8 }]}>
              <Text style={styles.titleName}> Phone :</Text>
              <Text style={styles.details}> {userInfo.mobile}</Text>
              <AntDesign
                name="edit"
                size={24}
                color="black"
                style={{ position: "absolute", right: 20, top: 30 }}
              />
            </View>
            <View style={[styles.underlineDetails, { width: width * 0.8 }]}>
              <Text style={styles.titleName}> Email:</Text>
              <Text style={styles.details}> {userInfo.email}</Text>
              <AntDesign
                name="edit"
                size={24}
                color="black"
                style={{ position: "absolute", right: 20, top: 30 }}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 35,
    alignItems: "center",
  },
  basicInfo: {
    color: "black",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 40,
    marginTop: 10
  },
  titleName: {
    fontWeight: "bold",
    fontSize: 15,
  },
  details: {
    fontSize: 18,
    borderBottomWidth: 0.8,
    borderBottomColor: "#777B7E",
  },
  underlineDetails: {
    paddingVertical: 12,
  },
  basicInfoContainer: {
    // marginBottom: 60,
  },
});
