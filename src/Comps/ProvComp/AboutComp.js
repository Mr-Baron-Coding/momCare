import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';

import AboutSection from './AboutCards/AboutSection';
import CertSection from './AboutCards/CertSection';
import CareAreaSection from './AboutCards/CareAreaSection';
import ContactSection from './AboutCards/ContactSection';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { changeEditOption } from '../../Redux/features/providerDataSlice';

//icons
import Edit from '../../../assets/SVG/UserIcons/edit';

export default function AboutComp() {
    const dispatch = useDispatch();
    const sectionEdit = useSelector((state) => state.providerData.providerHomescreenSections);
    const aboutList = [
        { header: 'About', id: 'about1'},
        { header: 'Certification and qualification', id: 'about2'},
        { header: 'Care area', id: 'about3'},
        { header: 'Contact info', id: 'about4'},
    ];

    // editable icon control
    const ProfileEditCard = ({ item }) => {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.cardHeaderContainer}>
                    <Text style={styles.cardTextStyle}>{item.header}</Text>
                    { (!sectionEdit.showAbout && item.header === 'About') && 
                        <TouchableOpacity onPress={ () => dispatch(changeEditOption({ type: 'showAbout', state: true }))}>
                            <Edit />
                        </TouchableOpacity> }
                    { (!sectionEdit.showCert && item.header === 'Certification and qualification') &&
                        <TouchableOpacity onPress={ () => dispatch(changeEditOption({ type: 'showCert', state: true })) }>
                            <Edit />
                        </TouchableOpacity> }
                    { (!sectionEdit.showArea && item.header === 'Care area') && 
                        <TouchableOpacity onPress={ () => dispatch(changeEditOption({ type: 'showArea', state: true }))}>
                            <Edit />
                        </TouchableOpacity> }
                </View>
                {item.id === 'about1' && <AboutSection />}
                {item.id === 'about2' && <CertSection />}
                {item.id === 'about3' && <CareAreaSection />}
                {item.id === 'about4' && <ContactSection />}
            </View>
        )
    };

  return (
    // <View style={{flex: 1}}>
        <FlatList 
            data={aboutList}
            keyExtractor={(item, index) => index}
            renderItem={ProfileEditCard}
            listKey='Profile'
            style={{ flex: 1 }}
        />
    // </View>
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