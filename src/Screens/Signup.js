import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, set } from 'firebase/database';
// import { ref as stRef, uploadBytes } from 'firebase/storage'
// import { storage } from '../../firebase';
import { auth, database } from '../../firebase';

// icons
import Logo from '../../assets/SVG/logo';
import Back from '../../assets/SVG/UserIcons/back';
import { Feather } from '@expo/vector-icons'; 

//images
import PlaceHolderPic from '../../assets/Images/placeholder.jpg'

// fonts
import { Poppins_700Bold, Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import Footer from '../Comps/Footer';
import UserHeader from '../Comps/CustomersComp/UserHeader';

export default function Signup({ navigation }) {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [userType, setType] = useState(false);
    const [message, setMessage] = useState('');
    const [isMessageShown, setMessageShown] = useState(false);

    const handleSigninProvider = () => {
        // const keyVal = push(ref((database), 'users/providers/')).key;
        createUserWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, 'users/providers/' + user.uid), {
                email: mail,
                userName: userName,
                userID: user.uid,
                usertype: 'Provider',
                about: '',
                carearea: '',
                contact: '',
                cernqual: '',
                messages: '',
                phone: '',
                reviewsList: '',
                likesList: '',
                site: '',
                profilePic: 'gs://momcare-bc985.appspot.com/placeholders/placeholder.jpg'

            })
        })
        // .then(() => {
        //     uploadBytes(stRef(storage, 'Profile-Pictures/Placeholder', PlaceHolderPic))
        //     .then((snapshot) => {
        //         console.log(snapshot);
        //         console.log('Worked');
        //     })
        //     .catch((err) => {
        //         console.log(err + 'Not working');
        //     })
        // })
        .then(() => { navigation.navigate('ProviderHomeScreen')})
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }; 
    const handleSigninCustomer = () => {
        // const keyVal = push(ref((database), 'users/customers/')).key;
        createUserWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, 'users/customers/' + user.uid), {
                email: mail,
                userName: userName,
                userID: user.uid,
                usertype: 'Customer',
            })
        })
        .then(() => { navigation.navigate('Homescreen')})
        .catch((error) => {
            const errorCode = error.code;
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

    let [fontsLoaded] = useFonts({
        Poppins_700Bold, Poppins_400Regular,
        });
        if (!fontsLoaded) {
            return null;
      };

  return (
    <KeyboardAvoidingView 
        style={styles.container}
    >
        <UserHeader showBackIcon={true} showHeaderText={true} />
        <View style={styles.body}>
            <View style={{ paddingHorizontal: 20, justifyContent: 'flex-start', width: '100%' }}>
                <Text style={styles.bodyHeader}>Welcome!</Text>
                <Text style={styles.bodyHeader}>Signup and start your journey</Text>
            </View>
            <TextInput 
                placeholder='Name*'
                placeholderTextColor={'#C4A7B5'}
                value={userName}
                onChangeText={ (text) => setUserName(text) }
                style={[styles.placeHolder, userName && styles.input]}
            />
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
            <View style={{ flexDirection: 'row', gap: 15, height: 40, marginVertical: 10, width: '80%' }}>
                <TouchableOpacity onPress={ () => setType(false) } style={[styles.userButton, userType ? styles.activeUserButton : styles.nonUserButton]}>
                    <Text style={ !userType ? { color: '#562349', fontFamily: 'Poppins_700Bold' } : { color: '#FFFFFF', fontFamily: 'Poppins_400Regular' } }>User</Text>
                    {!userType && <Feather name="check" size={24} color="#562349" />}
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => setType(true) } style={[styles.userButton, !userType ? styles.activeUserButton : styles.nonUserButton]}>
                    <Text style={ userType ? { color: '#562349', fontFamily: 'Poppins_700Bold' } : { color: '#FFFFFF', fontFamily: 'Poppins_400Regular' } }>Provider</Text>
                    {userType && <Feather name="check" size={24} color="#562349" />}
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={ userType ? () => handleSigninProvider() : () => handleSigninCustomer() }
                style={[styles.button, styles.loginButton]}
                
            >
                {!isMessageShown ? 
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.loginText}>Signup</Text>
                    <MaterialCommunityIcons name="login-variant" size={24} color="white" />
                </View>
                : <Text style={styles.loginText}>{message}</Text>}
                {/* <Text style={styles.loginText}>Signup</Text>
                <MaterialCommunityIcons name="login-variant" size={24} color="white" /> */}
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
    bodyHeader: {
        fontFamily: 'Quicksand',
        fontSize: 16,
        lineHeight: 30,
        color: '#562349',
        marginBottom: 10
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
    userButton: {
        flex: 1,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeUserButton: {
        backgroundColor: '#562349',
        
        borderWidth: 2,
        borderRadius: 12,
        borderColor: '#FFFFFF',
    },
    nonUserButton: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        gap: 10,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: '#562349',
    }
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
    