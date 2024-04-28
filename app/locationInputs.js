import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AppContext } from "../context";

const HomeIcon = () => <Ionicons name="home" size={24} color="black" />;
const WorkIcon = () => <Ionicons name="briefcase" size={24} color="black" />;

navigator.geolocation = require("react-native-geolocation-service");

export default function LocationInputs(props) {
  const { handleSetOrigin, handleSetDestination, handleSearch } = props;
  const { home, work, userInfo } = useContext(AppContext);
  const key = "AIzaSyDs6dddB4WI6-2C2XIPIRY1Lqdc64BuwZk";

  const onPressItem = (selectedItem) => {
    // Do something with the selected item, such as saving it to state or navigating to a new screen
    console.log("Selected item:", selectedItem);
  };

  return (
    <View style={styles.searchContainer}>
      <Text style={styles.getRideBold}> GET A RIDE </Text>
      <GooglePlacesAutocomplete
        currentLocation={true}
        currentLocationLabel="Your location"
        placeholder={"Pickup location"}
        fetchDetails={true}
        onPress={(data, details = null) => {
          handleSetOrigin(details);
        }}
        query={{
          key: key,
          language: "en",
          components: "country:in",
        }}
        styles={{
          container: styles.mapTextContainer,
          textInput: styles.input,
          textInputContainer: styles.mapInputContainer,
        }}
        // predefinedPlaces={
        //   Object.keys(userInfo?.profileData?.home).length !== 0
        //     ? [userInfo?.profileData?.home, userInfo?.profileData?.work]
        //     : []
        // }
      />
      <GooglePlacesAutocomplete
        styles={{
          container: styles.mapTextContainer,
          textInput: styles.input,
          textInputContainer: styles.mapInputContainer,
        }}
        placeholder="Dropoff location"
        fetchDetails={true} // to search lat long
        onPress={(data, details = null) => {
          handleSetDestination(details);
        }}
        query={{
          key: key,
          language: "en",
        }}
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
        predefinedPlaces={
          Object.keys(userInfo?.profileData?.home).length !== 0
            ? [userInfo?.profileData?.home, userInfo?.profileData?.work]
            : []
        }
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}> BOOK AUTO </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  iconContainer: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
  mapTextContainer: {
    flex: 1,
    // width: "100%",
    // borderWidth: 1,
  },
  input: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: "#5d5d5d",
    fontSize: 16,
  },
  mapInputContainer: {
    // backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 1,
    borderRadius: 7,
    width: "90%",
    marginLeft: 20,
  },
  searchContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight + 6,
    borderWidth: 0.5,
    gap: 6,
  },
  getRideBold: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 15,
  },
  searchButton: {
    backgroundColor: "#21D375",
    borderRadius: 25,
    paddingVertical: 12,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    textAlign: "center",
    color: "#000000",
    borderRadius: 8,
    fontWeight: "bold",
  },
});
