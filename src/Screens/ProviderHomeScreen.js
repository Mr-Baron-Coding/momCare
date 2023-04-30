import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import ProviderHeader from '../Comps/ProviderHeader';

import { getDatabase, ref, child, get, once } from "firebase/database";
import { database } from '../../firebase';
import { auth } from '../../firebase';

export default function ProviderHomeScreen() {
  const [userData, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  
    useEffect(() => {
      get(ref(database, `users/${auth.currentUser.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setData(snapshot.val());
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error(error);
      });
    },[]);

  return (
    <View>
      <ProviderHeader />
      { !isLoading ? 
      <View style={{ padding: 20 }}>
        <Text>Welcome</Text>
        <Text style={{ fontFamily: 'Poppins_700bold', color: '#562349', fontSize: 18 }}>About</Text>
        <Text>{userData.about}</Text>
      </View>
      : <Text>Loading...</Text> }
    </View>
  )
}

const styles = StyleSheet.create({})