import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'; // Assuming you are using Firebase for authentication
import { FIREBASE_AUTH } from '../firebaseConfig';
import * as WebBrowser from 'expo-web-browser'
WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = () => {
//   const [request, response, promptAsync] = AuthSession.useAuthRequest({
//     responseType: 'code',
//     clientId: '703850719523-di5sa0rmbkvbhr0nr0hn817c61je7c4i.apps.googleusercontent.com',
//     redirectUri: AuthSession.makeRedirectUri(),
//     scopes: ['openid', 'profile', 'email'],
//   });

const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '489070959283-rimu5scfibji6dci9um0fhtcqs2n2on5.apps.googleusercontent.com',
    clientId: '489070959283-rimu5scfibji6dci9um0fhtcqs2n2on5.apps.googleusercontent.com',
    expoClientId: '489070959283-rimu5scfibji6dci9um0fhtcqs2n2on5.apps.googleusercontent.com',
    androidClientId: '489070959283-rimu5scfibji6dci9um0fhtcqs2n2on5.apps.googleusercontent.com',
  });

  const handleSignIn = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error('Error starting Google sign-in:', error);
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, credential)
    }
  }, [response]);

  return (
    <View>
      <Button title="Sign in with Google" onPress={handleSignIn} disabled={!request}/>
    </View>
  );
};

export default GoogleSignIn;
