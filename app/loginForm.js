import { useState } from "react";
import { ActivityIndicator, Button, StyleSheet, TextInput, View } from "react-native";
import {FIREBASE_AUTH} from '../firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth'
import {router} from 'expo-router';

export default function Loginform () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            alert('Sign in failed: ' + error.message )
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        router.push('/signUp');
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none"
                        onChangeText={(text)=> setEmail(text)}>
            </TextInput>
            <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none"
                        onChangeText={(text)=> setPassword(text)}>
            </TextInput>
            {
                loading ? <ActivityIndicator size="large" color="#0000ff" /> : <>

                    <Button title="Login" onPress={signIn} />
                    
                    <Button title="Create account" onPress={signUp} />
                </>
            }
        </View>
    )
};

const styles= StyleSheet.create({

})