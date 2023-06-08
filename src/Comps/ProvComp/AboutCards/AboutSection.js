import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { saveLoggedProviderData } from '../../../Redux/features/providerDataSlice';

import { ref, get, update } from 'firebase/database';
import { auth, database } from '../../../../firebase';

export default function AboutSection({ showAbout, setShowAbout }) {
    const dispatch = useDispatch();
    const providerData = useSelector((state) => state.providerData.loggedProvider);
    const [aboutChange, setAbout] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
            setAbout(providerData.about);
            setShowAbout(false);
    },[providerData]);

    const handleSubmit = () => {
        setLoading(true);
        update(ref(database, 'users/providers/' + auth.currentUser.uid + '/' ), {
            about: aboutChange
        })
        .then(() => {
            console.log('Saved');
            dispatch(saveLoggedProviderData({...providerData, about: aboutChange}))
        })
        .then(() => {
            setLoading(false);
            setShowAbout(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    };

    const editable = () => {
        return (
            <View style={{ gap: 10 }}>
                <TextInput 
                    placeholder='Tell a little about yourself'
                    value={aboutChange}
                    onChangeText={(text) => setAbout(text)}
                    multiline
                    numberOfLines={4}
                    style={styles.inputTextStyle}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 20 }}>
                    {aboutChange.length > 0 && <TouchableOpacity style={styles.buttonStyle} onPress={() => setAbout('')}>
                        <Text style={styles.buttonTextStyle}>Clear</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => handleSubmit()}>
                        <Text style={styles.buttonTextStyle}>{loading ? <ActivityIndicator size='small' color='#562349' /> : 'Save'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    const locked = () => {
        return (
            <View style={{ gap: 10 }}>
                <Text style={styles.aboutTextStyle}>{aboutChange}</Text>
            </View>
        )
    }

  return (
        showAbout ? editable() : locked()      
  )
}

const styles = StyleSheet.create({
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
    aboutTextStyle: {
        fontFamily: 'Poppins_400Regular', 
        color: '#562349', 
        fontSize: 14,
        lineHeight: 20,
        textTransform: 'capitalize'
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
});