import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import Rikshaw from "../assets/ricksaw.png";
import { AppContext } from "../context";
import ThemedButton from "../components/themeButton";

export default function Loginform(props) {
  const {colorScheme} = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleForgotpassword = () => {
    router.push("/forgotPassword");
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    router.push("/signUp");
  };

  return (
    <View style={colorScheme ? styles.inputContainer : styles.darkContainer}>
      <ThemedButton />
      <Image source={Rikshaw} style={styles.logo} />
      <TextInput
        value={email}
        style={styles.inputWrapper}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput
        secureTextEntry={true}
        value={password}
        style={styles.inputWrapper}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity
            onPress={handleForgotpassword}
            style={styles.forgotButton}
          >
            <Text>Forgot password?</Text>
          </TouchableOpacity>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={signIn} style={styles.button}>
              <Text style={styles.textBold}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signUp} style={styles.button}>
              <Text style={styles.textBold}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    gap: 7,
    backgroundColor: "#C0C5CE",
  },
  logo: {
    width: 70,
    height: 70,
  },
  sign: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  inputWrapper: {
    backgroundColor: "#e1e1e1",
    borderBottomWidth: 0.5,
    padding: 7,
    width: "70%",
    fontSize: 15,
    borderRadius: 8,
  },
  buttons: {
    gap: 8,
    marginTop: 8,
    borderRadius: 25,
  },
  button: {
    borderRadius: 25,
    backgroundColor: "#21D375",
    padding: 10,
    paddingHorizontal: 40,
  },
  textBold: {
    fontSize: 15,
    fontWeight: "bold",
  },
  darkContainer: {
    backgroundColor: "#26282A",
    alignItems: "center",
    borderWidth: 0.5,
    height: "100%",
    justifyContent: "center",
    gap: 7,
  },
  forgotButton: {
    borderBottomWidth: 0.5,
  },
});
