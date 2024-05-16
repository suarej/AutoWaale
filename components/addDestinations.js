import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import DraggableFlatList from "react-native-draggable-flatlist";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function AddDestinations(props) {
  const { destinations, handleSetDestination, setShow } = props;
  const snapPoints = useMemo(() => ["35%", "50%", "90%"], []);
  const bottomSheetRef = useRef(null);
  const [stops, setStops] = useState([{ key: "1", name: "" }]); // Initialize with an empty stop
  const [addNewStop, setAddNewStop] = useState(false);
  const key = "AIzaSyDs6dddB4WI6-2C2XIPIRY1Lqdc64BuwZk";

  const addStop = () => {
    // const newStop = { key: (stops.length + 1).toString(), name: "" };
    // setStops([...stops, newStop]);
    // router.push('/addDestination')
    setAddNewStop(true);
  };

  const updateStop = (index, value) => {
    const updatedStops = [...stops];
    updatedStops[index].name = value;
    setStops(updatedStops);
  };

  const renderItem = ({ item, index, drag }) => (
    <TouchableOpacity style={styles.itemContainer} onLongPress={drag}>
      <TextInput
        value={item.name}
        onChangeText={(text) => updateStop(index, text)}
        placeholder={`Stop ${item.key}`}
        style={styles.textInput}
      />
      <AntDesign
        name="menuunfold"
        size={24}
        color="black"
        style={styles.icon}
      />
    </TouchableOpacity>
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={addNewStop ? 2 : 1}
      // enablePanDownToClose={true}
      // onChange={handleSheetChanges}
    >
    <TouchableOpacity style={{ marginLeft: 20, flexDirection: 'row'}}> 
        { addNewStop && <AntDesign
        name="arrowleft"
        size={24}
        color="black"
        onPress={()=> setAddNewStop(false)}
      />}
      <Text style={[styles.title, {marginLeft: addNewStop ? 90 : 100}]}>Add stops</Text>
    </TouchableOpacity>
      {addNewStop ? (
        <View style={styles.inputContainer}>
          <AntDesign
            name="search1"
            size={20}
            color="black"
            style={styles.icon2}
          />
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            onPress={(data, details = null) => {
              handleSetDestination(details);
              setAddNewStop(false);
            }}
            query={{
              key: key,
              language: "en",
              components: "country:in",
            }}
            fetchDetails={true}
            styles={{
              textInputContainer: styles.autocompleteContainer,
              textInput: styles.input,
              listView: styles.listView,
            }}
          />
        </View>
      ) : (
        <>
          <DraggableFlatList
            data={destinations}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            onDragEnd={({ data }) => setStops(data)}
          />
          <TouchableOpacity style={styles.button} onPress={addStop}>
            <Text style={styles.textBold}> ADD STOP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>setShow('')}>
            <Text style={styles.textBold}> DONE</Text>
          </TouchableOpacity>
        </>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
  },
  icon: {
    position: "absolute",
    right: 20,
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 0.2,
    padding: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 40,
    backgroundColor: "whitesmoke",
  },
  inputContainer: {
    flexDirection: "row",
    // flex: 1,
    // marginBottom: 0,
    position: "relative",
    borderWidth: 0.5,
    // padding: 6,
    borderRadius: 12,
    marginHorizontal: 20,
  },
  input: {
    // flex: 1,
    // height: 40,
    borderColor: "gray",
    borderBottomWidth: 0.2,
    borderRadius: 5,
    paddingLeft: 40,
    // zIndex: 0,
    // width: "50%"
  },
  icon2: {
    position: "absolute",
    left: 16,
    top: 13,
    zIndex: 1,
    marginRight: 10,
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
});
