import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Constants from "expo-constants";
import { useState, useRef } from "react";
import MapViewDirections from "react-native-maps-directions";
import { DB, FIREBASE_AUTH } from "../firebaseConfig";
import { router } from "expo-router";
import GetLocation from "react-native-get-location";
import * as Location from "expo-location";
import { useEffect } from "react";
import { ref, child, push, update, set } from "firebase/database";
import { logOut } from "../services/signout";
import Header from "../components/header";
// import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Map from "../assets/map.png";


const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.2;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Dashboard(props) {
  const { user } = props;
  // const apiKey = process.env.EXPO_GOOGLE_MAPS_API_KEY;
  const key = "AIzaSyDs6dddB4WI6-2C2XIPIRY1Lqdc64BuwZk";

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showDirection, setShowDirection] = useState(false);
  const mapRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [placeName, setPlaceName] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Assuming the first result is the most relevant
      if (geocode.length > 0) {
        setPlaceName(geocode[0].name);
      } else {
        setPlaceName("Unknown");
      }
      setOrigin(location.coords);
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  console.log(origin, "Origin");

  const handleSetOrigin = (details) => {
    // let x = GetCurrentLocation()
    setOrigin({
      // latitude : x.latitute,
      // longitude :  x.longitude
      latitude: details?.geometry.location.lat,
      longitude: details?.geometry.location.lng,
    });
    moveTo({
      latitude: details?.geometry.location.lat,
      longitude: details?.geometry.location.lng,
    });
  };

  const edgePaddingValue = 70;
  const edgePadding = {
    top: 250,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const handleSetDestination = (details) => {
    setDestination({
      latitude: details?.geometry.location.lat,
      longitude: details?.geometry.location.lng,
    });
    // moveTo({
    //   latitude: details?.geometry.location.lat,
    //   longitude: details?.geometry.location.lng,
    // });
    // alert(origin.latitude);
    // alert(destination.latitude);
      mapRef.current?.fitToCoordinates([{
        latitude: 18.5521026, longitude: 73.7686943
      }, {
        latitude: 18.5913, longitude: 73.7389
      }], { edgePadding });
  };

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirection(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };

  const createSearchEntry = async () => {
    const newPostKey = push(child(ref(DB), "users")).key;
    try {
      const result = await set(
        ref(DB, "users/" + user.uid + "/rides/" + newPostKey),
        {
          origin: origin,
          destination: destination,
          uid: user.uid,
          createdAt: new Date().toUTCString(),
        }
      );
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleSearch = async (position) => {
    const camera = await mapRef.current?.getCamera();
    const currentZoom = mapRef.current.getCamera().zoom;
    if (camera) {
      camera.center = position;
      camera.zoom = 17.5;
      mapRef.current?.animateCamera(camera, { duration: 2500 });
    }
  };

  return (
    <View>
      <Header />
      {initialRegion && (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
        >
          {origin && (
            <Marker coordinate={origin}>
              {/* <FontAwesome name="map-pin" size={32} color="#387ADF" /> */}
              <Image source={Map} style={styles.mapimage}/>
            </Marker>
          )}
          {destination && <Marker coordinate={destination} >
            {/* <FontAwesome name="map-pin" size={32} color="#387ADF" /> */}
           </Marker>}
          {origin && destination && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={key}
              strokeColor="#3390FF"
              strokeWidth={4}
            />
          )}
        </MapView>
      )}
      <View style={styles.searchContainer}>
        <Text style={styles.getRideBold}> Get a ride </Text>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder={placeName || "Pickup location"}
          fetchDetails={true} // to search lat long
          onPress={(data, details = null) => {
            handleSetOrigin(details);
          }}
          query={{
            key: key,
            language: "en",
          }}
        />
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder="Dropoff location"
          fetchDetails={true} // to search lat long
          onPress={(data, details = null) => {
            handleSetDestination(details);
          }}
          query={{
            key: key,
            language: "en",
          }}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => handleSearch(origin)}
        >
          <Text style={styles.buttonText}> Book Auto </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.searchButton} onPress={logOut}>
          <Text style={styles.buttonText}> LogOut </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    //   borderColor: "#888",
    //   borderWidth: 1,
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    padding: 10,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
    top: Constants.statusBarHeight,
    borderWidth: 0.5,
    gap: 6,
  },
  getRideBold: {
    fontWeight: "bold",
    fontSize: 20,
  },
  searchButton: {
    backgroundColor: "#bbb",
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 8,
  },
  buttonText: {
    textAlign: "center",
  },

  mapimage: {
    width: 35,
    height: 35,
    
  }
});
