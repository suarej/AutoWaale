import { FIREBASE_AUTH } from "../firebaseConfig";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logOut = async (uid) => {
    await AsyncStorage.removeItem('GryVjbOsO7byDFCV5HVrLt9aE712');
    FIREBASE_AUTH.signOut();
    router.push("/");
  };