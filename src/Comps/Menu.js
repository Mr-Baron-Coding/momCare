import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export default function Menu({ menuWindow, closeMenu }) {    
    const slideAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (menuWindow) {
            return slide(1)
        } 
        else {
            return slide(0);
        }
    },[menuWindow])

    const slide = (x) => {
        Animated.timing(slideAnimation, {
            toValue: x,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const handleClick = () => {
        signOut(auth).then(() => {
          console.log('Logged out');
          navigation.navigate('Welcome');
        }).catch((error) => {
            console.log(error);
        });
    };

  return (
    <Animated.View 
        style={[
            styles.container, 
            { transform: [{ translateY: slideAnimation.interpolate({inputRange: [0,1], outputRange: ['-100%', '0%']}) }] } 
        ]}
    >
        <TouchableOpacity onPress={ () => closeMenu() }>
            <Text style={styles.fontStyle}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => handleClick() }>
            <Text style={styles.fontStyle}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
            <Text style={styles.fontStyle}>Settings</Text>
        </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 2,
        backgroundColor: '#FFA299',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fontStyle:{
        fontFamily: 'Quicksand',
        fontWeight: '700',
        color: '#FFE8E5',
        fontSize: 24,
        lineHeight: 40,
    }
});