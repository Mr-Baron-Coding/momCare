import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Wrap } from '@react-native-material/core';

//icons
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

export default function FieldIcoons() {
    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
    });
    if (!fontsLoaded) {
        return null;
    };

    const handleClick = () => {
        signOut(auth).then(() => {
          console.log('Logged out');
          navigation.navigate('Welcome')
        }).catch((error) => {
            console.log(error);
        });
    }

    const fieldsArray = Array.from([
        {logo: <Lac />, name: 'Lactation consultant'}, 
        {logo: <BabyDav />, name: 'Baby development'},
        {logo: <Nut />, name: 'Nutritionists'}, 
        {logo: <Sleep />, name: 'Sleep consultant'}, 
        {logo: <Doula />, name: 'Birth Doula'}, 
        {logo: <Osteopathy />, name: 'Osteopathy'}, 
        {logo: <Acupuncture />, name: 'Acupuncture'}, 
        {logo: <PostDula />, name: 'Postpartum doula'}, 
        {logo: <Reflo />, name: 'Reflexology'}, 
        {logo: <Homoyo />, name: 'Homeopathy'}, 
        {logo: <PregSupport />, name: 'Pregnancy support'},
        {logo: <Presupport />, name: 'Personal development'}
      ]);

  return (
    <View>
      <Text style={styles.bodyHeader}>All fields of care</Text>
        <Wrap m={4} spacing={5} items='center' style={{ width: '100%', justifyContent:'center'}}>
          { fieldsArray.map((item, i) => {
            return (
              <View key={i} style={styles.fieldItems}>
                {item.logo}
                <Text style={styles.Fieldheader}>{item.name}</Text>
              </View>
            )
          })}
        </Wrap>
        {/* <Button title='Logout' onPress={ () => handleClick() } /> */}
    </View>
  )
}

const styles = StyleSheet.create({
    bodyHeader: {
        fontFamily: 'Poppins_700Bold', 
        color: '#562349',
        height: '5%',
        marginTop: 10,
        marginBottom: 10
    },
    fieldItems: {
        borderColor: '#C4A7B5',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        height: 100,
        width: 100,
        borderRadius: 10,
    
    },
    Fieldheader: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 10,
        color: '#AD6989',
    },
});