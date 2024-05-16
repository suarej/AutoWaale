import { StyleSheet, View, Text, Modal, Button, TouchableOpacity } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SchedulerModal(props) {
    const {closeScheduler} = props;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    hideTimePicker();
  };

  const today = new Date();
  // Calculate the maximum allowed date (30 days from today)
  const maxAllowedDate = new Date();
  maxAllowedDate.setDate(today.getDate() + 30);

  const formattedTime = selectedTime.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const formattedDate = selectedDate.toLocaleDateString(undefined, {
    weekday: 'short',
  month: 'long',
  day: 'numeric',
  });

  const handleSubmit = () => {
    props.setPickUptime([formattedDate,formattedTime])
    closeScheduler();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      //   visible={modalVisible}
      //   onRequestClose={closeModal}
    >
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={[styles.switchText,{marginRight:5}]}>When do you want to be picked up?</Text>
      <TouchableOpacity onPress={showDatePicker}>
      <Text style={styles.dateText}>{formattedDate}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        date={selectedDate}
        minimumDate={today} // Disable dates before today
        maximumDate={maxAllowedDate} // Disable dates after 30 days from today
      />
      <TouchableOpacity onPress={showTimePicker} >
      <Text style={styles.timeText}>{formattedTime}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
      <View>
      <View style={{flexDirection:"row",alignItems:"center",gap:15}}>
            <MaterialCommunityIcons name="credit-card-clock-outline" size={24} color="black" />
            <Text style={[styles.termsText, {marginRight:40}]}>
             Choose Your exact pick-up time up to 30 days in advance
            </Text>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",gap:15}}>
            <MaterialCommunityIcons name="timer-sand" size={30} color="black" />
            <Text style={[styles.termsText, {marginRight:40}]}>
        Extra wait time included to meet your trip
        </Text>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",gap:15}}>
        <Foundation name="credit-card" size={30} color="black" />
        <Text style={[styles.termsText, {marginRight:40}]}>
        Cancel at no charge up to 60 minutes in advance
        </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.textBold}>
                Set Pickup time
            </Text>
        </TouchableOpacity>
      </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    // backgroundColor: "#ffffff",
    // padding: 60,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 8,

    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    height: '95%',
    bottom: 0,
    gap: 10,
  },
  dateText: {
    fontSize: 20,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
    paddingBottom: 12
  },
  timeText: {
    fontSize: 20,
    textAlign: 'center'
  },
  switchText: {
    fontWeight: "bold",
    fontSize: 32,
    paddingBottom: 15,
    paddingTop:20
  },
  textBold: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16
  },
  button: {
    backgroundColor: "#21D375",
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 18,
    borderRadius: 50,
    marginVertical: 40,

  },
  termsText:{
    fontSize:18,
    paddingBottom:20,
    paddingTop:10,
    borderBottomWidth:0.2,
    borderBottomColor: "grey",
    opacity: 0.7

  }
});
