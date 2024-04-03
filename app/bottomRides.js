import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ricksaw from "../assets/ricksaw.png";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";

export default function BotomRides(props) {
  const snapPoints = useMemo(() => ["35%", "50%"], []);
  const bottomSheetRef = useRef(null);
  const { distance } = props;
  const formattedFare = parseFloat(distance * 20).toFixed(2);
  const formattedDistance = parseFloat(distance).toFixed(2);

  return (
    // <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={1}
        enablePanDownToClose={true}
        // onChange={handleSheetChanges}
      >
        <View style={styles.container}>
        <Image source={Ricksaw} style={styles.imgAuto} />
        <View style={styles.textBox}>
          <View styles={{ justifyContent: "space-between" }}>
            <Text> Distance: {formattedDistance} Km</Text>
            <Text> Rikshwaw: ₹{formattedFare} </Text>
          </View>
          <View>
          </View>
        </View>
        <Image source={Ricksaw} style={styles.imgAuto} />
        <View style={styles.textBox}>
          <View styles={{ justifyContent: "space-between" }}>
            <Text> Distance: {formattedDistance} Km</Text>
            <Text> Rikshwaw: ₹{formattedFare} </Text>
          </View>
          <View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.searchButton}
        >
          <Text style={styles.buttonText}> CONFIRM RIDE </Text>
        </TouchableOpacity>
        </View>
      </BottomSheet>
    // </View>
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
  container: {
    flex: 1,
    // padding: 24,
    marginTop: 10,
    // backgroundColor: 'grey',
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red'
  },
});


{/* <View style={styles.container}>
      <BottomSheet snapPoints={snapPoints}>
        <Image source={Ricksaw} style={styles.imgAuto} />
        <View style={styles.textBox}>
          <View styles={{ justifyContent: "space-between" }}>
            <Text> Distance: {formattedDistance} Km</Text>
            <Text> Rikshwaw: ₹{formattedFare} </Text>
          </View>
          <View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.searchButton}
        >
          <Text style={styles.buttonText}> CONFIRM RIDE </Text>
        </TouchableOpacity>
        <Text> abcdefgh</Text>
      </BottomSheet>
    </View> */}