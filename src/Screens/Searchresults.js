import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../Comps/Header';
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { useEffect } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
import { database } from '../../firebase';

export default function Searchresults({ route }) {
    const { id, name } = route.params;

    useEffect(() => {
        debugger
        const db = database;
        const providers = ref(db, 'data/Providers');
        onValue(providers, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        })
    },[])

    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
    });
    if (!fontsLoaded) {
        return null;
    };

  return (
    <View>
        <Header showSearch={true} route={route} />
        <View>
            <Text style={styles.bodyHeader}>{name}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    bodyHeader: {
        fontFamily: 'Poppins_700Bold', 
        color: '#562349',
        height: '5%',
        marginTop: 10,
        marginBottom: 10
    }
});