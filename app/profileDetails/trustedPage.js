import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import TrustedModal from "../../components/truestedModal";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export default function TrustedPage() {
  const [addRiderFromContacts, setAddRiderFromContacts] = useState(false);
  const [selectedContact, setSelectedContact] = useState([]);

  function getInitials(name) {
    return name
      .split(" ") // Split the name into an array of words
      .map((word) => word.charAt(0).toUpperCase()) // Get the first letter of each word and convert to uppercase
      .join(""); // Join the letters together
  }

  return (
    <View style={{ marginTop: 50 }}>
      <View>
        <View style={{ paddingLeft: 10 }}>
          <Feather
            name="arrow-left"
            size={30}
            color="black"
            onPress={() => router.back()}
          />
        </View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 45,
            padding: 20,
          }}
        >
          Trusted Contacts
        </Text>
      </View>

      {selectedContact?.length ? (
        selectedContact.map((contact, i) => {
          return (
            <View style={styles.userCard} key={i}>
              <View style={styles.initialsCircle}>
                <Text style={styles.initialsText}>
                  {getInitials(contact?.name)}
                </Text>
              </View>
              <View style={styles.userInfo}>
                <Text> {contact?.name} </Text>
                <Text>{contact.phoneNumbers[0].number}</Text>
              </View>
              <Feather
                name="chevron-right"
                size={24}
                color="black"
                style={styles.arrowIcon}
              />
            </View>
          );
        })
      ) : (
        <>
          <View
            style={{
              color: "grey",
              paddingLeft: 20,
              padding: 30,
            }}
          >
            <Text style={styles.textTitle}> Share your trip status </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 15,
              }}
            >
              <MaterialIcons name="emergency-share" size={24} color="black" />
              <Text
                style={{
                  fontSize: 15,
                  paddingRight: 30,
                  justifyContent: "center",
                  fontWeight: "300",
                }}
              >
                You'll be able to share your live location with one or more
                contacts during any Uber trip
              </Text>
            </View>
          </View>
          <View style={{ paddingLeft: 25, padding: 20 }}>
            <Text style={styles.textTitle}>Set Your emergency contacts</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 15,
              }}
            >
              <FontAwesome5 name="phone-volume" size={24} color="black" />
              <Text
                style={{
                  fontSize: 15,
                  paddingRight: 30,
                  fontWeight: "300",
                }}
              >
                You can make a trusted contact an emergency contact,too. Uber
                can call them if we can't reach you in case of an emergency.
              </Text>
            </View>
          </View>
        </>
      )}

      {addRiderFromContacts == true && (
        <TrustedModal
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
          setAddRiderFromContacts={setAddRiderFromContacts}
        />
      )}
      <TouchableOpacity
        onPress={() => setAddRiderFromContacts(true)}
        style={styles.button}
      >
        <Text style={styles.textBold}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    fontWeight: "500",
    fontSize: 16,
    paddingLeft: 29,
    paddingBottom: 10,
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
    marginTop: 80,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 0,
    borderBottomWidth: 0.2,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 25,
  },
  initialsCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f5dd4b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  initialsText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  arrowIcon: {
    marginLeft: "auto", // Push the arrow icon to the right
  },
});
