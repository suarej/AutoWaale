import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Rikshaw from "../../assets/evAuto.png";
import evRikshaw from "../../assets/ricksaw.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

export default function PastRides() {
  return (
    <View style={{ marginTop: 45 }}>
      <MaterialCommunityIcons
        name="arrow-left"
        size={34}
        color="black"
        style={{ marginLeft: 10 }}
      />
      <Text style={styles.title}>History </Text>

      <ScrollView>

        <View style={{ borderBottomWidth: 0.2, padding: 10 }}>
          <View style={styles.rideItem}>
            <Text style={styles.textDetails}>Mon, May 14, 9:40 AM</Text>
            <Image source={evRikshaw} style={styles.logo} />
          </View>
          <View
            style={styles.rideDetails}
          >
            <Text style={styles.subTextDetails}>Auto to</Text>
            <Text style={{ fontWeight: "500", fontSize: 17 }}>₹ 212</Text>
          </View>
          <View style={{paddingHorizontal: 20}}> 
          <Text style={styles.subTextDetails}>
            Regency astra complex, Baner Road, Pune
          </Text>
          </View>
        </View>

        <View style={{ borderBottomWidth: 0.2, padding: 10 }}>
          <View style={styles.rideItem}>
            <Text style={styles.textDetails}>Sat, March 8, 11:12 AM</Text>
            {/* <Image source={Rikshaw} style={styles.logo} /> */}
            <Octicons name="package" size={38} color="black" style={{left: -5}}/>
          </View>
          <View
            style={styles.rideDetails}
          >
            <Text style={styles.subTextDetails}>Cargo Details</Text>
            <Text style={{ fontWeight: "500", fontSize: 17 }}>₹ 180</Text>
          </View>
          <View style={{paddingHorizontal: 20}}> 
          <Text style={styles.subTextDetails}>A1, 402, Durvankur wada, Wakad</Text>
          </View>
        </View>

        <View style={{ borderBottomWidth: 0.2, padding: 10 }}>
          <View style={styles.rideItem}>
            <Text style={styles.textDetails}>Fri, Feb 28, 8:40 AM</Text>
            <Image source={evRikshaw} style={styles.logo} />
          </View>
          <View
            style={styles.rideDetails}
          >
            <Text style={styles.subTextDetails}>Auto to</Text>
            <Text style={{ fontWeight: "500", fontSize: 17 }}>₹ 140</Text>
          </View>

          <View style={{paddingHorizontal: 20}}> 
          <Text style={styles.subTextDetails}>
            Radhika Apartment, Juhu Road, Sangavi, Pune
          </Text>
          </View>
        </View>

        <View style={{ borderBottomWidth: 0.2, padding: 10 }}>
          <View style={styles.rideItem}>
            <Text style={styles.textDetails}>Sun, March 18, 8:40 AM</Text>
            <Image source={Rikshaw} style={styles.logo} />
          </View>
          <View
            style={styles.rideDetails}
          >
            <Text style={styles.subTextDetails}>EVAuto to</Text>
            <Text style={{ fontWeight: "500", fontSize: 17 }}>₹ 90</Text>
          </View>

        <View style={{paddingHorizontal: 20}}> 
          <Text style={styles.subTextDetails}>
            B-503,Suman Avenue, Dhayari Road, katraj
          </Text>
          </View>
        </View>

        <View style={{ borderBottomWidth: 0.2, padding: 10 }}>
          <View style={styles.rideItem}>
            <Text style={styles.textDetails}>Sun, March 18, 8:40 AM</Text>
            <Image source={Rikshaw} style={styles.logo} />
          </View>
          <View
            style={styles.rideDetails}
          >
            <Text style={styles.subTextDetails}>EVAuto to</Text>
            <Text style={{ fontWeight: "500", fontSize: 17 }}>₹ 90</Text>
          </View>

        <View style={{paddingHorizontal: 20}}> 
          <Text style={styles.subTextDetails}>
            B-503,Suman Avenue, Dhayari Road, katraj
          </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    alignItems: "center",
    // justifyContent: "center",
    // flex: 1,
  },
  logo: {
    width: 45,
    height: 45,
  },
  title: {
    fontWeight: "500",
    fontSize: 32,
    marginLeft: 10,
    padding: 10,
    borderBottomWidth: 0.2,
  },
  textDetails: {
    fontSize: 16,
    fontWeight: "500",
  },
  rideDetails: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 },
  rideItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15
  },
  logoFixing: {
    // flexDirection:"row",
    justifyContent: "space-between",
    borderBottomWidth: 0.2,
  },
  subTextDetails: {
    fontSize: 16,
    width: 250,
  },
});
