import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {router} from 'expo-router';

const Privacy = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.text}>
        At Rikshawaale, we take your privacy seriously. We collect some personal information 
        when you use our app, such as your name and email address for account registration 
        and communication purposes. We may also collect usage data to improve our services 
        and provide a better experience for you.
      </Text>
      <Text style={styles.text}>
        Rest assured, we do not sell or share your personal information with third parties 
        without your consent. We use industry-standard security measures to protect your 
        data from unauthorized access or disclosure.
      </Text>
      <TouchableOpacity style={styles.closeButton} onPress={()=> router.back()}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    margin: 20,
    marginVertical: 100,
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Privacy;
