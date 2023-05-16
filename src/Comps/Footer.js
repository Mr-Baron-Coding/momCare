import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Divider } from '@rneui/base';

import { Poppins_700Bold, Poppins_300Light, useFonts } from '@expo-google-fonts/poppins';

export default function Footer() {
    let [fontsLoaded] = useFonts({
        Poppins_300Light,
    });
    if (!fontsLoaded) {
        return null;
    };

  return (
    <View style={styles.footer}>
        <View style={styles.footerOptions}>
            <Text style={{ fontFamily: 'Quicksand' }}>Feedback</Text>
                <Divider width={3} color={'#562349'} style={{ marginVertical: 20, height: '70%' }} orientation="vertical" />
            <Text style={{ fontFamily: 'Quicksand' }}>Regulations</Text>
                <Divider width={3} color={'#562349'} style={{ marginVertical: 20, height: '70%' }} orientation="vertical" />
            <Text style={{ fontFamily: 'Quicksand' }}>Privacy Policy</Text>
        </View>
        <View style={styles.custBottom}>
            <Text style={styles.custFont}>Customer service</Text>
            <Text style={styles.fontStyling}>info@momcare.com</Text>
            <Text style={styles.fontStyling}>Sunday to Thursday 9:00-17:00</Text>
            <Text style={styles.fontStyling}>*5544</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        // width: '100%',
        alignItems: 'center',
        rowGap: 30
    },
    footerOptions: {
        fontFamily: 'Quicksand',
        fontWeight: '300',
        fontSize: 12,
        color: '#562349',
        // height: '30%',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-around'
    },
    custFont: {
        fontFamily: 'Quicksand',
        fontWeight: '700',
        fontSize: 16,
        color: '#562349'
    },
    custBottom: {
        alignItems: 'center', 
        justifyContent: 'space-around',
        rowGap: 10
    },
    fontStyling: {
        fontFamily: 'Poppins_300Light',
        color: '#AD6989'
    }
})