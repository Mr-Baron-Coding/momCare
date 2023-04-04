import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Footer() {
  return (
    <View>
      <Text>Footer</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    footer: {
        height: '10%',
        // flex: 1,
        backgroundColor: '#F7F7F7',
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-around'
    }
})