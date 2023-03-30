import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Logo from '../../assets/SVG/logo';

// material
import { Divider } from '@rneui/base';

// fonts
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';


export default function Homescreen({ navigation }) {
    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
    });
    if (!fontsLoaded) {
        return null;
    };
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Logo />
            <Text style={styles.headerH1}>Be sure of your caregiver</Text>
            <Text style={styles.headerH2}>The care you need, with peace of mind.</Text>
        </View>
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
        <View style={styles.footer}>
            <Text>Feedback</Text>
                <Divider width={3} color={'#562349'} style={{ marginVertical: 20, height: '70%' }} orientation="vertical" />
            <Text>Regulations</Text>
                <Divider width={3} color={'#562349'} style={{ marginVertical: 20, height: '70%' }} orientation="vertical" />
            <Text>Privacy Policy</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF'
    },
    header: {
        height: '40%',
        backgroundColor: '#FFA299',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerH1: {
        fontSize: 24,
        lineHeight: 40,
        color: 'white',
    },
    headerH2: {
        fontSize: 16,
        lineHeight: 30,
        color: 'white'
    },
    body: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
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
        // fontWeight: '700',
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
    footer: {
        height: '10%',
        backgroundColor: '#F7F7F7',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});