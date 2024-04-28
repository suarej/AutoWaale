import { View, Text, StyleSheet } from "react-native"

export default function PastRides () {
    return (
        <View style={styles.container}>
            <Text> Past Rides </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})