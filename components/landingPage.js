import { View ,Text, TextInput, Button, StyleSheet, TouchableOpacity} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-input'
import { Link } from 'expo-router';



export default function LandingPage(){

    return(
        <View style={styles.landingPageContainer}>
            
            <FontAwesome5 name="car-side" size={32} color="black" />    
            <Text>
                WELCOME AUTOWALE!!       
            </Text>
            <View style={styles.phoneInputContainer}>
                <PhoneInput initialCountry="in" />
            </View>

            <TouchableOpacity style={styles.signupButton} >
             <Text style={styles.buttonText}> SignUp/Login </Text>
             <View> 
             {/* <Link href="/about"> About </Link> */}
             </View>
            </TouchableOpacity>



        </View>

    )

}

const styles = StyleSheet.create({

    landingPageContainer:{
        alignItems: "center",
        borderWidth: 0.5,
        height: "100%",
        justifyContent: "center",
        gap: 8,
        

    },
    
    phoneInputContainer:{

        backgroundColor: "#e1e1e1",
        borderWidth: 0.5,
        padding: 9,
        width: "70%",
        fontSize: 12,
        // margin: 20,
        
    },

    signupButton:{
        backgroundColor: "#e1e1e1",
        borderWidth: 0.5,
        padding: 9,
        width: "70%",
        marginBottom: 40,
    
    },

    buttonText: {
        textAlign: "center",
    }

})