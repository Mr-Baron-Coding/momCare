import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import FieldIcoons from '../Comps/FieldIcoons';
import Reviews from '../Comps/Reviews';
import News from '../Comps/News';
import Map from './Map';
import Footer from '../Comps/Footer';
import MenuScreen from '../Comps/Menu';

//icons
import Logo from '../../assets/SVG/logo';
// users icons
import MailLogo from '../../assets/SVG/UserIcons/mail';
import Search from '../../assets/SVG/UserIcons/search';
import Heart from '../../assets/SVG/UserIcons/heart';
import Menu from '../../assets/SVG/UserIcons/menu';

// fonts
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';

export default function Homescreen({ navigation }) {
  const [menuWindow, setMenu] = useState(false);
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
  // { screen: <Map />, id: 4 },
  { screen: <Footer />, id: 4 },
];

  return (
    <View style={styles.container}>
      <MenuScreen menuWindow={menuWindow} closeMenu={ () => setMenu(false) } />
      <View style={styles.header}>
        <View style={styles.navIcons}>
          <MailLogo />
          {/* <TouchableOpacity onPress={ () => navigation.navigate('Map') } >
            <Search />
          </TouchableOpacity> */}
          <Heart />
          <TouchableOpacity onPress={ () => setMenu(true)}>
            <Menu />
          </TouchableOpacity>
        </View>  
        <Logo />
      </View>
      <FlatList style={styles.body}
        data={Data}
        renderItem={({item}) => item.screen}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        
    },
    header: {
      backgroundColor: '#FFA299',
      justifyContent: 'center',
      alignItems: 'center',
      height: '15%'
    },
    navIcons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      position: 'absolute',
      width: '40%',
      height: '30%',
      right: 0,
      top: 5,
    },
    body: {
      marginHorizontal: 15,
      marginVertical: 10,
    }
});