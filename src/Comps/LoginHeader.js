import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

//icons
import Logo from '../../assets/SVG/logo';
import Back from '../../assets/SVG/UserIcons/back';
// fonts
import { Poppins_700Bold, Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';

export default function LoginHeader({showBackIcon=false, setCompShown}) {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        Poppins_700Bold, Poppins_400Regular
    });
    if (!fontsLoaded) {
        return null;
    };

  return (
    <View style={styles.headerContainer}>
      {showBackIcon && 
        <TouchableOpacity style={{ position: 'absolute', top: 20, left: 20, zIndex: 5 }} onPress={ () => setCompShown(0) }>
          <Back />
        </TouchableOpacity>}
        <View style={styles.logoContainer}>
            <Logo />
        </View>
        <View>
          <Text style={styles.headerH1}>Be sure of your caregiver</Text>
          <Text style={styles.headerH2}>The care you need, with peace of mind.</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#FFA299',
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerH1: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 20,
        lineHeight: 40,
        color: 'white',
    },
    headerH2: {
        fontFamily: 'Quicksand',
        fontSize: 16,
        lineHeight: 30,
        color: 'white'
    },
});