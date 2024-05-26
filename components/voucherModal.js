import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import { AppContext } from "../context";
import { ref, update } from "firebase/database";
import { DB } from "../firebaseConfig";
import { AntDesign } from "@expo/vector-icons";

const vouchers = [{ Ride100: 100, Ride150: 150 }];

export default function VoucherModal(props) {
    const {closeVoucherModal, addMoney, voucherMoney} = props;
    const [voucherCode, setVoucherCode] = useState('');
    const [error, setError] = useState('');
    const [alert, setAlert] = useState(false);
    const [voucherValue, setVoucherValue] = useState();

    function getVoucherAndDeleteKey(voucherCode) {
        for (let i = 0; i < vouchers.length; i++) {
            const obj = vouchers[i];
            if (obj.hasOwnProperty(voucherCode)) {
                const value = obj[voucherCode];
                delete obj[voucherCode];
                addMoney(value);
                setVoucherValue(value);
                setCongratsAndBack();
                return value;
            }
        }
        setError(true);
        return undefined;
    };

    const setCongratsAndBack = () => {
        setAlert(true);
        setTimeout(()=> {
            closeVoucherModal();
        }, 2000);
    }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      //   visible={modalVisible}
      //   onRequestClose={closeModal}
    >
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <AntDesign name="arrowleft" size={34} color="black" onPress={closeVoucherModal}/>
          <Text style={[styles.switchText]}>Add Voucher</Text>
          <TextInput
            style={{
              fontWeight: "300",
              backgroundColor: "#eeeeee",
              fontSize: 17,
              height: 50,
              alignItems: "center",
              borderRadius: 10,
              paddingLeft: 15,
            }}
            value={voucherCode}
            onChangeText={setVoucherCode}
            placeholder="Enter Voucher Code"
          />
          {alert && Alert.alert(`Congratulations! ₹${voucherValue} added to wallet.`)}
          {error && <Text style={{color: 'red', fontSize: 12}}> Invalid Voucher Code! </Text>}
          <TouchableOpacity style={styles.button} onPress={()=>getVoucherAndDeleteKey(voucherCode)}>
            <Text style={styles.textBold}>Apply</Text>
          </TouchableOpacity>
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
    height: "100%",
    bottom: 0,
    gap: 10,
    paddingLeft: 20,
  },
  switchText: {
    fontWeight: "700",
    fontSize: 32,
    paddingBottom: 20,
  },
  textBold: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 19,
  },
  button: {
    backgroundColor: "#21D375",
    width: 200,
    padding: 18,
    borderRadius: 50,
    position: "absolute",
    bottom: 40,
    left: 70,
  },
});
