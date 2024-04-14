import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider } from 'firebase/auth'; // Assuming you are using Firebase for authentication
import { FIREBASE_AUTH } from '../firebaseConfig';

const GoogleSignIn = () => {
//   const [request, response, promptAsync] = AuthSession.useAuthRequest({
//     responseType: 'code',
//     clientId: '703850719523-di5sa0rmbkvbhr0nr0hn817c61je7c4i.apps.googleusercontent.com',
//     redirectUri: AuthSession.makeRedirectUri(),
//     scopes: ['openid', 'profile', 'email'],
//   });

const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '703850719523-di5sa0rmbkvbhr0nr0hn817c61je7c4i.apps.googleusercontent.com',
  });

//   console.log(request, "req");
//   console.log(response, 'resp');

  const handleSignIn = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error('Error starting Google sign-in:', error);
    }
  };

  useEffect(() => {
    console.log('Got here');
    if (response?.type === 'success') {
        console.log('and here????');
      const { code } = response.params;
      fetchAccessToken(code);
    }
  }, [response]);

  const fetchAccessToken = async (code) => {
    try {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `client_id=703850719523-di5sa0rmbkvbhr0nr0hn817c61je7c4i.apps.googleusercontent.com` +
          `&client_secret=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` +
          `&code=${code}` +
          `&grant_type=authorization_code` +
          `&redirect_uri=${encodeURIComponent(AuthSession.makeRedirectUri())}`,
      });

    //   console.log(tokenResponse);

      const tokenData = await tokenResponse.json();
      const { access_token } = tokenData;

      // Sign in with Firebase using the access token
      const credential = GoogleAuthProvider.credential(null, access_token);
      // Authenticate with Firebase
      // Replace `firebase.auth()` with your Firebase authentication instance
      await FIREBASE_AUTH.signInWithCredential(credential);

      Alert.alert('Success', 'Signed in successfully');
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <View>
      <Button title="Sign in with Google" onPress={handleSignIn} disabled={!request}/>
    </View>
  );
};

export default GoogleSignIn;
