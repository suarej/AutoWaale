import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import FaqImage from "../../assets/faq.png";
import { DB } from "../../firebaseConfig";
import { child, get, getDatabase, ref, set, update } from "firebase/database";

const FAQ = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [faqs, setFaqs] = useState([]);

  const fetchFaq = async () => {
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `faq`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setFaqs(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchFaq();
  }, []);

  const toggleItem = (id) => {
    if (id === expandedId) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const faqData = [
    {  
      "question": "How do I change my payment method?",  
       "answer": "To change your payment method, go to the Payment section in the app settings.You can add a new payment method or remove an existing one."
    },
  ];

  const renderFAQs = () => {
    return Object.entries(faqs).map(([sectionKey, section]) => (
      <View key={sectionKey}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          {section.title}
        </Text>
        {renderQuestions(section.questions)}
      </View>
    ));
  };

  const renderQuestions = (questions) => {
    const questionElements = [];
    for (const questionKey in questions) {
      const question = questions[questionKey];
      questionElements.push(
        <TouchableOpacity
          key={questionKey}
          onPress={() => toggleItem(questionKey)}
        >
          <View key={questionKey} style={styles.faqItem}>
            <Text style={styles.question}>{question.question}</Text>
            <MaterialIcons
              name={
                expandedId === questionKey
                  ? "keyboard-arrow-down"
                  : "keyboard-arrow-right"
              }
              size={24}
              color="#21D375"
            />
          </View>
          {expandedId === questionKey && (
            <Text style={styles.answer}>{question.answer}</Text>
          )}
        </TouchableOpacity>
      );
    }
    return questionElements;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Do you have Questions? </Text>
      <Image source={FaqImage} style={styles.faqImage} />
      <Text style={styles.titledetails}>
        Below you'll find answers to the most common questions you may on
        Advertising. If you still can't find the answer you're looking for,just
        Contact us!
      </Text>
      {renderFAQs()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    marginVertical: 100,
    // alignItems: 'center'
    // justifyContent: "center",
  },
  faqImage: {
    width: "100%",
    height: 180,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  titledetails: {
    fontSize: 15,
    // justifyContent: "center",
    // alignContent: "center",
    paddingVertical: 25,
  },
  faqItem: {
    flexDirection: "row",
    // width: "100%",
    marginBottom: 10,
  },
  question: {
    // flex: 1,
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
