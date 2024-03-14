import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, View, Text } from 'react-native';

export default function SearchBar(props){
    const apiKey = process.env.EXPO_GOOGLE_MAPS_API_KEY;
    const key= "AIzaSyDs6dddB4WI6-2C2XIPIRY1Lqdc64BuwZk";

    return(
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.input}}
            placeholder={props.label}
            fetchDetails
            onPress={(data, details = null) => {
                props.setPickUp(details)
            }}
            query={{
                key: key,
                language: 'en',
            }}
        />
)
};

const styles = StyleSheet.create({
    input: {
    //   borderColor: "#888",
    //   borderWidth: 1,
      backgroundColor: "#dcdcdc",
        borderRadius: 5,
        padding: 10,
    }
  });
  



