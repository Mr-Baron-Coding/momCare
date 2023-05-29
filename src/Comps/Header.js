import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// icons
import Logo from '../../assets/SVG/logo';
import Menu from '../../assets/SVG/UserIcons/menu';
import Heart from '../../assets/SVG/UserIcons/heart';
import Search from '../../assets/SVG/UserIcons/search';
import Mail from '../../assets/SVG/UserIcons/mail';
import Back from '../../assets/SVG/UserIcons/back';


export default function Header({ showSearch, showProfile, messHeader, loggedUser, heightVar, heightProp, name }) {
    const navigation = useNavigation();
    const [field, setField] = useState('');
    const [location, setLocation] = useState('');
    // const { userName, profilePic }  = route.params;

    const searchBox = () => {
        return (
            <View style={styles.searchBox}>
                <View style={styles.searchField}>
                    <Text style={styles.fontStyling}>Field:</Text>
                    <TextInput 
                        placeholder={name}
                        placeholderTextColor={'#C4A7B5'}
                        value={field}
                        onChangeText={ (text) => setField(text) }
                        style={styles.inputStyle}
                    />
                </View>
                <View style={styles.searchField}>
                    <Text style={styles.fontStyling}>City:</Text>
                </View>
            </View>
        )
    };

    const profileHeader = () => {
        return (
            <View style={{ position: 'relative'}}>
                <Text style={{ position: 'absolute', width: '40%', right: 10, bottom: 0, fontFamily: 'Quicksand', fontWeight: '700', fontSize: 20, color: '#FFFFFF' }}>{loggedUser.userName}</Text>
                {/* <Image 
                    style={{
                        resizeMode: 'cover',
                        width: 150,
                        height: 150,
                        borderRadius: 105,
                        position: 'absolute',
                        bottom: -50, 
                        left: 20,
                        
                    }}
                    source={{uri: profilePic}}
                /> */}
            </View>
        )
    };

    const messageHeader = () => {
        return (
            <View>
                <Text style={{ fontFamily: 'Quicksand', fontWeight: '700', fontSize: 20, color: '#FFFFFF', paddingHorizontal: 20 }}>{name}</Text>
            </View>
        )
    };

  return (
    <View style={[styles.container, {height: heightProp}]}>
        <View style={styles.logoContainer}>
            <Logo height={heightVar} />
            <View style={styles.buttonContainer}>
                <Mail />
                { !messHeader && <Search /> }
                { !messHeader && <Heart /> }
                <Menu />
            </View>
            <TouchableOpacity style={styles.backContainer} onPress={ () => navigation.goBack() }>
                <Back />
            </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
            {showSearch && searchBox()}
            {showProfile && profileHeader()}
            {messHeader && messageHeader()}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFA299',
        justifyContent: 'space-between',
        // alignItems: 'center',
        // height: 200,
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
    searchContainer: {
        // borderColor: 'black',
        // borderWidth: 2,
        bottom: 10
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
    inputStyle: {
        outlineStyle: 'none',
        fontFamily: 'Quicksand',
        fontWeight: '400',
        width: '100%'
    }
});