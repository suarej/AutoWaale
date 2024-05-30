import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { PromotionModal } from "../components/promotionModal";

const offers = [{}];

export default function Promotions() {
  const [promotionModal, setpromotionModal] = useState(false);

  const handleModalOpen = () => {
    setpromotionModal(true);
  };

  const handleModalClose = () => {
    setpromotionModal(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 30 }}>
        <AntDesign
          name="arrowleft"
          size={32}
          color="black"
          style={{ marginLeft: 5, marginTop: 10 }}
          onPress={() => router.back()}
        />
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Promotions
        </Text>
        <Text
          style={{
            fontWeight: 400,
            fontSize: 16,
            marginHorizontal: 20,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Book now and we'll auto-apply your best promo
        </Text>

        {promotionModal && <PromotionModal handleModalClose={handleModalClose}/>}

        <TouchableOpacity onPress={handleModalOpen}>
          <View style={styles.promoContainer}>
            <Ionicons name="pricetag" size={32} color="#21D375" />
            <Text style={{ width: 260, fontSize: 16, fontWeight: 400 }}>
              Congrats! You have unlocked a super offer an Intercity
              round-trips.Promo amount, timing,and validity subject to change.
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={28}
              color="black"
            />
          </View>
          <Text style={styles.textDate}>Mar31,2024 50+ trips left.</Text>
        </TouchableOpacity>

        <View>
          <View style={styles.promoContainer}>
            <Ionicons name="pricetag" size={32} color="#21D375" />
            <Text style={{ width: 260, fontSize: 16, fontWeight: 400 }}>
              Congrats! You have unlocked a super offer an Intercity
              round-trips.Promo amount, timing,and validity subject to change.
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={28}
              color="black"
            />
          </View>
          <Text style={styles.textDate}>Mar31,2024 50+ trips left.</Text>
        </View>

        <View>
          <View style={styles.promoContainer}>
            <Ionicons name="pricetag" size={32} color="#21D375" />
            <Text style={{ width: 260, fontSize: 16, fontWeight: 400 }}>
              Congrats! You have unlocked a super offer an Intercity
              round-trips.Promo amount, timing,and validity subject to change.
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={28}
              color="black"
            />
          </View>
          <Text style={styles.textDate}>Mar31,2024 50+ trips left.</Text>
        </View>

        <View>
          <View style={styles.promoContainer}>
            <Ionicons name="pricetag" size={32} color="#21D375" />
            <Text style={{ width: 260, fontSize: 16, fontWeight: 400 }}>
              Congrats! You have got 17% off up to INR100 on your Auto rides.
              Promo amount and validity are subject to change.
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={28}
              color="black"
            />
          </View>
          <Text style={styles.textDate}>Jul 1,2024 50+ trips left.Pune</Text>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "white",
          shadowColor: "whitesmoke",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          padding: 4,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 30,
          }}
        >
          we'll apply your best deal
        </Text>
        <TouchableOpacity onPress={()=>router.push("/dashboard")} style={styles.button}>
          <Text style={styles.textBold}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  promoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 14,
    textAlign: "center",
  },
  textDate: {
    textAlign: "center",
    margin: 15,
    marginHorizontal: 45,
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },
  textBold: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 19,
  },
  button: {
    backgroundColor: "#21D375",
    width: 150,
    padding: 10,
    borderRadius: 50,
    position: "fixed",
    bottom: 10,
    left: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
