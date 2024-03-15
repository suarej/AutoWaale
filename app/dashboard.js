import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView, StyleSheet, Platform, View, Text, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import Header from '../components/header';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Constants from 'expo-constants';
import { useState, useRef } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { FIREBASE_AUTH } from '../firebaseConfig';
import {router} from 'expo-router';

//https://www.npmjs.com/package/react-native-maps-directions
//https://www.npmjs.com/package/react-native-maps
//https://www.npmjs.com/package/react-native-google-places-autocomplete

const { width , height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.2;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 18.520430,
  longitude: 73.856743,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
} ;

export default function Dashboard(props){
    const apiKey = process.env.EXPO_GOOGLE_MAPS_API_KEY;
    const key= "AIzaSyDs6dddB4WI6-2C2XIPIRY1Lqdc64BuwZk";

  const [origin, setOrigin]= useState("");
  const [destination, setDestination]= useState("");
  const [showDirection, setShowDirection] = useState(false);
  const mapRef = useRef(null);

  const handleSetOrigin = (details) =>{
    setOrigin({
      latitude : details?.geometry.location.lat,
      longitude :  details?.geometry.location.lng
    });
    moveTo ({ 
      latitude : details?.geometry.location.lat,
      longitude :  details?.geometry.location.lng
    } )
  };

  const handleSetDestination = (details) =>{
    setDestination({
      latitude : details?.geometry.location.lat,
      longitude :  details?.geometry.location.lng
    });
    moveTo ({ 
      latitude : details?.geometry.location.lat,
      longitude :  details?.geometry.location.lng
    } )
  };

  const moveTo = async (position)=>{
    const camera = await mapRef.current?.getCamera()
    if(camera){
      camera.center = position;
      mapRef.current?.animateCamera(camera, {duration: 1000})
    }
  };

  const edgePaddingValue = 70;
  const edgePadding = {
    top: 250,
    right: 50,
    bottom: 50,
    left: 50
  }
  const traceRoute = () => {
    if(origin && destination) {
      setShowDirection(true);
      mapRef.current?.fitToCoordinates([origin, destination], {edgePadding})
    }
  };

  const signOut = () => {
    router.push('/');
    FIREBASE_AUTH.signOut();
  }

    return(
        <View> 
            <MapView ref={mapRef} style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_POSITION}>
            {origin && <Marker coordinate={origin} />}
            {destination && <Marker coordinate={destination} />}
            {showDirection && origin && destination && <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={key}
            strokeColor='#3390FF'
            strokeWidth={4}
            />}
      </MapView>
      <View style={styles.searchContainer}>
            <Text style={styles.getRideBold}> Get a ride </Text>
            <GooglePlacesAutocomplete
                styles={{ textInput: styles.input}}
                placeholder="Pickup location"
                fetchDetails
                onPress={(data, details = null) => {
                    handleSetOrigin(details)
                }}
                query={{
                    key: key,
                    language: 'en',
                }}
            />
            <GooglePlacesAutocomplete
                styles={{ textInput: styles.input}}
                placeholder="Dropoff location"
                fetchDetails
                onPress={(data, details = null) => {
                    handleSetDestination(details)
                }}
                query={{
                    key: key,
                    language: 'en',
                }}
            />
        <TouchableOpacity style={styles.searchButton} onPress={traceRoute}>
          <Text style={styles.buttonText}> Search </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton} onPress={signOut}>
          <Text style={styles.buttonText}> LogOut </Text>
        </TouchableOpacity>
      </View> 
    </View>
)
};

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
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 8,
        borderRadius: 8,
        top: Constants.statusBarHeight + 8,
        borderWidth: 0.5,
        gap: 6
      },
      getRideBold: {
        fontWeight: "bold",
        fontSize: 20
      },
      searchButton: {
        backgroundColor: "#bbb",
        borderRadius: 4,
        paddingVertical: 12,
        marginTop: 16
      },
      buttonText: {
        textAlign: "center"
      }
  });
  



