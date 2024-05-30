import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const UserDetailsScreen = () => {
  // Dummy user information
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [contact, setContact] = useState("+1 (123) 456-7890");
  const [city, setCity] = useState("New York");

  const handleUpdateProfile = () => {
    // Implement update profile logic
    console.log("Update profile");
  };

  return (
   
    <View style={styles.container}>
      <FontAwesome name="user-circle-o" size={55} color="black" />
      <View style={styles.background}>
        {/* Name input */}
        <Text> BASIC INFO </Text>
      
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>
        {/* Email input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {/* Contact input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact:</Text>
          <TextInput
            style={styles.input}
            value={contact}
            onChangeText={setContact}
          />
        </View>
        {/* City input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Rating:</Text>
          <TextInput style={styles.input} value={city} onChangeText={setCity} />
        </View>
      </View>
      {/* Update Profile button */}
      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdateProfile}
      >
        <Text style={styles.buttonText}>UPDATE PROFILE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  background: {
    marginTop: 25,
    flex: 1,
    width: "100%",
    backgroundColor: "#eaeaea", // Background color
    padding: 20,
    paddingBottom: 50, // Adjust paddingBottom to accommodate the button
  },
  inputContainer: {
    marginBottom: 10,
    borderTopWidth: 1, 
    color: "#828282"
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 14,
  },
  updateButton: {
    // position: 'absolute',
    // bottom: 20,
    width: "60%",
    backgroundColor: "#21D375",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 85,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default UserDetailsScreen;
