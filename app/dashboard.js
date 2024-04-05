import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Constants from "expo-constants";
import { useState, useRef } from "react";
import MapViewDirections from "react-native-maps-directions";
import { DB } from "../firebaseConfig";
import * as Location from "expo-location";
import { useEffect } from "react";
import { ref, child, push, update, set } from "firebase/database";
import Header from "../components/header";
// import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { getDistance, convertDistance } from "geolib";
import BotomRides from "./bottomRides";
import LocationInputs from "./locationInputs";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.2;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Dashboard(props) {
  const { user, userInfo } = props;
  // const apiKey = process.env.EXPO_GOOGLE_MAPS_API_KEY;
  const key = "AIzaSyDs6dddB4WI6-2C2XIPIRY1Lqdc64BuwZk";

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
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
    mapRef.current?.fitToCoordinates(
      [
        {
          latitude: 18.5521026,
          longitude: 73.7686943,
        },
        {
          latitude: 18.5913,
          longitude: 73.7389,
        },
      ],
      { edgePadding }
    );
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

  const handleSearch = async () => {
    const camera = await mapRef.current?.getCamera();
    const currentZoom = mapRef.current.getCamera().zoom;
    if (camera) {
      camera.center = origin;
      camera.zoom = 17.5;
      mapRef.current?.animateCamera(camera, { duration: 2500 });
    }
    calculateDistance();
  };

  const calculateDistance = () => {
    if (origin && destination) {
      const meters = getDistance(origin, destination);
      const kilometers = convertDistance(meters, "km");
      setDistance(kilometers);
    } else {
      setDistance(null);
    }
  };

  return (
    <>
      <Header userInfo={userInfo}/>
      {initialRegion && (
        <MapView
          ref={mapRef}
          style={styles.fullMap}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
        >
          {origin && (
            <Marker coordinate={origin}>
            <FontAwesome5 name="car" size={24} color="red" />
            </Marker>
          )}
          {destination && (
            <Marker coordinate={destination}>
            <FontAwesome5 name="map-marker-alt" size={24} color="red" />
            </Marker>
          )}
          {origin && destination && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={key}
              strokeColor="#1E90FF"
              strokeWidth={4.5}
            />
          )}
        </MapView>
      )}
      {distance ? (
        <BotomRides distance={distance} />
      ) : (
        <LocationInputs
          handleSetOrigin={handleSetOrigin}
          handleSetDestination={handleSetDestination}
          handleSearch={handleSearch}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    height: "73%",
  },
  fullMap: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  }
});
