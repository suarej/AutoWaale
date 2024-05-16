import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function SafetyPage() {
  return (
    <View>
      <View>
        <View style={{ marginTop: 50, marginLeft: 10 }}>
          <Feather
            name="arrow-left"
            size={30}
            color="black"
            onPress={() => router.back()}
          />
        </View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 45,
            paddingHorizontal: 20,
            marginTop: 20,
          }}
        >
          Safety checkup
        </Text>
        <Text
          style={{
            fontWeight: "400",
            fontSize: 15,
            paddingHorizontal: 20,
            marginVertical: 20,
          }}
        >
          To help Keep yourself safe on every trip, review your current safety
          settings.
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 16,
          }}
        >
          {" "}
          Safety help
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 29,
            paddingBottom: 20,
            marginLeft: 20,
            borderBottomWidth: 0.2,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              marginTop: 8,
              // marginLeft: 20,
            }}
          >
            Learn how to get help during a trip
          </Text>
          <AntDesign name="right" size={18} color="black" />
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 18,
            marginTop: 16,
          }}
        >
          Trusted contacts
        </Text>
        <View
          
        >
          <TouchableOpacity
            onPress={() => router.push("/profileDetails/trustedPage")}
            style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 30,
          }}
          >
          <Text
            style={{
              fontSize: 15,
              marginLeft: 19,
              marginTop: 8,
              borderBottomWidth: 0.2,
              paddingBottom: 20,
            }}
          >
            Choose friends or family so you can quickly share your location,
            trip status and other details
          </Text>
          <AntDesign name="right" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
