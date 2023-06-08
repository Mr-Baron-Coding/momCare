import { StyleSheet, Text, View, TouchableOpacity, Animated, TextInput } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

//rduex
import { useSelector } from 'react-redux';

//icons
import Logo from '../../../assets/SVG/logo';
import Back from '../../../assets/SVG/UserIcons/back';
//>> icons row
import Heart from '../../../assets/SVG/UserIcons/heart';
import MenuIcon from '../../../assets/SVG/UserIcons/menu';
import Mail from '../../../assets/SVG/UserIcons/mail';
import Search from '../../../assets/SVG/UserIcons/search';

// fonts
import { Poppins_700Bold, Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';

export default function UserHeader({ heightVar=200, logoHeight=100, logoWidth=200, showBackIcon=false, showUserIcons=false, showHeaderText=false, setMenu, setShownComp, searchFieldFill='', messActive=false, provName='', isLookingAtProvider=false }) {
  const navigation = useNavigation();
  const likeList = useSelector((state) => state.data.likeData);
  const loggedUser = useSelector((state) => state.data.userData);
  const selectedProvider = useSelector((state) => state.data.selectedProvider);
  const slideAnimation = useRef(new Animated.Value(heightVar)).current;
  const [isSearchOpen, setOpenSearch] = useState(false);
  const [searchByField, setSearchField] = useState('');
  const [searchByLocation, setSearchLocation] = useState('');

  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_400Regular
  });
  if (!fontsLoaded) {
      return null;
  };
   
  const slide = (x) => {
      Animated.timing(slideAnimation, {
          toValue: x,
          duration: 2000,
          useNativeDriver: true,
      }).start();
      setOpenSearch(!isSearchOpen);
  };

  //  search fields
  const searchBox = () => {
    return (
        <View style={styles.searchBox}>
            <View style={styles.searchField}>
                <Text style={styles.fontStyling}>Field:</Text>
                <TextInput 
                    placeholder={searchFieldFill !== '' ? searchFieldFill : 'Search by field'}
                    placeholderTextColor={'#C4A7B5'}
                    value={searchByField}
                    onChangeText={ (text) => setSearchField(text) }
                    style={styles.inputStyle}
                />
            </View>
            <View style={styles.searchField}>
                <Text style={styles.fontStyling}>City:</Text>
                <TextInput 
                    placeholder='Search by location'
                    placeholderTextColor={'#C4A7B5'}
                    value={searchByLocation}
                    onChangeText={ (text) => setSearchLocation(text) }
                    style={styles.inputStyle}
                />
            </View>
        </View>
    )
};

  return (
    <View style={[styles.headerContainer, {height: slideAnimation.interpolate({inputRange: [0,1], outputRange: [heightVar, 200]}) } ]}>
      {showBackIcon && 
        <TouchableOpacity style={{ position: 'absolute', top: 20, left: 20, zIndex: 5 }} onPress={ () => navigation.goBack()}>
          <Back />
        </TouchableOpacity>}
      {showUserIcons && 
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={ () => slide(isSearchOpen ? 1 : 0) }><Search /></TouchableOpacity>
          <TouchableOpacity onPress={ () => setShownComp(1) }><Mail /></TouchableOpacity>
          <TouchableOpacity onPress={ () => setShownComp(2) }><Heart color={ likeList.length > 0 ? '#562349' : 'white' } /></TouchableOpacity>
          <TouchableOpacity onPress={ () => setMenu(true)}><MenuIcon /></TouchableOpacity>
        </View>}
        {/* logog container */}
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={ () => setShownComp(0) }>
          <Logo height={logoHeight} width={logoWidth} />
        </TouchableOpacity>
      </View>
      {/* show the header on login pages */}
      {showHeaderText &&
        <View>
          <Text style={styles.headerH1}>Be sure of your caregiver</Text>
          <Text style={styles.headerH2}>The care you need, with peace of mind.</Text>
        </View>}
        {/* show serach */}
      {isSearchOpen && searchBox()}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {/* show user name */}
        {(!showHeaderText && loggedUser.userName !== '') 
        && <Text style={styles.bottomHeaderTextStyle}>{`Hi ${loggedUser.userName}`}</Text>}
        {/* show incase checking provider */}
        {isLookingAtProvider && <Text style={styles.bottomHeaderTextStyle}>u are checking out {selectedProvider.userName}</Text>}
        {/* show incase messaging provider */}
        {messActive && <Text style={styles.bottomHeaderTextStyle}>you are speaking with {provName}</Text>}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFA299',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
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
  searchBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  searchField: {
    width: '80%',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderColor: '#562349',
    borderWidth: 2,
    height: 32,
    borderRadius: 38,
    paddingHorizontal: 10,
    alignItems: 'center',
    columnGap: 5
  },
  searchLocation: {},
  fontStyling: {
    fontFamily: 'Quicksand',
    fontWeight: '900',
    fontSize: 16,
    lineHeight: 20
  },
  bottomHeaderTextStyle: {
    fontFamily: 'Quicksand', 
    fontWeight: '700', 
    fontSize: 20, 
    color: '#FFFFFF'
  }
});