import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, set, get, child } from 'firebase/database';
import { auth, database } from '../../firebase';

// icons
import Logo from '../../assets/SVG/logo';

export default function Signup({ navigation }) {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setType] = useState(false);

    const handleSignin = () => {
        createUserWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
            const user = userCredential.user;
    
            set(ref(database, 'users/' + user.uid), {
                email: mail,
                userID: user.uid,
                usertype: userType ? 'Provider' : 'Customer',
                about: userType && 'add',

            })
        })
        .then(() => { userType ? navigation.navigate('ProviderHomeScreen') : navigation.navigate('Homescreen') })
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
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={ () => setType(false) }><Text>User</Text></TouchableOpacity>
                <TouchableOpacity onPress={ () => setType(true) }><Text>Provider</Text></TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={ () => handleSignin() }
                style={[styles.button, styles.loginButton]}
                
            >
                <Text style={styles.loginText}>Signup</Text>
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
        borderBottomColor: '#562349',
        borderBottomWidth: 2
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
});

// useEffect(() => {
    //     const listener = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             console.log(user);
    //             get(child(database, `users/${user.uid}`)).then((snapshot) => {
    //                 if (snapshot.exists()) {
    //                     console.log(snapshot.val());
    //                 }
    //                 else {
    //                     console.log("No data available");
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //               });
    //         }
    //     }) 

    //     return () => listener();
    //     // if (!isLoading && !authUser) {
    //     //     navigation.navigate('Homescreen');
    //     // }
    //     // console.log(isLoading, authUser);
    // }, [])
    