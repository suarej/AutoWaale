import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Button,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function AppSetting(){
    return(
    <>
      <View>
        <Text> Settings </Text>
        </View>

        <View>
        <Text> App settings </Text>
        <View/>
        <View style={styles.infoItems}>
        <FontAwesome name="home" size={24} color="black" />
        <Text style={styles.details}> Home </Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </View>
        <View style={styles.infoItems}>
        <Fontisto name="locked" size={24} color="black" />
        <Text style={styles.details}>Privacy </Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </View>
        <View style={styles.infoItems}>
        <Text style={styles.details}> Activity </Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </View>
        <View style={styles.infoItems}>
        <Entypo name="wallet" size={24} color="black" />
        <Text style={styles.details}> Wallets </Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </View>
        <View style={styles.infoItems}>
        <FontAwesome6 name="contact-card" size={24} color="black" />
        <Text style={styles.details}> Contact Us</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </View>
        </View>
        <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}> LogOut </Text>      
          </TouchableOpacity>
     </>
      
        


       
    )

}
const styles = StyleSheet.create({
  infoItems: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    gap: 14,
    paddingHorizontal: 12

  },


}
)

    
  