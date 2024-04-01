import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ricksaw from "../assets/ricksaw.png";

export default function BotomRides(props) {
  const { distance } = props;
  const formattedFare = parseFloat(distance * 20).toFixed(2);
  const formattedDistance = parseFloat(distance).toFixed(2);

  return (
    <View style={styles.rideContainer}>
      <Image source={Ricksaw} style={styles.imgAuto} />
      <View style={styles.textBox}>
        <View styles={{ justifyContent: "space-between" }}>
            <Text> Distance: {formattedDistance} Km</Text>
          <Text> Rikshwaw: ₹{formattedFare} </Text>
          {/* <Text> 115.71</Text> */}
        </View>
        <View>
          {/* <Text> 10:25PM: </Text> */}
          {/* <Text style={styles.strikethrough}> 145.71 </Text> */}
        </View>
      </View>
      <TouchableOpacity
        style={styles.searchButton}
        // onPress={() => handleSearch(origin)}
      >
        <Text style={styles.buttonText}> CONFIRM RIDE </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  rideContainer: {
    // flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  imgAuto: {
    height: 50,
    width: 50,
  },
  textBox: {
    justifyContent: "space-between",
  },
  strikethrough: {
    textDecorationLine: "line-through",
  },
  searchButton: {
    backgroundColor: "#21D375",
    borderRadius: 8,
    paddingVertical: 12,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    borderRadius: 8,
    fontWeight: "bold",
  },
});
