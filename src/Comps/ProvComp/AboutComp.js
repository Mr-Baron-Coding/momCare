import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';

import AboutSection from './AboutCards/AboutSection';
import CertSection from './AboutCards/CertSection';

//icons
import Edit from '../../../assets/SVG/UserIcons/edit';

export default function AboutComp({ data }) {
    const aboutList = [
        { header: 'About', data: data.about, id: 'about1'},
        { header: 'Certificates and qualification', data: data.cernqual, id: 'about2'},
        { header: 'Care area', data: data.carearea, id: 'about3'},
        { header: 'Contact info', data: data.contact, id: 'about4'},
    ];

    const [show, setShow] = useState(true);

    const changeShow = (x) => {
        setShow(x);
    };

    // editable icon control
    const ProfileEditCard = ({ item }) => {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.cardHeaderContainer}>
                    <Text style={styles.cardTextStyle}>{item.header}</Text>
                    { !show && <TouchableOpacity onPress={ () => {changeShow(!show)}}><Edit /></TouchableOpacity> }
                </View>
                {item.id === 'about1' && <AboutSection data={data} show={show} setShow={(x) => changeShow(x) } />}
                {item.id === 'about2' && <CertSection />}
            </View>
        )
    };

  return (
    <View>
        <FlatList 
            data={aboutList}
            keyExtractor={(item, index) => index}
            renderItem={ProfileEditCard}
            // renderItem={({item}) => <ProfileEditCard item={item} />}
        />
    </View>
  )
};

const styles = StyleSheet.create({
    cardContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 5, 
        backgroundColor: '#FFFFFF',
        gap: 10
    },
    cardHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardTextStyle: {
        fontFamily: 'Poppins_700bold', 
        color: '#562349', 
        fontSize: 18
    },
    inputTextStyle: {
        fontFamily: 'Poppins_400Regular', 
        color: '#562349', 
        fontSize: 12,
        borderColor: '#562349',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    buttonStyle: {
        height: 30,
        width: 100,
        borderColor: '#562349',
        borderWidth: 2,
        borderRadius: 5,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    buttonTextStyle: {
        fontFamily: 'Poppins_700bold', 
        color: '#562349', 
        fontSize: 14,
    },
    formContainer: {
        zIndex: 10,
        margin: 'auto',
        backgroundColor: '#FFFFFF',
        height: '90%',
        width: '99%',
        position: 'absolute',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#562349',
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    closeContainer: {
        transform: [{ translateX : '100%'}]
    },
    openContainer: {
        transform: [{ translateX : '0%'}]
    },
    formTextStyle: {
        fontFamily: 'Poppins_400Regular', 
        color: '#562349', 
        fontSize: 14,
        lineHeight: 20,
        textTransform: 'capitalize'
    },
    inputformStyle: {
        width: '80%',
        fontFamily: 'Poppins_400Regular',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderColor: '#562349',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 5,
        marginBottom: 10,
        height: 48,
        color: '#562349',
        fontSize: 14,
    },
})