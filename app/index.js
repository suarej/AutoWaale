import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import Loginform from "./loginForm";
import Dashboard from "./dashboard";

export default function Page() {
  const [user, setUser] = useState();

  useEffect(()=> {
    onAuthStateChanged(FIREBASE_AUTH, (user)=> {
      setUser(user);
    })
  },[user]);

  return (
    <View style={styles.container}>
        {
          user? 
          <Dashboard /> : <Loginform />
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
    resizeMode: 'center',
    justifyContent: 'center',
    opacity: 0.9
  }
});
