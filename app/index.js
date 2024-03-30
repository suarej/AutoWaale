import { StyleSheet, View, Text, Button } from "react-native";
import { useEffect, useState, useRef, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import Loginform from "./loginForm";
import Dashboard from "./dashboard";
import LottieView from "lottie-react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

// SplashScreen.preventAutoHideAsync();

export default function Page() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [user, setUser] = useState();
  const animation = useRef(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, [user]);

  // added timeout to replicate loading so that the loader is showing for 3 seconds
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  // dont know yet how this is working
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);


  // playing spinnner till app is not ready!
  if (!appIsReady) {
    return (
      <View style={styles.animationContainer}>
          <Text style={styles.loaderTitle}> AutoWaale </Text>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 300,
              height: 300,
              backgroundColor: "#FFE302",

            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require("../assets/loaderAnimation.json")}
          />
        </View>
    );
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ExpoStatusBar style="light" backgroundColor="#C0C5CE" />
      {user ? <Dashboard user={user} /> : <Loginform />}
    </View>
  );
}

// animation.current?.reset();
// animation.current?.play();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderTitle: {
    fontWeight: "bold",
    fontSize: 18
  },  
  img: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "center",
    opacity: 0.9,
  },
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
