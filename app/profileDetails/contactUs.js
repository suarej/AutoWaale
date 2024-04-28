import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, TextInput, Button, Image} from "react-native";
import globalStyles from '../../styles';
import { useContext } from "react";
import { AppContext } from "../../context";
import Chat from "../../assets/chat.png";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

export default function ContactUs() {
    const {colorScheme} = useContext(AppContext);
  return (
    <View style={[styles.container, colorScheme ? globalStyles.lightTheme : globalStyles.darkTheme]}>
    <Image
        source={Chat}
        style={{ width: 300, height: 200,marginTop:-100 }}>
         </Image>
      <Text style={{ fontWeight: "400", fontSize: 19 }}>
        Let us know the isues you are facing?
      </Text>
      <View style={styles.contactBox}>
        <TouchableOpacity style={styles.button}>
        <AntDesign name="wechat" size={30} color="black" />
        <Text>Chat With Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <FontAwesome6 name="headphones-simple" size={24} color="black" />
          <Text> Talk With Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    fontWeight: "bold",
    borderWidth: 1
  },
  contactBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 18,
    width: '80%'
  },
  button: {
    backgroundColor: "#21D375",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 15,
    textAlign: 'center',
    alignItems:"center",
    padding: 8
  },
});
