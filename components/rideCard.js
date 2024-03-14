import { View ,Text, TextInput, Button, StyleSheet} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";


export default function RideCard(){
    return(

       <View style={styles.card}>
            <Text style={styles.ride}>
                Get a ride
            </Text>
                <TextInput style={styles.rideinput} placeholder="Pickup location" placeholderTextColor="#000000"/>
                <TextInput style={styles.rideinput} placeholder="Dropoff location" placeholderTextColor="#000000"/>
            <View style={styles.searchBar}><Button title="Search"/></View>
       </View>
    )

}

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        borderWidth: 1,
        margin: 8
    },
    ride: {
        fontWeight: "bold",
        fontSize: 24,
        marginLeft: 16,
    },
    rideinput:{
        backgroundColor: "#dcdcdc",
        borderRadius: 5,
        padding: 10,
        marginTop: 8, marginRight: 16, marginBottom: 8, marginLeft: 16
    },
    searchBar:{
       color: "#000000",
       padding: 12,
       margin: 32,
       marginTop: 8,
       marginBottom: 8
    }
})