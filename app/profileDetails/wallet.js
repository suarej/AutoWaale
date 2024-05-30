import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PhonePay from "../../assets/phonepay.png";
import Gpay from '../../assets/gpay.png';
import { Entypo } from '@expo/vector-icons';
import { useState } from "react";
import VoucherModal from "../../components/voucherModal";


export default function Wallet() {
  const [voucherModal, setvoucherModal] = useState(false);
  const [voucherMoney, setVoucherMoney] = useState(0);

  const closeVoucherModal = () => {
    setvoucherModal(false);
  };

  const addMoney = (newValue) => {
    setVoucherMoney(prevValue => prevValue + newValue);
};

  console.log(voucherMoney, "money");

  return (
    <View style={{ marginTop: 30 }}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          padding: 15,
          marginBottom: -20,
        }}
      >
        Wallet
      </Text>

      <View>
        <View style={styles.giftCard}>
          <Text style={styles.title}>Autowale Cash</Text>
          <View style={styles.giftDetails}>
            <Text style={{ fontWeight: "bold", fontSize: 30 }}> &#8377; {voucherMoney} </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
          {
            voucherModal ==true && <VoucherModal voucherMoney={voucherMoney} addMoney={addMoney} closeVoucherModal={closeVoucherModal}/>
          }

          <TouchableOpacity onPress={()=>setvoucherModal(true)} style={styles.button}>
          
          <Entypo name="plus" size={18} color="black" />
            <Text style={styles.textBold}>
              Add Voucher
          </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.giftDescription}>
          <Text style={styles.title}>Send a Gift </Text>
          <View style={styles.sendGift}>
            <Text style={{ width: 200 }}>
              You can now buy an instant gift card, for use on Autowale
            </Text>
            <FontAwesome5 name="gift" size={40} color="#000000" />
          </View>
          <TouchableOpacity style={styles.sendGiftButton}>
            <Text>Send a Gift Card</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.paddingContainer}>
          <Text style={styles.title}> Payment Methods </Text>
          <View style={styles.paymentMethods}>
          <MaterialCommunityIcons name="cash-100" size={30} color="#21D375" />
            <Text style={styles.payTitle}> Cash</Text>  
          </View>
          
            <View style={styles.paymentMethods}>
              <Image
                source={PhonePay}
                style={{ width: 30, height: 30 }}
              ></Image>
              <Text style={styles.payTitle}>Add PhonePe Wallet</Text>
            </View>
            <View style={styles.paymentMethods}>
              <Image
                source={Gpay}
                style={{ width: 30, height: 30 }}
              ></Image>
              <Text style={styles.payTitle}>Add GooglePay Wallet</Text>
            </View>
            <View style={styles.paymentMethods}>
            <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
              <Text style={styles.payTitle}>Add Pay by any UPI app</Text>
            </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  giftCard: {
    borderWidth: 0.2,
    margin: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    backgroundColor: "white",
    // Android elevation
    elevation: 5,
    paddingHorizontal: 30,
    padding: 20,
    // backgroundColor: "grey"
  },
  giftDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  giftDescription: {
    borderWidth: 0.2,
    margin: 20,
    borderRadius: 10,
    padding: 20,
    gap: 8,
  },
  sendGift: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sendGiftButton: {
    borderWidth: 0.2,
    width: 120,
    borderRadius: 15,
    padding: 5,
    backgroundColor: "#EEEEEE",
  },
  paymentMethods: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderBottomWidth: 0.2,
    paddingBottom: 6
  },
  paddingContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 15,
    // padding: 20,
    gap: 18
  },
  payTitle: {
    fontSize: 16
  },
  textBold: {
    fontWeight: "600",
    // textAlign: "center",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#21D375",
    width: 150,
    padding: 10,
    borderRadius: 50,
    marginTop: 10,
    flexDirection: 'row',
    // textAlign: 'center'
    justifyContent: 'center',
    alignItems: 'center'
  }
});
