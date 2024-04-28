import { useContext, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { AppContext } from "../context";
import { child, get, getDatabase, ref, set, update } from "firebase/database";
import { DB } from "../firebaseConfig";
import { router } from "expo-router";
import globalStyles from '../styles';

export default function EditPage() {
  const { userInfo, isUserSignedIn, setUserInfo, colorScheme } = useContext(AppContext);
  const [name, setName] = useState(userInfo?.name);
  const [mobile, setMobile] = useState(userInfo?.mobile);
  const [email, setEmail] = useState(userInfo?.email);
  const [city, setCity] = useState(userInfo?.city);
  const [loading, setLoading] = useState(false);

  const udpateUserInfo =async () => {
    setLoading(true);
    const userRef = ref(DB, "users/" + isUserSignedIn);
    try {
      update(userRef, {
        name: name || userInfo?.name,
        email: email || userInfo?.email,
        city: city || userInfo?.city,
        mobile: mobile || userInfo?.mobile,
      });
      const dbRef = ref(getDatabase());
      await get(child(dbRef, `users/${isUserSignedIn}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserInfo(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      const timeoutId = setTimeout(() => {
        router.push("/profile");
      }, 1000);
      setLoading(false);
      return () => clearTimeout(timeoutId);
      
    }
  };

  return (
    <View style={[styles.editContainer, colorScheme ? globalStyles.lightTheme : globalStyles.darkTheme]}>
      <View style={styles.editPage}>
        <TextInput
          placeholder="Name"
          style={styles.nameEdit}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Phone"
          style={styles.nameEdit}
          value={mobile}
          onChangeText={setMobile}
        />
        <TextInput
          placeholder="Email"
          style={styles.nameEdit}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="City"
          style={styles.nameEdit}
          value={city}
          onChangeText={setCity}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={udpateUserInfo}>
            <Text style={styles.buttonText}> Update Profile </Text>      
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  editContainer: {
    flex: 1
  },
  editPage: {
    marginTop: 35,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 50,
  },
  nameEdit: {
    borderWidth: 0.5,
    paddingHorizontal: 15,
    paddingVertical: 12,
    width: "100%",
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    fontSize: 15
  },
  button: {
    backgroundColor: "#21D375",
    alignItems: "center",
    width: "70%",
    borderRadius: 45,
    // paddingHorizontal: 35,
    paddingVertical: 10,
    marginTop: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    
  },
});
