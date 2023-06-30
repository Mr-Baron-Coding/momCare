import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function WelcomeComp({setCompShown}) {
  return (
    <View style={styles.body}>
        <TouchableOpacity
            // onPress={ () => navigation.navigate('Login') }
            onPress={ () => setCompShown(2) }
            style={[styles.button, styles.loginButton]}
            
        >
            <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
            // onPress={ () => navigation.navigate('Signup') }
            onPress={ () => setCompShown(1) }
            style={[styles.button, styles.signupButton]}
        >
            <Text style={styles.signText}>Create account</Text>
            </TouchableOpacity>
        </View>
  )
};

const styles = StyleSheet.create({
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    button: {
        elevation: 8,
        width: '80%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },
    loginButton: {
        backgroundColor: '#562349',
    },
    loginText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Poppins_700Bold'
    },
    signupButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#562349',
        borderWidth: 2.5
    },
    signText: {
        color: '#562349',
        fontSize: 16,
        fontFamily: 'Poppins_700Bold'
    },
});