import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

import ProviderHeader from '../Comps/ProviderHeader';
import AboutComp from '../Comps/ProvComp/AboutComp';
import ReviewsComp from '../Comps/ProvComp/ReviewsComp';
import MessageComp from '../Comps/ProvComp/MessagesComp';

import { getDatabase, ref, child, get, once } from "firebase/database";
import { database } from '../../firebase';
import { auth } from '../../firebase';

// fonts
import { Poppins_700Bold, Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';

export default function ProviderHomeScreen() {
  const [userData, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [tabScreen, setScreen] = useState(1);
  
    useEffect(() => {
      get(ref(database, `users/${auth.currentUser.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error(error);
      });
    },[]);

    let [fontsLoaded] = useFonts({
      Poppins_700Bold, Poppins_400Regular,
      });
      if (!fontsLoaded) {
          return null;
    };

  return (
    <View style={{ backgroundColor: '#F1F1F1' }}>
      <ProviderHeader data ={userData.email} />
      { !isLoading ? 
      <View>
        <View style={styles.fieldsHeader}>
          <Text style={styles.fieldsHeaderText}>Fields</Text>
        </View>
        <View style={styles.selectTabs}>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={ () => setScreen(1) }>
                <Text style={[tabScreen === 1 ? { fontFamily: 'Poppins_700Bold', backgroundColor: '#562349', color : '#FFFFFF', borderRadius: 20 } : { fontFamily: 'Quicksand', color: '#562349', }, { width: '90%', textAlign: 'center' }]}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={ () => setScreen(2) }>
                <Text style={[tabScreen === 2 ? { fontFamily: 'Poppins_700Bold', backgroundColor: '#562349', color : '#FFFFFF', borderRadius: 20 } : { fontFamily: 'Quicksand', color: '#562349', }, { width: '90%', textAlign: 'center' }]}>Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={ () => setScreen(3) }>
                <Text style={[tabScreen === 3 ? { fontFamily: 'Poppins_700Bold', backgroundColor: '#562349', color : '#FFFFFF', borderRadius: 20 } : { fontFamily: 'Quicksand', color: '#562349', }, { width: '90%', textAlign: 'center' }]}>Messages</Text>
            </TouchableOpacity>
        </View>
         {tabScreen === 1 && <AboutComp data={userData} />} 
         {tabScreen === 2 && <ReviewsComp />} 
         {tabScreen === 3 && <MessageComp />} 
      </View>
      : <ActivityIndicator size='large' color='#562349' /> }
    </View>
  )
}

const styles = StyleSheet.create({
  selectTabs: {
    borderBottomColor: '#562349',
    borderBottomWidth: 2,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 25,
    padding: 20
  },
  fieldsHeader: {
    padding: 20,
    backgroundColor: '#FFFFFF'
  },
  fieldsHeaderText: {
    fontFamily: 'Poppins_400Regular', 
    color: '#562349', 
    fontSize: 14,  
     
  }
});