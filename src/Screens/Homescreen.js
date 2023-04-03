import { StyleSheet, View, Text, FlatList } from 'react-native'
import React from 'react';

import FieldIcoons from '../Comps/FieldIcoons';
import Reviews from '../Comps/Reviews';
import News from '../Comps/News';

//icons
import Logo from '../../assets/SVG/logo';
// users icons
import MailLogo from '../../assets/SVG/UserIcons/mail';
import Search from '../../assets/SVG/UserIcons/search';
import Heart from '../../assets/SVG/UserIcons/heart';

// fonts
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';

export default function Homescreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
});
if (!fontsLoaded) {
    return null;
};

const Data = [
  { screen: <FieldIcoons />, id: 1 },
  { screen: <Reviews />, id: 2 },
  { screen: <News />, id: 3 },
];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.navIcons}>
          <MailLogo />
          <Search />
          <Heart />
        </View>  
        <Logo />
      </View>
      <FlatList style={styles.body}
        data={Data}
        renderItem={({item}) => item.screen}
        keyExtractor={item => item.id}
      />
      <View style={styles.footer}>
       <Text>Footer</Text> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        
    },
    header: {
      backgroundColor: '#FFA299',
      justifyContent: 'center',
      alignItems: 'center',
      height: '15%'
    },
    navIcons: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: '30%',
      height: '30%',
      right: 0,
      top: 5,
      flexDirection: 'row'
    },
    body: {
      marginHorizontal: 15,
      marginVertical: 10,
      // overflow: 'scroll'
    },
    footer: {
      height: '10%',
      backgroundColor: '#F7F7F7',
      flexDirection: 'row',
      alignItems: 'center', 
      justifyContent: 'space-around'
  }
});