import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import FaqImage from "../../assets/faq.png";

const FAQ = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleItem = (id) => {
    if (id === expandedId) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const faqData = [
    {
      id: 1,
      question: "How do I request a ride?",
      answer:
        'To request a ride, simply open the app and tap on the "Request Ride" button. Enter your pickup location and destination, then confirm your ride request.',
    },
    {
      id: 2,
      question: "How do I cancel a ride?",
      answer:
        'You can cancel your ride by tapping on the "Cancel Ride" button in the app. Please note that cancellation fees may apply if you cancel after a certain period.',
    },
    {
      id: 3,
      question: "How do I change my payment method?",
      answer:
        'To change your payment method, go to the "Payment" section in the app settings. You can add a new payment method or remove an existing one.',
    },
    {
      id: 4,
      question: "What should I do if my driver is late?",
      answer:
        "If your driver is running late, you can track their location in the app to get real-time updates on their estimated time of arrival. If you have any concerns, you can contact the driver directly through the app.",
    },
    {
      id: 5,
      question: "How do I contact customer support?",
      answer:
        'You can contact customer support through the "Help" section in the app. You can also find answers to common questions in the FAQ section.',
    },
    // Add more FAQ items as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Do you have Questions? </Text>
      <Image
          source={FaqImage}
          style={styles.faqImage}
        />
      <Text style={styles.titledetails}>
        Below you'll find answers to the most common questions you may on
        Advertising. If you still can't find the answer you're looking for,just
        Contact us!
      </Text>
        
      {faqData.map(({ id, question, answer }) => (
        <TouchableOpacity key={id} onPress={() => toggleItem(id)}>
          <View style={styles.faqItem}>
            <Text style={styles.question}>{question}</Text>
            <MaterialIcons
              name={expandedId === id ? "keyboard-arrow-down": "keyboard-arrow-right" }
              size={24}
              color="#21D375"
            />
          </View>
          {expandedId === id && <Text style={styles.answer}>{answer}</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    marginVertical: 100,
    alignItems: 'center'
    // justifyContent: "center",
  },
  faqImage: {
    width: "100%",
    height: 180
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  titledetails: {
    fontSize: 15,
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 25
  },
  faqItem: {
    flexDirection: "row",
    // alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  question: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    borderBottomWidth: 0.2,
  },
  answer: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
});

export default FAQ;
