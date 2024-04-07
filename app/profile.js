import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { logOut } from "../services/signout";
import { router } from "expo-router";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.topBox}></View>
      <TouchableOpacity style={styles.listItem} onPress={()=> router.push('/userDetailsScreen')}>
        <Text style={styles.text}>Your Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('YourRides')}>
        <Text style={styles.text}>Your Rides</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listItem} onPress={logOut}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20
  },
  topBox: {
    height: 100,
    // backgroundColor: 'black',
    marginVertical: 30,
    borderWidth: 1,
    borderRadius: 8
  },
  listItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
})
