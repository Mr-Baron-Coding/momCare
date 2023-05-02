import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react';

import { database } from '../../firebase';

//icons
import Logo from '../../assets/SVG/logo';
import Menu from '../../assets/SVG/UserIcons/menu';
import Heart from '../../assets/SVG/UserIcons/heart';
import Search from '../../assets/SVG/UserIcons/search';
import Mail from '../../assets/SVG/UserIcons/mail';
import Back from '../../assets/SVG/UserIcons/back';

//fonts
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';

export default function ProviderHeader({ data }) {
    
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    });
    if (!fontsLoaded) {
        return null;
  };
    
  return (
    <View style={[styles.container, {height: 100}]}>
        <View style={styles.logoContainer}>
            <Logo height={20} />
            <View style={styles.buttonContainer}>
                <Mail />
                <Menu />
            </View>
            <TouchableOpacity style={styles.backContainer} onPress={ () => navigation.goBack() }>
                <Back />
            </TouchableOpacity>
        </View>
        <View style={styles.hiTextContainer}>
            <Text style={styles.hiText}>Hi {data}</Text>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFA299',
        justifyContent: 'space-between',
    },
    logoContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '40%'
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 15,
        top: 15
    },
    backContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 15,
        top: 15
    },
    hiTextContainer: {
        marginHorizontal: 20,
        paddingBottom: 10
    },
    hiText: {
        fontFamily: 'Quicksand',
        fontWeight: '700',
        fontSize: 16,
        color: '#FFFFFF'
    }
});