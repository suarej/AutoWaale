import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontSizePicker from "../components/fontSizePicker";
import ThemedButton from "../components/themeButton";
import { useContext, useState } from "react";
import { AppContext } from "../context";
import globalStyles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PredefinedPlaces from "../components/predefinedPlacesModal";


export default function SettingPage() {
  const { colorScheme, home } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View
      style={[
        styles.container,
        colorScheme ? globalStyles.lightTheme : globalStyles.darkTheme,
      ]}
    >
    {modalVisible && (
        <PredefinedPlaces
          modalVisible={modalVisible}
          closeModal={closeModal}
          pageTitle={pageTitle}
        />
      )}
      <TouchableOpacity style={styles.infoItems} onPress={()=>{openModal(), setPageTitle("Set Home")}}>
        <Ionicons name="home" size={24} color="black" />
        <View style={styles.innerItem}>
          <Text style={styles.details}>Home </Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoItems} onPress={()=>{openModal(), setPageTitle("Add Work")}}>
        <Ionicons name="briefcase" size={24} color="black" />
        <View style={styles.innerItem}>
          <Text style={styles.details}>Work</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <FontSizePicker />
      <ThemedButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoItems: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 12,
    margin: 8,

    padding: 5,
  },
  innerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 230,
  },
});
