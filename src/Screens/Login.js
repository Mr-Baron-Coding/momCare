import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';

import { getDatabase, ref, child, get, once } from "firebase/database";
import { database } from '../../firebase';

import UserHeader from '../Comps/CustomersComp/UserHeader';

//icons
import Logo from '../../assets/SVG/logo';
import Back from '../../assets/SVG/UserIcons/back';
import Footer from '../Comps/Footer';

export default function Login({ navigation, extraData }) {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isMessageShown, setMessageShown] = useState(false);

    // get data 
    useEffect(() => {
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

    const handleSigin = () => {
        signInWithEmailAndPassword(auth, mail, password)            
        .then((userCredential) => {
          const user = userCredential.user;
          const dbRef = ref(getDatabase());
            get(child(dbRef, `users/`)).then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.val().usertype === 'Provider' ? navigation.navigate('ProviderHomeScreen') : navigation.navigate('Homescreen');
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
                console.error(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if ( errorCode === 'auth/wrong-password' ){
            setMessage('Wrong password');
            setMessageShown(true);
            // passInput.current.focus()
          }
          if ( errorCode === 'auth/user-not-found' ){
            setMessage('No user found');
            setMessageShown(true);
          }
        });
    };

  return (
    <KeyboardAvoidingView 
        style={styles.container}
    >
      <UserHeader showBackIcon={true} showHeaderText={true} />
        <View style={styles.body}>
            <TextInput 
                placeholder='Email*'
                placeholderTextColor={'#C4A7B5'}
                value={mail}
                onChangeText={ (text) => setMail(text) }
                style={[styles.placeHolder, mail && styles.input]}
                onFocus={ () => {setMessage(''); setMessageShown(false)}}
            />
            <TextInput 
                placeholder='Password*'
                placeholderTextColor={'#C4A7B5'}
                value={password}
                onChangeText={ (text) => setPassword(text) }
                secureTextEntry
                style={[styles.placeHolder, password && styles.input]}
                onFocus={ () => {setMessage(''); setMessageShown(false)}}
            />
            <TouchableOpacity
                onPress={ () => handleSigin() }
                style={[styles.button, styles.loginButton]}
                
            >
                {!isMessageShown ? 
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.loginText}>Login</Text>
                    <MaterialCommunityIcons name="login-variant" size={24} color="white" />
                </View>
                : <Text style={styles.loginText}>{message}</Text>}
            </TouchableOpacity>
        </View>
        <Footer />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    body: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {  
        fontSize: 18,
        fontWeight: '700',
    },
    placeHolder: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderColor: '#562349',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 5,
        height: 48,
        color: '#562349',
        fontSize: 12,
    },
    button: {
        elevation: 8,
        width: '80%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 12,
        flexDirection: 'row'
    },
    loginButton: {
        backgroundColor: '#562349',
    },
    loginText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginRight: 10
    },

})