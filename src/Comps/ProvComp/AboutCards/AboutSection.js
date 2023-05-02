import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

import { ref, get, update } from 'firebase/database';
import { database } from '../../../../firebase';
import { useEffect } from 'react';

export default function AboutSection({ data, show, setShow }) {
    // const [isEditing, setEditing] = useState(true);
    const [aboutChange, setAbout] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (data.about.length > 0) {
            setAbout(data.about);
            setShow(false);
        }
    },[]);

    const handleSubmit = () => {
        setLoading(prv => prv = true);
        update(ref(database, 'users/' + data.userID + '/' ), {
            about: aboutChange
        })
        .then(() => {
            console.log('Saved');
        })
        .then(() => {
            setLoading(prv => prv = false);
            setShow(false);
        })
        .catch((err) => {
            console.log(err);
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
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => handleSubmit()}>
                        <Text style={styles.buttonTextStyle}>{loading ? <ActivityIndicator size='small' color='#562349' /> : 'Save'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => setAbout('')}>
                        <Text style={styles.buttonTextStyle}>Clear</Text>
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
        show ? editable() : locked()      
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