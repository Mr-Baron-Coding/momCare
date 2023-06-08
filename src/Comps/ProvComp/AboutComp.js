import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';

import AboutSection from './AboutCards/AboutSection';
import CertSection from './AboutCards/CertSection';
import CareAreaSection from './AboutCards/CareAreaSection';
import ContactSection from './AboutCards/ContactSection';

//icons
import Edit from '../../../assets/SVG/UserIcons/edit';

export default function AboutComp() {
    const aboutList = [
        { header: 'About', id: 'about1'},
        { header: 'Certificates and qualification', id: 'about2'},
        { header: 'Care area', id: 'about3'},
        { header: 'Contact info', id: 'about4'},
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
                {item.id === 'about1' && <AboutSection showAbout={showAbout} setShowAbout={(x) => changeShowAbout(x)} />}
                {item.id === 'about2' && <CertSection showCert={showCert} setShowCert={(x) => changeShowCert(x)} />}
                {item.id === 'about3' && <CareAreaSection showArea={showArea} setShowArea={(x) => changeShowArea(x)} />}
                {item.id === 'about4' && <ContactSection showContact={showContact} setShowContact={(x) => changeShowContact(x)} />}
            </View>
        )
    };

  return (
    <View style={{flex: 1}}>
        <FlatList 
            data={aboutList}
            keyExtractor={(item, index) => index}
            renderItem={ProfileEditCard}
            listKey='Profile'
        />
    </View>
  )
};

const styles = StyleSheet.create({
    cardContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 5, 
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
    }
})