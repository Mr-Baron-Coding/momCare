import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

//redux
import { useSelector } from 'react-redux';

//icons
import Logo from '../../../assets/SVG/logo';
import Mail from '../../../assets/SVG/UserIcons/mail';
import Heart from '../../../assets/SVG/UserIcons/heart';
import MenuIcon from '../../../assets/SVG/UserIcons/menu';
import Back from '../../../assets/SVG/UserIcons/back';
import { useNavigation } from '@react-navigation/native';

export default function ProviderHeader({ showBackIcon=true, showUserIcons=true, setMenu, logoHeight=50, logoWidth=100, showHeaderText=true, messActive=false }) {
    const navigation = useNavigation();
    const loggedProvider = useSelector((state) => state.providerData.loggedProvider);
    const chatingWith = useSelector((state) => state.providerData.selectedMessThread.sendersName);
  return (
    <View style={styles.headerContainer}>
        {showBackIcon && <TouchableOpacity style={{ position: 'absolute', top: 20, left: 20, zIndex: 5 }} onPress={ () => navigation.goBack()}><Back /></TouchableOpacity>}
        {showUserIcons && 
        <View style={styles.iconRow}>
            {/* <TouchableOpacity onPress={ () => slide(isSearchOpen ? 1 : 0) }>
                <Search />
            </TouchableOpacity> */}
            <TouchableOpacity>
                <Mail /></TouchableOpacity>
            {/* <TouchableOpacity onPress={ () => setShownComp(2) }> */}
                {/* <Heart /> */}
                {/* color={ likeList.length > 0 ? '#562349' : 'white' } */}
            {/* </TouchableOpacity> */}
            <TouchableOpacity onPress={ () => setMenu(true)}>
                <MenuIcon />
            </TouchableOpacity>
        </View>}
        <TouchableOpacity style={styles.logoContainer}>
            <Logo height={logoHeight} width={logoWidth} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 16 }}>
        {(showHeaderText && loggedProvider.userName !== '') 
            && <Text style={[{ fontFamily: 'Quicksand', fontWeight: '700', color: '#FFFFFF' }, !messActive ? {fontSize: 20} : {fontSize: 16}]}>{`Hi ${loggedProvider.userName}`}</Text>}
        {messActive && <Text style={{ fontFamily: 'Quicksand', fontWeight: '700', fontSize: 16, color: '#FFFFFF', textAlign: 'center', verticalAlign: 'middle' }}>you are speaking with {chatingWith}</Text>}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#FFA299',
        padding: 20,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});