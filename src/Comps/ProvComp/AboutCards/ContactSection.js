import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function ContactSection() {
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [site, setSite] = useState('');
  return (
    <View>
      <Text>ContactSection</Text>
      <TextInput
        onChangeText={(text) => setPhone(text)}
        value={phone}
        placeholder='Add phone number'
        style={styles.inputformStyle}
        maxLength={10}
        inputMode={'numeric'}
    />
    </View>
  )
}

const styles = StyleSheet.create({
    inputformStyle: {
        width: '80%',
        fontFamily: 'Poppins_400Regular',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderColor: '#562349',
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 10,
        height: 30,
        color: '#562349',
        fontSize: 14,
    },
});