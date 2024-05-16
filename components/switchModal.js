import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import AddRiderFromContacts from "./riderFromContacts";

export default function SwitchModal(props) {
  const { rider, setRider, closeSwitchRider, userInfo } = props;
  const [checked, setChecked] = useState(rider);
  const [addRiderFromContacts, setAddRiderFromContacts] = useState(false);
  const [selectedContact, setSelectedContact] = useState([]);

  useEffect(() => {
    if (userInfo?.profileData?.otherRiders?.length) {
      let otherItems = [
        ...selectedContact,
        ...userInfo?.profileData?.otherRiders,
      ];
      setSelectedContact(otherItems);
    }
  }, [userInfo]);

  const handleRadioChange = (value) => {
    setChecked(value);
    setRider(value);
    closeSwitchRider();
  };

  const handleAddRider = () => {
    setAddRiderFromContacts(true);
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
          <Text style={styles.switchText}>Switch Rider</Text>
          <RadioButton.Group onValueChange={handleRadioChange} value={checked}>
            <RadioButton.Item
              style={{ borderBottomWidth: 0.2 }}
              label="Me"
              value="me"
            />
            <RadioButton.Item
              style={{ borderBottomWidth: 0.2 }}
              label="Other"
              value="Other"
            />
            {selectedContact.map((contact, index) => {
              return (
                <RadioButton.Item
                  style={{ borderBottomWidth: 0.2 }}
                  label={contact}
                  key={index}
                  value={contact}
                />
              );
            })}
          </RadioButton.Group>
          {addRiderFromContacts && (
            <AddRiderFromContacts
              selectedContact={selectedContact}
              setSelectedContact={setSelectedContact}
              setAddRiderFromContacts={setAddRiderFromContacts}
            />
          )}
          <TouchableOpacity onPress={handleAddRider}>
            <Text style={styles.addRiderText}> Add rider </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => ""}>
            <Text style={styles.textBold}> DONE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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

    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    bottom: 0,
    gap: 10,
  },
  switchText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    borderBottomWidth: 0.2,
    paddingBottom: 8,
  },
  textBold: {
    fontWeight: "bold",
    textAlign: "center",
    // fontSize: 17
  },
  button: {
    backgroundColor: "#21D375",
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 12,
    borderRadius: 8,
    marginVertical: 2,
  },
  addRiderText: {
    fontSize: 16,
    borderBottomWidth: 0.2,
    padding: 12,
    paddingTop: 2,
    fontWeight: "500",
  },
});
