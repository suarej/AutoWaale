import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AppContext } from '../context';
import { Entypo } from '@expo/vector-icons';

const FontSizePicker = () => {
  const { fontSize, changeFontSize } = useContext(AppContext);

  const increaseFontSize = () => {
    fontSize !== 28 && changeFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    fontSize !== 8 && changeFontSize(fontSize - 2);
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Entypo name="squared-plus" size={24} color="white" onPress={increaseFontSize}/>
      <Entypo name="squared-minus" size={24} color="white" onPress={decreaseFontSize}/>
    </View>
  );
};

export default FontSizePicker;
