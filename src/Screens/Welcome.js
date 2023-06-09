import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import UserHeader from '../Comps/CustomersComp/UserHeader';

// fonts
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import Footer from '../Comps/Footer';

export default function Homescreen({ navigation }) {
    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
    });
    if (!fontsLoaded) {
        return null;
    };
  return (
    <View style={styles.container}>
        <UserHeader showHeaderText={true} />
        <View style={styles.body}>
            <TouchableOpacity
                onPress={ () => navigation.navigate('Login') }
                style={[styles.button, styles.loginButton]}
                
            >
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={ () => navigation.navigate('Signup') }
                style={[styles.button, styles.signupButton]}
            >
                <Text style={styles.signText}>Create account</Text>
            </TouchableOpacity>
        </View>
        <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    button: {
        elevation: 8,
        width: '80%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
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