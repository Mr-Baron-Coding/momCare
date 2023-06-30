import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
// import UserHeader from '../Comps/CustomersComp/UserHeader';
import LoginHeader from '../Comps/LoginHeader';
import WelcomeComp from '../Comps/WelcomeComp';
import Signup from '../Comps/Signup';
import Login from '../Comps/Login';

//firebase
import { auth } from '../../firebase';
import { database } from '../../firebase';
import { get, ref } from 'firebase/database';

// fonts
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import Footer from '../Comps/Footer';

export default function Homescreen() {
    const [compShown, setCompShown] = useState(0);
    const [checkForProvider, setCheckProvider] = useState([]);

    const comp = [
        { screen: <WelcomeComp setCompShown={ (x) => setCompShown(x) } />, id: 0 },
        { screen: <Signup />, id: 1 },
        { screen: <Login />, id: 2 },
    ];

  // get data 
  useEffect(() => {
    console.log('hello');
    console.log(auth);
    auth.currentUser && get(ref(database, `users/providers/${auth.currentUser.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log("User is authenticated and exists in the database");
            navigation.navigate('ProviderHomeScreen');
          } else {
            console.log("User is authenticated but does not exist in the database");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    auth.currentUser && get(ref(database, `users/customers/${auth.currentUser.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log("User is authenticated and exists in the database");
            navigation.navigate('Homescreen');
          } else {
            console.log("User is authenticated but does not exist in the database");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    useEffect(() => {
        get(ref(database, 'users/providers/'))
        .then((snap) => {
            if (snap.exists()) {
            let arr = [];
            snap.forEach(users => {
                users.forEach(id =>{
                let ob = {};
                if (id.key === 'userID') {
                    arr.push(id.val());
                }
                })
            })
            setCheckProvider(arr);
            }
        }).catch((err) => {
            console.log(err + `Can't get user ID's...`);
        })
    },[]);

    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
    });
    if (!fontsLoaded) {
        return null;
    };
  return (
    <View style={styles.container}>
        <LoginHeader showBackIcon={compShown !== 0 && true} setCompShown={ (x) => setCompShown(x) } />
        <FlatList 
            data={comp}
            keyExtractor={item => 'screen_' + item.id}
            renderItem={({item}) => item.id === compShown && item.screen}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center' }}
        />
        <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    }
});