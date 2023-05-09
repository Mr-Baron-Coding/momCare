import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';

import AboutSection from './AboutCards/AboutSection';
import CertSection from './AboutCards/CertSection';
import CareAreaSection from './AboutCards/CareAreaSection';
import ContactSection from './AboutCards/ContactSection';

//icons
import Edit from '../../../assets/SVG/UserIcons/edit';
import Footer from '../Footer';

export default function AboutComp({ data }) {
    const aboutList = [
        { header: 'About', data: data.about, id: 'about1'},
        { header: 'Certificates and qualification', data: data.cernqual, id: 'about2'},
        { header: 'Care area', data: data.carearea, id: 'about3'},
        { header: 'Contact info', data: data.contact, id: 'about4'},
    ];

    const [showAbout, setShowAbout] = useState(true);
    const [showCert, setShowCert] = useState(true);
    const [showArea, setShowArea] = useState(true);
    const [showContact, setShowContact] = useState(true);

    const changeShowAbout = (x) => {
        setShowAbout(x);
    };
    const changeShowCert = (x) => {
        setShowCert(x);
    };
    const changeShowArea = (x) => {
        setShowArea(x);
    };
    const changeShowContact = (x) => {
        setShowContact(x);
    };

    // editable icon control
    const ProfileEditCard = ({ item }) => {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.cardHeaderContainer}>
                    <Text style={styles.cardTextStyle}>{item.header}</Text>
                    { (!showAbout && item.header === 'About') && <TouchableOpacity onPress={ () => {setShowAbout(!showAbout)}}><Edit /></TouchableOpacity> }
                    { (!showCert && item.header === 'Certificates and qualification') && <TouchableOpacity onPress={ () => {setShowCert(!showCert)}}><Edit /></TouchableOpacity> }
                    { (!showArea && item.header === 'Care area') && <TouchableOpacity onPress={ () => {setShowArea(!showArea)}}><Edit /></TouchableOpacity> }
                    { (!showContact && item.header === 'Contact info') && <TouchableOpacity onPress={ () => {setShowContact(!showContact)}}><Edit /></TouchableOpacity> }
                </View>
                {item.id === 'about1' && <AboutSection data={data} showAbout={showAbout} setShowAbout={(x) => changeShowAbout(x)} />}
                {item.id === 'about2' && <CertSection data={data} showCert={showCert} setShowCert={(x) => changeShowCert(x)} />}
                {item.id === 'about3' && <CareAreaSection data={data} showArea={showArea} setShowArea={(x) => changeShowArea(x)} />}
                {item.id === 'about4' && <ContactSection data={data} showContact={showContact} setShowContact={(x) => changeShowContact(x)} />}
            </View>
        )
    };

  return (
    <View>
        <FlatList 
            data={aboutList}
            keyExtractor={(item, index) => index}
            renderItem={ProfileEditCard}
            listKey='Profile'
            // renderItem={({item}) => <ProfileEditCard item={item} />}
        />
        <Footer />
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