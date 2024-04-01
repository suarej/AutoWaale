import { FIREBASE_AUTH } from "../firebaseConfig";
import { router } from "expo-router";

export const logOut = () => {
    router.push("/");
    FIREBASE_AUTH.signOut();
  };