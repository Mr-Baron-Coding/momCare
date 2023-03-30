import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import { Wrap } from '@react-native-material/core';

//icons
import Logo from '../../assets/SVG/logo';

import Nut from '../../assets/SVG/nutritionist';
import Lac from '../../assets/SVG/lac';
import Sleep from '../../assets/SVG/sleep';
import Doula from '../../assets/SVG/doula';
import Osteopathy from '../../assets/SVG/osteopathy';
import Acupuncture from '../../assets/SVG/acupuncture';
import PostDula from '../../assets/SVG/pDula';
import Reflo from '../../assets/SVG/reflo';
import Homoyo from '../../assets/SVG/homoyphaty';
import BabyDav from '../../assets/SVG/babydev';
import PregSupport from '../../assets/SVG/pregsupport'
import Presupport from '../../assets/SVG/presupport';


// fonts
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';

export default function Homescreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
});
if (!fontsLoaded) {
    return null;
};

// const fieldsBox = () => {
//   const fieldsArray = Array.from({ length: 12 }, (value, index) => index );
//   return fieldsArray;

// };
const fieldsArray = Array.from([<Lac />, <BabyDav />,<Nut />, <Sleep />, <Doula />, <Osteopathy />, <Acupuncture />, <PostDula />, <Reflo />, <Homoyo />, <PregSupport />,<Presupport />]);


  const handleClick = () => {
    signOut(auth).then(() => {
      console.log('Logged out');
      navigation.navigate('Welcome')
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
        {/* <Text>Homescreen</Text> */}
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyHeader}>All fields of care</Text>
        {/* <View style={styles.bodyFields}> */}
        <Wrap m={4} spacing={5} items='center' style={{ width: '100%', justifyContent:'center'}}>
          { fieldsArray.map(item => {
            return (
              <View style={styles.fieldItems}>
                {item}
              </View>
            )
          })}
        </Wrap>
        <Button title='Logout' onPress={ () => handleClick() } />
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
      backgroundColor: '#FFA299',
      justifyContent: 'center',
      alignItems: 'center',
      height: '15%'
    },
    body: {
      height: '70%',
      
      // justifyContent: 'center',
      // alignItems: 'center'
    },
    bodyHeader: {
      fontFamily: 'Poppins_700Bold', 
      color: '#562349',
      height: '5%'
    },
    bodyFields: {
      height: '95%'
    },
    fieldItems: {
      borderColor: '#C4A7B5',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      height: 100,
      width: 100
    }
});