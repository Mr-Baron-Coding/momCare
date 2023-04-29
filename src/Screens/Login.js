import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';

import { getDatabase, ref, child, get, once } from "firebase/database";
import { database } from '../../firebase';

//icons
import Logo from '../../assets/SVG/logo';

export default function Login({ navigation, extraData }) {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // console.log(auth.currentUser);
        auth.currentUser && get(ref(database, `users/${auth.currentUser.uid}`)).then((snapshot) => {
              if (snapshot.exists()) {
                console.log("User is authenticated and exists in the database");
                // console.log(snapshot.val())
                const data = snapshot.val();
                snapshot.val().usertype === 'Provider' ? navigation.navigate('ProviderHomeScreen', {data: snapshot.val()}) : navigation.navigate('Homescreen');
                // console.log(snapshot.val()/userType);
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
          console.log(errorCode, errorMessage);
        });
    };

  return (
    <KeyboardAvoidingView 
        style={styles.container}
    >
        <View style={styles.header}>
            <Logo />
            <Text style={styles.headerH1}>Be sure of your caregiver</Text>
            <Text style={styles.headerH2}>The care you need, with peace of mind.</Text>
        </View>
        <View style={styles.body}>
            <TextInput 
                placeholder='Email*'
                placeholderTextColor={'#C4A7B5'}
                value={mail}
                onChangeText={ (text) => setMail(text) }
                style={[styles.placeHolder, mail && styles.input]}
            />
            <TextInput 
                placeholder='Password*'
                placeholderTextColor={'#C4A7B5'}
                value={password}
                onChangeText={ (text) => setPassword(text) }
                secureTextEntry
                style={[styles.placeHolder, password && styles.input]}
            />
            <TouchableOpacity
                onPress={ () => handleSigin() }
                style={[styles.button, styles.loginButton]}
                
            >
                <Text style={styles.loginText}>Login</Text>
                <MaterialCommunityIcons name="login-variant" size={24} color="white" />
            </TouchableOpacity>
        </View>
        
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        // flex: 1
    },
    header: {
        height: '40%',
        backgroundColor: '#FFA299',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerH1: {
        fontSize: 24,
        lineHeight: 40,
        color: 'white',
    },
    headerH2: {
        fontSize: 16,
        lineHeight: 30,
        color: 'white'
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