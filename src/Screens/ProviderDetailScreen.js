import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

import Header from '../Comps/Header';
import { color } from '@rneui/base';

export default function ProviderDetailScreen({ route }) {
    const { fields } = route.params;
    const [tabScreen, setScreen] = useState(1);

    useEffect(() => {
        console.log(route.params);
    },[route]);

  return (
    <View style={styles.mainContainer}>
        <Header showSearch={false} showProfile={true} route={route} heightVar={20} />
        <View style={styles.bodyContainer}>
            <View style={styles.filedsContainer}>
                <FlatList 
                    data={fields}
                    renderItem={({item}) => <Text style={styles.textStyling}>{item}</Text>}
                    keyExtractor={item => item.id}
                    
                />
            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.selectTabs}>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={ () => setScreen(1) }>
                    <Text style={[{ fontFamily: 'Poppins_700Bold' }, { width: '90%', textAlign: 'center', backgroundColor: '#562349', color : '#FFFFFF', borderRadius: 20 }]}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={ () => setScreen(2) }>
                    <Text style={{ fontFamily: 'Quicksand', width: '90%', color: '#562349', textAlign: 'center', }}>Reviews</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#FAFAFA'
    },
    bodyContainer: {
        paddingTop: 50,
    },
    filedsContainer: {
        paddingHorizontal: 15
    },
    textStyling: {
        fontFamily: 'Quicksand',
        fontWeight: '500',
        fontSize: 14,
        color: '#562349'
    },
    buttonContainer: {
        backgroundColor: '#562349',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 15,
        height: 28
        // width: '100%'
    },
    buttonText: {
        fontFamily: 'Poppins_700Bold',
        color: '#FFFFFF',
        
    },
    selectTabs: {
        borderBottomColor: '#562349',
        borderBottomWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 15,
    }
});

// style={{
        //     shadowColor: 'black',
        //     shadowOffset: {
        //         width: 0,
        //         height: 8,
        //     },
        //     shadowOpacity: 0.46,
        //     shadowRadius: 11.14,
        // }}