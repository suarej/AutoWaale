import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { logOut } from "../services/signout";
import Riskhaw from "../assets/ricksaw.png";
import { router } from "expo-router";

export default function Header(props) {
  const { userInfo } = props;
  var firstName = userInfo?.name.split(" ").slice(0, 1).join(" ");

  const handleGoToProfile = () => {
    router.push("/profile");
  };

  return (
    <View style={styles.header}>
      <Image source={Riskhaw} style={styles.rikshawiamge}></Image>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text> Hello {firstName || ""}, </Text>
        <TouchableOpacity onPress={handleGoToProfile}>
          <FontAwesome name="user-circle-o" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: 16,
    marginRight: 16,
    padding: 4
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
    height: 40,
    width: 50,
  },
});
