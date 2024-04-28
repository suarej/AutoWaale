import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { DB, FIREBASE_AUTH } from "../firebaseConfig";
import { ref, set } from "firebase/database";
import { useContext, useRef, useState } from "react";
import { router } from "expo-router";
import ThemedButton from "../components/themeButton";
import { AppContext } from "../context";
import { Picker } from "@react-native-picker/picker";
import FontSizePicker from "../components/fontSizePicker";
import globalStyles from '../styles';

export default function SignUp() {
  const { colorScheme } = useContext(AppContext);

  const [loading, setisLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedValue, setSelectedValue] = useState("Pune");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [nameError, setNameError] = useState("");

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email cannot be empty.");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!password.trim()) {
      setPasswordError("Password cannot be empty.");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be minimum 8 characters and a combination of uppercase, lowercase, number and character"
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateMobileNumber = () => {
    if (!mobileNumber.trim()) {
      setMobileNumberError("Mobile number cannot be empty.");
      return false;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      setMobileNumberError("Please enter a valid mobile number.");
      return false;
    }
    setMobileNumberError("");
    return true;
  };

  const validateName = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name.trim()) {
      setNameError("Name cannot be empty.");
      return false;
    }
    if (!nameRegex.test(name)) {
      setNameError("Invalid Name");
      return false;
    }
    setNameError("");
    return true;
  };

  const createUserinDB = async () => {
    if (
      validateName() &&
      validateEmail() &&
      validatePassword() &&
      validateMobileNumber()
    ) {
      setisLoading(true);
      try {
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
          .then((res) => {
            set(ref(DB, "users/" + res?.user.uid), {
              email: email,
              name: name,
              city: city || "",
              mobile: mobileNumber,
              createdAt: new Date().toUTCString(),
            });
            alert("Account created");
            router.push("/loginForm");
          })
          .catch((err) => alert(err.message, "Error"));
      } catch (error) {
        alert("Sign up failed: " + error.message);
      } finally {
        setisLoading(false);
      }
    }
  };

  return (
    <View style={[globalStyles.container, colorScheme ? globalStyles.lightTheme : globalStyles.darkTheme]}>
      <ImageBackground style={styles.signImg}>
        <ThemedButton />
        <FontSizePicker />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Text style={styles.boldText}>Plan Your Ride!!</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Name*"
                value={name}
                onChangeText={setName}
                style={styles.inputText}
              />
              {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Email*"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.inputText}
              />
              {emailError ? (
                <Text style={styles.error}>{emailError}</Text>
              ) : null}
            </View>
            <View style={styles.inputWrapper}>
              <Picker
                selectedValue={selectedValue}
                style={styles.dropdown}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item label="City" value="" />
                <Picker.Item label="Pune" value="option1" style={{fontSize: 12}}/>
                <Picker.Item label="Mumbai" value="option2" />
                <Picker.Item label="Nagpur" value="option3" />
              </Picker>
            </View>
            <View style={styles.inputWrapperMobile}>
              <TextInput
                style={styles.countryCode}
                value="+91"
                editable={false}
              />
              <TextInput
                style={styles.phoneNumber}
                placeholder="Mobile*"
                keyboardType="phone-pad"
                value={mobileNumber}
                onChangeText={setMobileNumber}
              />
              {mobileNumberError ? (
                <Text style={styles.error}>{mobileNumberError}</Text>
              ) : null}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Password*"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.inputText}
              />
              {passwordError ? (
                <Text style={styles.error}>{passwordError}</Text>
              ) : null}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Confirm Password*"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                style={styles.inputText}
              />
            </View>
            {name && email && mobileNumber && password && confirmPassword ? (
              <TouchableOpacity
                style={styles.registerButton}
                onPress={createUserinDB}
              >
                <Text style={styles.buttonTextRegister}>SIGN UP</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.disabledButton}
                onPress={createUserinDB}
                disabled={true}
              >
                <Text style={styles.disabledText}>SIGN UP</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: "65%",
  },
  inputWrapperMobile: {
    flexDirection: "row",
    width: "65%",
  },
  errorBlock: {
    // backgroundColor: "#000000",
  },
  errorText: {
    textAlign: "left",
    color: "#D04848",
    fontSize: 12,
  },
  inputText: {
    backgroundColor: "#e1e1e1",
    padding: 7,
    // width: "70%",
    fontSize: 12,
    borderRadius: 8,
  },
  inputTextMobile: {
    backgroundColor: "e1e1e1",
    fontSize: 16,
  },
  buttonTextRegister: {
    color: "#000000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerButton: {
    // borderWidth: 1,

    width: "50%",
    marginBottom: 40,
    backgroundColor: "#21D375",
    marginTop: 16,
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: 40,
  },
  disabledButton: {
    // borderWidth: 1,
    padding: 8,
    width: "40%",
    marginBottom: 30,
    backgroundColor: "#E3E1D9",
    marginTop: 12,
    borderRadius: 30,
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
  disabledText: {
    color: "#000000",
    opacity: 0.3,
    textAlign: "center",
    fontSize: 18,
  },
  dropdown: {
    backgroundColor: "#e1e1e1",
    borderRadius: 5
  },
  countryCode: {
    // flex: 1,
    // marginRight: 10,
    // paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    backgroundColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 5,
  },
  phoneNumber: {
    flex: 3,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    backgroundColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 5,
  },
});
