import { View, Image, StyleSheet,Text} from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import profileIcon from "../assets/profileIcon.jpeg"

export default function Header(){
    return(
    <View style={styles.header}>
        {/* <Fontisto name="taxi" size={32} color="black" /> */}
        <FontAwesome5 name="car-side" size={32} color="black" />
        {/* <Fontisto name="automobile" size={60} color="black" /> */}
        <FontAwesome name="user-circle-o" size={32} color="black" />
    </View>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginLeft: 16,
        marginRight: 16,
        // paddingBottom: 4
    },
    carDrive: {
        height: 50,
        width: 80,
    },
    profileImg: {
        height: 50,
        width: 50,
    }
})