import { View ,Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground} from "react-native";
import signBg from "../assets/signBg.webp";
import { doc, setDoc } from "firebase/firestore"; 
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { DB, FIREBASE_AUTH } from "../firebaseConfig";


export default function SignUp (){
    

    const createUserinDB = async () => {
        try {
            const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
            if(response) {
                await setDoc(doc(DB, "users_dev", response?.user.uid), {
                    name: "Los Angeles",
                    state: "CA",
                    country: "USA",
                    SignupDate: new Date().toUTCString()
                  });
            }
            alert("User Created")
        } catch (error) {
            alert('Sign in failed: ' + error.message )
        } finally {
            setLoading(false);
        }
    }

    return(
        <View style={styles.mainComponent}>
        <ImageBackground source={signBg} style={styles.signImg}> 
            <Text style={styles.boldText}>
                Good to see you!!
            </Text>
            <View style={styles.inputWrapper}>
            <TextInput placeholder="Username*"/> 
            </View>
            <View style={styles.inputWrapper}>
                <TextInput placeholder="Email*"/>
            </View>
            <View style={styles.inputWrapper}>
                <TextInput placeholder="City"/>
            </View>
            <View style={styles.inputWrapper}>
                <TextInput placeholder="Password*"/>
            </View>
            <View style={styles.inputWrapper}>
                <TextInput placeholder="Confirm Password*"/>
            </View>
            <TouchableOpacity style={styles.searchButton} onPress={createUserinDB}>
             <Text style={styles.buttonText}> Register </Text>
             </TouchableOpacity>
            </ImageBackground>
       </View>

    )
} 

const styles = StyleSheet.create({
    mainComponent:{
        alignItems: "center",
        borderWidth: 0.5,
        height: "100%",
        justifyContent: "center",
        gap: 8
    },
    signImg: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        alignItems: "center",
        justifyContent: "center",
        gap: 16
    },  
    inputWrapper:{ 
        backgroundColor: "#e1e1e1",
        borderBottomWidth: 0.5,
        padding: 15,
        width: "70%",
        fontSize: 12,
        borderRadius: 5,
    },
    searchButton:{
        backgroundColor: "#e1e1e1",
        borderWidth: 0.5,
        padding: 9,
        width: "60%",
        marginBottom: 40,
        backgroundColor: "#FFF455",
        marginTop: 16,
        borderRadius: 5
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 28
    }
}
)
