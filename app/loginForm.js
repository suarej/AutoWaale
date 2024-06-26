import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontSizePicker from "../components/fontSizePicker";
import GoogleSignIn from "../components/googleSignIn";
import globalStyles from '../styles';

export default function Loginform(props) {
  const { colorScheme, setUser, user, fontSize } = useContext(AppContext);
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
      await AsyncStorage.setItem('uid', response.user.uid);
      if(response.user) {
        router.push('/');
      }
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
    <View style={[globalStyles.container, colorScheme ? globalStyles.lightTheme : globalStyles.darkTheme]}>
      <Image source={Rikshaw} style={styles.logo} />
      <TextInput
        value={email}
        style={[styles.inputWrapper, {fontSize}]}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput
        secureTextEntry={true}
        value={password}
        style={[styles.inputWrapper, {fontSize}]}
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
            <Text style={{fontSize}}>Forgot password?</Text>
          </TouchableOpacity>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={signIn} style={styles.button}>
              <Text style={[styles.textBold, {fontSize}]}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signUp} style={styles.button}>
              <Text style={[styles.textBold, {fontSize}]}>SIGN UP</Text>
            </TouchableOpacity>
            {/* <GoogleSignIn /> */}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    // borderBottomWidth: 0.5,
    padding: 7,
    width: "70%",
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
    paddingHorizontal: 50,
  },
  textBold: {
    // fontSize: 15,
    fontWeight: "bold",
  },
  forgotButton: {
    borderBottomWidth: 0.5,
  },
});
