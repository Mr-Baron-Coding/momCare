import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';

import { ref, child, get } from "firebase/database";
import { database } from '../../firebase';

//icons
import Logo from '../../assets/SVG/logo';

export default function Login({ navigation }) {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    
    let locatUser = [];

    // useEffect(() => {
    //     const dbRef = ref(database);
    //     get(child(dbRef, 'data/Providers')).then((snapshot) => {
    //         if (snapshot.exists()) {
    //         //   console.log(snapshot.val());
    //           locatUser = snapshot.val();
    //         //   setData(snapshot.val());
    //         console.log(locatUser);
    //         } else {
    //           console.log("No data available");
    //         }
    //     }).catch((error) => {
    //     console.error(error);
    //     });
    // },[]);

    const checkUser = async () => {
        const dbRef = ref(database);
        await get(child(dbRef, 'data/Providers')).then((snapshot) => {
            if (snapshot.exists()) {
              locatUser = snapshot.val();
            } else {
              console.log("No data available");
            }
        }).catch((error) => {
        console.error(error);
        });
        let arr = locatUser.forEach(item => item.contact.filter(mailFielld => mailFielld === mail));
        console.log(arr);
        navigation.navigate('Homescreen');

    };

    onAuthStateChanged(auth, (user) => {
        if(user){
            setMail('');
            setPassword('');
            checkUser();
            // let arr = locatUser.filter((item) => item.contact[1] === mail);
            // console.log('arr');
            // navigation.navigate('Homescreen');
        }
    })

    const handleSigin = () => {
        signInWithEmailAndPassword(auth, mail, password)            
        .then((userCredential) => {
            checkUser();
          const user = userCredential.user;
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