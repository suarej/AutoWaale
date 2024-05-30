import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Bar } from 'react-native-progress';

const Loader = ({ isLoading, progress, message }) => {

  return (
    <View style={styles.container}>
       
        <Bar
          progress={progress}
          indeterminate
          width={350}
          color="#1abc9c"
          height={4}
          borderRadius={0}
          borderWidth={0}
          unfilledColor="rgba(255,255,255,0.2)"
        />
      <Text style={styles.message}> {message} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 10,
    position: 'absolute',
    bottom: 50
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    padding: 25, 
    paddingHorizontal: 40,
    backgroundColor: 'white',
    borderBottomWidth: 1
  }
});

export default Loader;
