import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Header from "../components/header";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Constants from "expo-constants";
import { useState, useRef } from "react";
import MapViewDirections from "react-native-maps-directions";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { router } from "expo-router";
import GetLocation from "react-native-get-location";
import * as Location from 'expo-location';
import { useEffect } from "react";

//https://www.npmjs.com/package/react-native-maps-directions
//https://www.npmjs.com/package/react-native-maps
//https://www.npmjs.com/package/react-native-google-places-autocomplete

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.2;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Dashboard(props) {
  // const apiKey = process.env.EXPO_GOOGLE_MAPS_API_KEY;
  const key = "AIzaSyDs6dddB4WI6-2C2XIPIRY1Lqdc64BuwZk";

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showDirection, setShowDirection] = useState(false);
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
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

  const handleSetDestination = (details) => {
    setDestination({
      latitude: details?.geometry.location.lat,
      longitude: details?.geometry.location.lng,
    });
    moveTo({
      latitude: details?.geometry.location.lat,
      longitude: details?.geometry.location.lng,
    });
  };

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  // const GetCurrentLocation = GetLocation.getCurrentPosition({
  //   enableHighAccuracy: true,
  //   timeout: 60000,
  // })
  //   .then((location1) => {
  //     console.log(location1);
  //     const INITIAL_POSITION = {
  //       latitude: location1.latitude,
  //       longitude: location1.longitude,
  //       latitudeDelta: LATITUDE_DELTA,
  //       longitudeDelta: LONGITUDE_DELTA,
  //     };
  //     return INITIAL_POSITION;
  //   })
  //   .catch((error) => {
  //     const { code, message } = error;
  //     console.warn(code, message);
  //   });

  const edgePaddingValue = 70;
  const edgePadding = {
    top: 250,
    right: 50,
    bottom: 50,
    left: 50,
  };
  const traceRoute = () => {
    if (origin && destination) {
      setShowDirection(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };

  const signOut = () => {
    router.push("/");
    FIREBASE_AUTH.signOut();
  };

  return (
    <View>
    {initialRegion && 
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
      >
        {location && <Marker coordinate={location} />}
        {destination && <Marker coordinate={destination} />}
        {showDirection && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={key}
            strokeColor="#3390FF"
            strokeWidth={4}
          />
        )}
      </MapView>
    }
    <Text style={styles.paragraph}>{text}</Text>
    
      {/* <View style={styles.searchContainer}>
        <Text style={styles.getRideBold}> Get a ride </Text>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder="Pickup location"
          fetchDetails={true} // to search lat long
          onPress={(data, details = null) => {
            handleSetOrigin(details);
            console.log(JSON.stringify(data));
            console.log(JSON.stringify(details?.geometry?.location));
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
            console.log(JSON.stringify(data));
            console.log(JSON.stringify(details?.geometry?.location));
          }}
          query={{
            key: key,
            language: "en",
          }}
        />
        <TouchableOpacity style={styles.searchButton} onPress={traceRoute}>
          <Text style={styles.buttonText}> Search </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton} onPress={signOut}>
          <Text style={styles.buttonText}> LogOut </Text>
        </TouchableOpacity>
      </View> */}
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
    top: Constants.statusBarHeight + 8,
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
    marginTop: 16,
  },
  buttonText: {
    textAlign: "center",
  },
});
