import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

// icons
import Logo from '../../assets/SVG/logo';


export default function Header({ showSearch, route }) {
    const [field, setField] = useState('');
    const [location, setLocation] = useState('');
    const { id, name } = route.params;

    const searchBox = () => {
        return (
            <View style={styles.searchBox}>
                <View style={styles.searchField}>
                    <Text style={styles.fontStyling}>Field:</Text>
                    <TextInput 
                        placeholder={name}
                        placeholderTextColor={'#C4A7B5'}
                        value={field}
                        onChangeText={ (text) => setField(text) }
                        style={styles.inputStyle}
                    />
                </View>
                <View style={styles.searchField}>
                    <Text style={styles.fontStyling}>City:</Text>
                </View>
            </View>
        )
    }
  return (
    <View style={styles.container}>
        <Logo />
        {showSearch && searchBox()}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFA299',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
    },
    searchBox: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    searchField: {
        width: '80%',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderColor: '#562349',
        borderWidth: 2,
        height: 32,
        borderRadius: 38,
        paddingHorizontal: 10,
        alignItems: 'center',
        columnGap: 5
    },
    searchLocation: {},
    fontStyling: {
        fontFamily: 'Quicksand',
        fontWeight: '900',
        fontSize: 16,
        lineHeight: 20
    },
    inputStyle: {
        outlineStyle: 'none',
        fontFamily: 'Quicksand',
        fontWeight: '400',
        width: '100%'
    }
});