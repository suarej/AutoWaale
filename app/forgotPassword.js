import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";

export default function ForgotButton() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.inputBox}
      />
      {message && <Text>{message}</Text>}
      {/* <Button title="Reset Password" onPress={handleResetPassword} /> */}
      <TouchableOpacity onPress={handleResetPassword} style={styles.button}>
        <Text style={styles.textBold}>RESET PASSWORD</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 20,
    width: "80%",
    borderRadius: 8,
  },
  button: {
    borderRadius: 25,
    backgroundColor: "#21D375",
    padding: 10,
    paddingHorizontal: 40,
  },
  textBold: {
    fontSize: 13,
    fontWeight: "bold",
  },
});
