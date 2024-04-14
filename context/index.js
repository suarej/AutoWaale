import React, { createContext, useEffect, useState } from "react";
import { getColorScheme } from "../services/colorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const colorSchemeDef = getColorScheme();
  const [colorScheme, setColorScheme] = useState(colorSchemeDef);
  const [userInfo, setUserInfo] = useState();
  const [user, setUser] = useState();
  const [isUserSignedIn, setUserSignedIn] = useState();
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    // Load font size from AsyncStorage on app start
    const loadFontSize = async () => {
      try {
        const savedFontSize = await AsyncStorage.getItem("fontSize");
        if (savedFontSize) {
          setFontSize(parseInt(savedFontSize));
        }
      } catch (error) {
        console.error("Error loading font size:", error);
      }
    };

    loadFontSize();
  }, []);

  const changeFontSize = async (newSize) => {
    setFontSize(newSize);
    try {
      // Save new font size to AsyncStorage
      await AsyncStorage.setItem("fontSize", newSize.toString());
    } catch (error) {
      console.error("Error saving font size:", error);
    }
  };

  const toggleSwitch = () => {
    setColorScheme((previousState) => !previousState);
  };

  return (
    <AppContext.Provider
      value={{
        colorScheme,
        toggleSwitch,
        userInfo,
        setUserInfo,
        user,
        setUser,
        isUserSignedIn,
        setUserSignedIn,
        fontSize,
        changeFontSize,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
