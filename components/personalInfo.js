import { View ,Text, TextInput, Button, StyleSheet, TouchableOpacity} from "react-native";

export default function PersonalInfo (){
    return(
        <View style={styles.mainComponent}>
            <Text>
                Good to see you again!!
            </Text>
            <View style={styles.inputWrapper}>
            <TextInput placeholder="Username"/> 
            </View>
            <View style={styles.inputWrapper}>
                <TextInput placeholder="Email"/>
            </View>
            <View style={styles.inputWrapper}>
                <TextInput placeholder="City"/>
            </View>
            <View style={styles.inputWrapper}>
                <TextInput placeholder="Password"/>
            </View>
            <View style={styles.inputWrapper}>
                <TextInput placeholder="Confirm Password"/>
            </View>

            <TouchableOpacity style={styles.searchButton} >
             <Text style={styles.buttonText}> Search </Text>
             </TouchableOpacity>
       </View>

    )
} 

const styles = StyleSheet.create({
    mainComponent:{
        alignItems: "center",
        borderWidth: 0.5,
        height: "100%",
        justifyContent: "center",
        gap: 8,
    },
    inputWrapper:{ 
        backgroundColor: "#e1e1e1",
        borderWidth: 0.5,
        padding: 9,
        width: "70%",
        fontSize: 12,
        borderRadius: 5,
    },
    searchButton:{
        backgroundColor: "#e1e1e1",
        borderWidth: 0.5,
        padding: 9,
        width: "40%",
        marginBottom: 40,
        backgroundColor: "#69db37",
    }    
}
)
