import React, { createContext, useState } from 'react';
import { getColorScheme } from "../services/colorScheme";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const colorSchemeDef = getColorScheme();
  const [colorScheme, setColorScheme] = useState(colorSchemeDef);

  const toggleSwitch = () => {
    setColorScheme((previousState) => !previousState);
  };

  return (
    <AppContext.Provider
      value={{
        colorScheme,
        toggleSwitch
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider};
