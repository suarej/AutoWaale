import { View, Text, StyleSheet, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Notification() {
  return (
    <View style={{ marginTop: 45, overflow: 'scroll' }}>
    <MaterialCommunityIcons name="arrow-left" size={34} color="black" style={{marginLeft: 10}} />
      <Text style={styles.title}>Notification</Text>
      <ScrollView> 
      <View style={styles.notify}>
        <FontAwesome name="bell" size={24} color="#21D375" />
        <Text style={styles.message}>Your reward is expiring soon.Use it before 2024-05-31</Text>
      </View>
      <View style={styles.notify}>
        <FontAwesome name="bell" size={24} color="#21D375" />
        <Text style={styles.message}>Celebrate with a splash of colors and a 15% discount on all rides. Use code HOLI15. Offer valid until March 20th.</Text>
      </View>
      <View style={styles.notify}>
        <FontAwesome name="bell" size={24} color="#21D375" />
        <Text style={styles.message}>Start the New Year with a 25% discount on your next 3 rides. Use code NEWYEAR25. Offer valid until January 5th.</Text>
      </View>
      <View style={styles.notify}>
        <FontAwesome name="bell" size={24} color="#21D375" />
        <Text style={styles.message}>
          Just easiest way to earn Flat 100₹ Cashback? Just invite a friend to
          AutoWaale
        </Text>
      </View>
      <View style={styles.notify}>
        <FontAwesome name="bell" size={24} color="#21D375" />
        <Text style={styles.message}>
        Beat the heat with a 15% discount on all rides this summer. Use code SUMMER15. Offer valid until August 31st.
        </Text>
      </View>
      <View style={styles.notify}>
        <FontAwesome name="bell" size={24} color="#21D375" />
        <Text style={styles.message}>
        Enjoy a joyful Christmas with a 30% discount on all rides. Use code XMAS30 at checkout. Offer valid until December 25th.
        </Text>
      </View>
      <View style={styles.notify}>
        <FontAwesome name="bell" size={24} color="#21D375" />
        <Text style={styles.message}>
        Your coupon code SAVE50 is about to expire. Use it before May 30th to get 50% off on your next ride.
        </Text>
      </View>
      <View style={styles.notify}>
        <FontAwesome name="bell" size={24} color="#21D375" />
        <Text style={styles.message}>
        Celebrate Diwali with a 20% discount on all rides! Use code DIWALI20 at checkout.
        </Text>
      </View>
      <View style={styles.notify}>
        <FontAwesome name="bell" size={24} color="#21D375" />
        <Text style={styles.message}>
        Your coupon code RIDESAFE is about to expire. Use it before July 10th to get 10% off on your next ride.
        </Text>
      </View>
</ScrollView>
      
    </View>
  );
}
const styles = StyleSheet.create({
  notify: {
    flexDirection: "row",
    alignItems: 'center',
    padding: 15,
    paddingHorizontal: 20,
    gap: 10,
    borderBottomWidth: 0.2
  },
  message: {
    fontSize: 16,
    flexWrap: 'wrap',
    fontWeight: '400',
    maxWidth: 275
  },
  title: {
    fontWeight: "600",
    fontSize: 32,
    marginLeft: 10,
    padding: 10,
  },
});
