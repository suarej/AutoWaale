import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState, useRef, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import Loginform from "./loginForm";
import Dashboard from "./dashboard";
import LottieView from "lottie-react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getDatabase, ref, child, get } from "firebase/database";

// SplashScreen.preventAutoHideAsync();

export default function Page() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [user, setUser] = useState();
  const [userInfo, setUserInfo] = useState();
  const animation = useRef(null);
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      user && getCurrentUSer(user?.uid);
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
          source={require("../assets/loaderAnimation.json")}
        />
      </View>
    );
  }

  function getCurrentUSer(userId) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserInfo(snapshot.val());
        } else {
          console.log("No data availabl");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <GestureHandlerRootView>
        <ExpoStatusBar style="light" backgroundColor="#C0C5CE" />
        {user ? (
          <Dashboard user={user} userInfo={userInfo} />
        ) : (
          <Loginform />
        )}
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderTitle: {
    fontWeight: "bold",
    fontSize: 18,
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
  toggleBox: {
    // position: 'absolute',
    // top: 0,
    // right: 20,
    backgroundColor: '#C0C5CE',
    paddingRight: 20
  },
});
