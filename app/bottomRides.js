import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ricksaw from "../assets/ricksaw.png";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import EvAuto from "../assets/evAuto.png";
import { Octicons } from "@expo/vector-icons";

export default function BotomRides(props) {
  const {handleSearch, setShow} = props;
  const snapPoints = useMemo(() => ["25%", "43%"], []);
  const bottomSheetRef = useRef(null);
  const { distance } = props;
  const formattedFareAuto = parseFloat(distance * 20).toFixed(2);
  const fareBeforeDiscountAuto = parseFloat(distance * 22).toFixed(2);
  const formattedFareEV = parseFloat(distance * 15).toFixed(2);
  const formattedFareCargo = parseFloat(distance * 30).toFixed(2);

  const formattedDistance = parseFloat(distance).toFixed(2);

  const [selectedItem, setSelectedItem] = useState('auto');

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={1}
      // enablePanDownToClose={true}
      // onChange={handleSheetChanges}
    >
    <Text style={styles.distanceTitle}> Total Distance: {formattedDistance} Km </Text>
    <TouchableOpacity style={[styles.itemBox, selectedItem === 'auto' && styles.selectedItem]} onPress={() => handleSelectItem('auto')}>
          <Image source={Ricksaw} style={styles.imgAuto} />
          <View> 
            <Text style={styles.textBold}> Auto Plus</Text>
            <Text style={styles.textNormal}> 10:51am {'\u00B7'} 2 mins away</Text>
          </View>
          <View>
            <Text style={styles.textBold}> ₹{formattedFareAuto} </Text>
            <Text style={styles.textBoldStrike}> ₹{fareBeforeDiscountAuto} </Text>
          </View>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.itemBox, selectedItem === 'ev' && styles.selectedItem]} onPress={() => handleSelectItem('ev')}>
          <Image source={EvAuto} style={styles.imgEv} />
          <View> 
            <Text style={styles.textBold}> EV Plus</Text>
            <Text style={styles.textNormal}> 10:53am {'\u00B7'} 4 mins away</Text>
          </View>
            <Text style={styles.textBold}> ₹{formattedFareEV} </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.itemBox, selectedItem === 'cargo' && styles.selectedItem]} onPress={() => handleSelectItem('cargo')}>
          <Octicons name="package" size={38} color="black" style={{marginLeft: 8}}/>
          <View> 
            <Text style={styles.textBold}> Cargo</Text>
            <Text style={styles.textNormal}> 10:57am {'\u00B7'} 8 mins away</Text>
          </View>
            <Text style={styles.textBold}> ₹{formattedFareCargo} </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=> {setShow(''); handleSearch();}}> 
        <Text style={styles.textBold}>      CONFIRM RIDE</Text>
      </TouchableOpacity>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  distanceTitle: {
    textAlign: 'center', fontWeight: 'bold', fontSize: 16, paddingVertical: 4
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    alignItems: 'center',
    marginVertical: 4,
    padding: 6
  },
  selectedItem: {
    backgroundColor: 'whitesmoke',
    borderWidth: 2,
    borderRadius: 8,
  },
  imgAuto: {
    height: 40,
    width: 40,
  },
  imgEv: {
    width: 40,
    height: 40,
  },
  textNormal: {
    fontSize: 14
  },
  textBold: {
    fontWeight: '500',
    fontSize: 15,
    paddingLeft: 15
  },
  textBoldStrike: {
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 12,
    textDecorationLine: 'line-through'
  },
  button: {
    backgroundColor: "#21D375",
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8
  },
});


