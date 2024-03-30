import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { logOut } from "../services/signout";
import Riskhaw from "../assets/ricksaw.png";

export default function Header() {
  return (
    <View style={styles.header}>
      {/* <FontAwesome5 name="car-side" size={32} color="black" /> */}
      <Image source={Riskhaw} style={styles.rikshawiamge}></Image>
      <TouchableOpacity onPress={logOut}>
        <FontAwesome name="user-circle-o" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: 16,
    marginRight: 16,
    // paddingBottom: 4
  },
  carDrive: {
    height: 50,
    width: 80,
  },
  profileImg: {
    height: 50,
    width: 50,
  },

  rikshawiamge: {
    height:40,
    width: 50,
  }
});
