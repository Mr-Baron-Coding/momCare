import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Logo from '../../assets/SVG/logo';

// material
import { Divider } from '@rneui/base';

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
        <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FAFAFA'
    },
    header: {
        // height: '30%',
        flex: 1,
        backgroundColor: '#FFA299',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerH1: {
        fontFamily: 'Quicksand',
        fontWeight: '700',
        color: '#FFE8E5',
        fontSize: 24,
        lineHeight: 40,
    },
    headerH2: {
        fontFamily: 'Quicksand',
        fontSize: 16,
        lineHeight: 30,
        color: 'white'
    },
    body: {
        // height: '50%',
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
});