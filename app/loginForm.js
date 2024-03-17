import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import auti from "../assets/auti.jpeg";

export default function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

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
    <View style={styles.inputContainer}>
      <ImageBackground source={auti} style={styles.sign}>
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
            <View style={styles.buttons}>
              <Button title="Login" onPress={signIn} />
              <Button title="Create account" onPress={signUp} />
            </View>
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    borderWidth: 0.5,
    height: "100%",
    justifyContent: "center",
    gap: 7,
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
    borderRadius: 5,
  },
  buttons: {
    gap: 8,
  },
});
