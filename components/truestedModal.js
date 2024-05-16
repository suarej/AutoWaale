import {
    StyleSheet,
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  import React, { useContext, useEffect, useState } from "react";
  import * as Contacts from "expo-contacts";
  import { AppContext } from "../context";
  import { ref, update } from "firebase/database";
  import { DB } from "../firebaseConfig";
  
  export default function TrustedModal(props) {
    const {setSelectedContact, setAddRiderFromContacts, selectedContact} = props;
    const { isUserSignedIn } = useContext(AppContext);
  
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
  
    useEffect(() => {
      fetchContacts();
    }, []);
  
    const fetchContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
  
        if (data.length > 0) {
          setContacts(data);
          setFilteredContacts(data);
        } else {
          alert("No contacts available.");
        }
      } else {
        alert("Permission to access contacts was denied.");
      }
    };
  
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity onPress={() => handleContactSelection(item)}>
          <View style={{ padding: 10 }}>
            <Text>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    };
  
    const handleContactSelection = (contact) => {
      const others = [...selectedContact, contact];
      setSelectedContact(others);
    //   const userRef = ref(DB, "users/" + isUserSignedIn + "/profileData");
    //   try {
    //     update(userRef, {
    //       otherRiders: others
    //     });
    //   } catch(err) {
    //     console.log(err);
    //   }
      setAddRiderFromContacts(false);
    };
  
    const handleSearch = (text) => {
      setSearchQuery(text);
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filtered);
    };
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        //   visible={modalVisible}
        //   onRequestClose={closeModal}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={[styles.switchText]}>Choose a Contact</Text>
            <TextInput
              style={{ padding: 10, borderBottomWidth: 1, marginBottom: 10 }}
              placeholder="Search contacts"
              onChangeText={handleSearch}
              value={searchQuery}
            />
            <FlatList
              data={filteredContacts}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={<Text>No contacts available</Text>}
            />
          </View>
        </View>
      </Modal>
    );
  }
  const styles = StyleSheet.create({
    modal: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalContent: {
      // backgroundColor: "#ffffff",
      // padding: 60,
      paddingHorizontal: 40,
      paddingVertical: 20,
      borderRadius: 8,
      // justifyContent: "center",
      backgroundColor: "#ffffff",
      width: "100%",
      height: "95%",
      bottom: 0,
      gap: 10,
    },
    switchText: {
      fontWeight: "bold",
      fontSize: 32,
      textAlign: "center",
    },
    textBold: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 16,
    },
    button: {
      backgroundColor: "#21D375",
      width: 200,
      marginLeft: "auto",
      marginRight: "auto",
      padding: 18,
      borderRadius: 50,
      marginVertical: 40,
    },
    termsText: {
      fontSize: 18,
      paddingBottom: 20,
      paddingTop: 10,
      borderBottomWidth: 0.2,
      borderBottomColor: "grey",
      opacity: 0.7,
    },
  });
  