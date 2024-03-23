import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import backsignup from "../assets/auti.jpeg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { DB, FIREBASE_AUTH } from "../firebaseConfig";
import { ref, set } from "firebase/database";
import { useState } from "react";
import {router} from 'expo-router';

export default function SignUp() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    city: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    mobile: false,
    password: false,
    confirmPassword: false
  });
  const [loading, setisLoading] = useState(false);

  const handleChange = (fieldName, value) => {
    setUserData({ ...userData, [fieldName]: value });
  };

  const handleFormErrors = (fieldName, value) => {
    setFormErrors({ ...formErrors, [fieldName]: value });
  }

  const createUserinDB = async () => {
     if (userData.password !== userData.confirmPassword) {
      setError("Passwords don't match");
      return;
    } else {
        setisLoading(true);
      try {
        await createUserWithEmailAndPassword(
          FIREBASE_AUTH,
          userData.email,
          userData.password
        )
          .then((res) => {
            set(ref(DB, "users/" + res?.user.uid), {
              email: userData?.email,
              name: userData?.name,
              city: userData?.city || "",
              mobile: userData?.mobile,
              createdAt: new Date().toUTCString(),
            });
            alert("Account created");
            router.push('/loginForm');
          })
          .catch((err) => alert(err.message, "Error"));
      } catch (error) {
        alert("Sign up failed: " + error.message);
      } finally{
        setisLoading(false);
      }
    }
  };

  return (
    <View style={styles.mainComponent}>
      <ImageBackground source={backsignup} style={styles.signImg}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> :  
      <> 
        <Text style={styles.boldText}>Plan Your Ride!!</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Name*"
            value={userData.name}
            onChangeText={(text) => handleChange("name", text)}
            style={styles.inputText}
          />
          {formErrors.name && (
            <View style={styles.errorBlock}>
              <Text style={styles.errorText}> Required* </Text>
            </View>
          )}
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Email*"
            value={userData.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            style={styles.inputText}
          />
          {formErrors.name && (
            <View style={styles.errorBlock}>
              <Text style={styles.errorText}> Required* </Text>
            </View>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="City"
            value={userData.city}
            onChangeText={(text) => handleChange("city", text)}
            style={styles.inputText}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Mobile No*"
            value={userData.mobile}
            onChangeText={(text) => handleChange("mobile", text)}
            style={styles.inputText}
          />
          {formErrors.name && (
            <View style={styles.errorBlock}>
              <Text style={styles.errorText}> Required* </Text>
            </View>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Password*"
            value={userData.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={true}
            style={styles.inputText}
          />
          {formErrors.name && (
            <View style={styles.errorBlock}>
              <Text style={styles.errorText}> Required* </Text>
            </View>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Confirm Password*"
            value={userData.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            secureTextEntry={true}
            style={styles.inputText}
          />
          {formErrors.name && (
            <View style={styles.errorBlock}>
              <Text style={styles.errorText}> Required* </Text>
            </View>
          )}
        </View>
        {
        userData?.name &&
        userData?.email &&
        userData?.mobile &&
        userData.password &&
        userData.confirmPassword ? (
          <TouchableOpacity
            style={styles.registerButton}
            onPress={createUserinDB}
          >
            <Text style={styles.buttonTextRegister}>SIGN UP</Text>
          </TouchableOpacity>
        ) : 
        (
          <TouchableOpacity
            style={styles.disabledButton}
            onPress={createUserinDB}
            disabled={true}
          >
            <Text style={styles.disabledText}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        )}
        </>
    }   
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainComponent: {
    // alignItems: "center",
    // borderWidth: 0.5,
    // height: "100%",
    // justifyContent: "center",
    // gap: 7,
  },
  signImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    gap: 13,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF",
  },
  inputWrapper: {
    // backgroundColor: "#e1e1e1",
    // borderBottomWidth: 0.5,
    // padding: 5,
    width: "70%",
    // fontSize: 12,
    // borderRadius: 5,
  },
  errorBlock: {
    // backgroundColor: "#000000",
  },
  errorText: {
    textAlign: "left",
    color: "#D04848",
    fontSize: 12
  },
  inputText: {
    backgroundColor: "#e1e1e1",
    borderBottomWidth: 0.5,
    padding: 7,
    // width: "70%",
    fontSize: 16,
    borderRadius: 5,
  },
  buttonTextRegister: {
    color: "#FFFFFF",
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  registerButton: {
    // borderWidth: 1,
    padding: 14,
    width: "50%",
    marginBottom: 40,
    backgroundColor: "#068FFF",
    marginTop: 16,
    borderRadius: 5,
  },
  disabledButton: {
    // borderWidth: 1,
    padding: 10,
    width: "50%",
    marginBottom: 40,
    backgroundColor: "#E3E1D9",
    marginTop: 14,
    borderRadius: 5,
  },
  disabledText: {
    color: "#000000",
    opacity: 0.3,
    textAlign: 'center',
    fontSize: 18
  },
});
