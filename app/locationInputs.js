import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { AppContext } from "../context";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import SwitchModal from "../components/switchModal";
import SchedulerModal from "../components/schedulerModal";

const HomeIcon = () => <Ionicons name="home" size={24} color="black" />;
const WorkIcon = () => <Ionicons name="briefcase" size={24} color="black" />;

// navigator.geolocation = require("react-native-geolocation-service");

export default function LocationInputs(props) {
  const { handleSetDestination, setShow, placeName, calculateDistance } = props;
  const { home, work, userInfo } = useContext(AppContext);
  const [modalSwitch, setModalSwitch] = useState(false);
  const [modalScheduler, setModalScheduler] = useState(false);
  const [pickUptime, setPickUptime] = useState([]);

  const [rider, setRider] = useState("me");

  const key = "AIzaSyDs6dddB4WI6-2C2XIPIRY1Lqdc64BuwZk";

  const openSchedulerModal = () => {
    setModalScheduler(true);
  };

  const closeScheduler = () => {
    setModalScheduler(false);
  };

  const openSwitchRider = () => {
    setModalSwitch(true);
  };
  const closeSwitchRider = () => {
    setModalSwitch(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuIcon}
        onPress={() => router.push("/copyProfile")}
      >
        <MaterialCommunityIcons name="menu" size={32} color="black" />
      </TouchableOpacity>

      {modalSwitch && (
        <SwitchModal
          rider={rider}
          setRider={setRider}
          closeSwitchRider={closeSwitchRider}
          userInfo={userInfo}
        />
      )}
      {modalScheduler && (
        <SchedulerModal
          closeScheduler={closeScheduler}
          setPickUptime={setPickUptime}
        />
      )}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.forMeButton,
              { width: pickUptime?.length ? "auto" : 130 },
            ]}
            onPress={openSchedulerModal}
          >
            <AntDesign name="clockcircleo" size={16} color="black" />
            {pickUptime?.length ? (
              <Text style={{ fontSize: 13, fontWeight: 600 }}>
                {" "}
                {pickUptime[0]} -{"\u2192"}
                {pickUptime[1]}{" "}
              </Text>
            ) : (
              <Text style={{ fontSize: 13, fontWeight: 600 }}>
                {" "}
                Pickup Time{" "}
              </Text>
            )}
            <AntDesign name="caretdown" size={11} color="black" />
          </TouchableOpacity>
          {!pickUptime?.length && (
            <TouchableOpacity
              style={styles.forMeButton}
              onPress={openSwitchRider}
            >
              <Feather name="user" size={16} color="black" />
              <Text style={{ fontSize: 13, fontWeight: 600 }}>
                {" "}
                for {rider}{" "}
              </Text>
              <AntDesign name="caretdown" size={11} color="black" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.inputContainer}>
          <AntDesign
            name="rightcircleo"
            size={20}
            color="green"
            style={styles.icon}
          />
          <GooglePlacesAutocomplete
            placeholder={placeName}
            onPress={(data, details = null) => {
              handleSetDestination(details, data);
            }}
            query={{
              key: key,
              language: "en",
              components: "country:in",
            }}
            fetchDetails={true}
            styles={{
              textInputContainer: styles.autocompleteContainer,
              textInput: styles.input,
              listView: styles.listView,
            }}
          />
          <AntDesign
            name="search1"
            size={20}
            color="black"
            style={styles.icon2}
          />
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            onPress={(data, details = null) => {
              handleSetDestination(details);
              setShow("");
            }}
            query={{
              key: key,
              language: "en",
              components: "country:in",
            }}
            fetchDetails={true}
            styles={{
              textInputContainer: styles.autocompleteContainer,
              textInput: styles.input,
              listView: styles.listView,
            }}
            predefinedPlaces={
              userInfo?.profileData?.home &&
              Object.keys(userInfo?.profileData?.home)?.length !== 0
                ? [userInfo?.profileData?.home, userInfo?.profileData?.work]
                : []
            }
          />
        </View>
      </View>

      <TouchableOpacity
        style={{ justifyContent: "center", marginLeft: 4, top: 14 }}
        onPress={() => setShow("multiple")}
      >
        <AntDesign name="pluscircleo" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 16,
    flexDirection: "row",
  },
  forMeButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    width: 130,
    justifyContent: "space-between",
    backgroundColor: "#EEEEEE",
    borderRadius: 30,
    padding: 6,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  inputContainer: {
    // flexDirection: 'row',
    flex: 1,
    marginBottom: 0,
    position: "relative",
    borderWidth: 0.5,
    padding: 6,
    borderRadius: 12,
    // width: '100%'
  },
  icon: {
    position: "absolute",
    left: 14,
    top: 16,
    zIndex: 1,
    marginRight: 10,
  },
  icon2: {
    position: "absolute",
    left: 16,
    top: 60,
    zIndex: 1,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 0.2,
    borderRadius: 5,
    paddingLeft: 40,
    zIndex: 0,
  },
  autocompleteContainer: {
    // marginBottom: 16,
  },
  listView: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 10,
  },
  menuIcon: {
    justifyContent: "center",
    marginRight: 4,
    top: 14,
  },
});

// renderItem={(row) => (
//   <TouchableOpacity
//     style={styles.itemContainer}
//     onPress={() => onPressItem(row.item)}
//   >
//     <View style={styles.iconContainer}>
//       {row.item.description == "Home" && <HomeIcon />}
//       {row.item.description == "Work" && <WorkIcon />}
//     </View>
//     <Text style={styles.itemText}>{row.item.description}</Text>
//   </TouchableOpacity>
// )}
// predefinedPlaces={
//   Object.keys(userInfo?.profileData?.home).length !== 0
//     ? [userInfo?.profileData?.home, userInfo?.profileData?.work]
//     : []
// }
