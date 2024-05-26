import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Constants from "expo-constants";
import { useState, useRef, useContext } from "react";
import MapViewDirections from "react-native-maps-directions";
import { DB } from "../firebaseConfig";
import * as Location from "expo-location";
import { useEffect } from "react";
import { ref, child, push, update, set } from "firebase/database";
import Header from "../components/header";
// import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { getDistance, convertDistance, getPathLength } from "geolib";
import BotomRides from "./bottomRides";
import LocationInputs from "./locationInputs";
import { AppContext } from "../context";
import AddDestinations from "../components/addDestinations";
import Loader from "../components/loader";
import {router} from 'expo-router';
import BookedRide from "./bookedRide";

export default function Dashboard() {
  const { user, userInfo } = useContext(AppContext);
  const key = "AIzaSyDs6dddB4WI6-2C2XIPIRY1Lqdc64BuwZk";

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [showDirection, setShowDirection] = useState(false);
  const mapRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [placeName, setPlaceName] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [show, setShow] = useState('single');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('auto');

  const handleAddOrigin = (details) => {
    destinations[0] = 
      {
        latitude: details?.geometry.location.lat,
        longitude: details?.geometry.location.lng,
        name: details?.name,
        key: details?.place_id,
      };

      setDestinations([...destinations]);
  };

  const addDestination = async (details, data) => {
    if (destinations.length < 4) {
      setDestinations([
        ...destinations,
        {
          latitude: details?.geometry.location.lat,
          longitude: details?.geometry.location.lng,
          name: details?.name,
          key: details?.place_id,
        },
      ]);
      // moveTo({
      //   latitude: details?.geometry.location.lat,
      //   longitude: details?.geometry.location.lng,
      // });
    } else {
      Alert.alert(
        "Maximum Destinations Reached",
        "You can only add up to 4 destinations."
      );
    }
  };

  const clearDestinations = () => {
    setDestinations(destinations.slice(0, 1));
  };

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
      
      setDestinations([
        ...destinations,
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          name: geocode[0].name,
          key: 1,
        },
      ])
      setOrigin(location.coords);
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  useEffect(()=> {
    if(destinations.length > 1) {
      const stopsLength = destinations.length;
      mapRef.current?.fitToCoordinates(
        [
          destinations[0],
          destinations[stopsLength-1],
        ],
        { edgePadding }
      );
      calculateDistance();
    }
  },[destinations])

  const edgePaddingValue = 70;
  const edgePadding = {
    top: 10,
    right: edgePaddingValue,
    bottom: 300,
    left: edgePaddingValue,
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
      camera.center = destinations[0];
      camera.zoom = 17.5;
      mapRef.current?.animateCamera(camera, { duration: 2500 });
    }

    setIsLoading(true);
    setShow('loader');
    setMessage('Hold on, we are finding nearest ride...');
    setTimeout(()=> {
        setMessage('Driver assigned');
        setShow('bookedRide')
        // router.push('/bookedRide');
        setIsLoading(false);
    }, 3000)
  };

  const calculateDistance = () => {
    if (origin && destinations.length>1) {
      const meters = getPathLength(destinations);
      const kilometers = convertDistance(meters, "km");
      setDistance(kilometers);
    } else {
      setDistance(null);
    }
  };

  return (
    <View>
    {!initialRegion ? (
      <View style={{position: 'absolute', top: 350, left: 160}}> 
        <ActivityIndicator size="large" color="#0000ff" /> 
        </View>
      ) : (
        <MapView
          ref={mapRef}
          style={styles.fullMap}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
        >
          {destinations.map((destination, index) => (
            <Marker
              key={index}
              coordinate={destination}
              title={`Destination ${index + 1}`}
            >
              <FontAwesome5 name={index == 0 ? 'car': 'map-marker-alt'} size={24} color="red" />
            </Marker>
          ))}
          {destinations.length >= 2 && (
            <MapViewDirections
              origin={destinations[0]}
              destination={destinations[destinations.length - 1]}
              waypoints={destinations.slice(1, -1)}
              apikey={key}
              strokeWidth={3}
              strokeColor="#1E90FF"
            />
          )}
        </MapView>
      )}
      { distance && show!== 'loader' && (
        <BotomRides distance={distance} handleSearch={handleSearch} setShow={setShow} setSelectedVehicle={setSelectedVehicle} selectedVehicle={selectedVehicle}/>
      )}
      {
        show === 'single' ? 
        <LocationInputs
        handleAddOrigin={handleAddOrigin}
            handleSetDestination={addDestination}
            setShow={setShow}
            placeName={placeName}
            calculateDistance={calculateDistance}
          />
         : show == 'multiple' ? 
         <AddDestinations
          destinations={destinations}
          handleSetDestination={addDestination}
          setShow={setShow}
        /> : null
      }
      {
        show == 'loader' && <Loader isLoading={isLoading} progress={progress} message={message}/>
      }
      {
        show == 'bookedRide' && <BookedRide setShow={setShow} selectedVehicle={selectedVehicle}
              setDistance={setDistance}
              clearDestinations={clearDestinations}
              destinations={destinations}
        />
      }
    </View>
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
  },
  destinationContainer: {
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
    top: Constants.statusBarHeight + 200,
    borderWidth: 0.5,
    gap: 6,
  },
});

