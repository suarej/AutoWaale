import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AppContext } from "../context";
import { Entypo } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const FontSizePicker = () => {
  const { fontSize, changeFontSize } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={{fontSize}}> Sample Text! </Text>
      <Slider
        value={fontSize}
        onValueChange={changeFontSize}
        style={{ width: 200, height: 40 }}
        minimumValue={8}
        maximumValue={26}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        thumbTintColor="#21D375"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // bottom: 150,
    // width: 200,
    // height: 50,
    // paddingBottom: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FontSizePicker;
