import React, { useContext } from "react";
import { View, StyleSheet, Switch } from "react-native";
import { AppContext } from "../context";

const ThemedButton = () => {
  const { colorScheme, toggleSwitch } = useContext(AppContext);

  return (
    <View style={styles.toggleBox}>
      <Switch
        trackColor={{ false: "#767577", true: "#21D375" }}
        thumbColor="#f5dd4b"
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={colorScheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toggleBox: {},
});

export default ThemedButton;
