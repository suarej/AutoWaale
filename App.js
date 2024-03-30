import { SafeAreaView, StyleSheet, StatusBar } from "react-native";

//https://www.npmjs.com/package/react-native-maps-directions
//https://www.npmjs.com/package/react-native-maps
//https://www.npmjs.com/package/react-native-google-places-autocomplete

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000000" StatusBarStyle="dark-content" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // paddingTop: Platform.OS ==="android" ? 10 : 0,
  },
});
