import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

export default function Profilereviews({ reviewsList }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyling}>{`${reviewsList.length} Reviews`}</Text>
      <FlatList 
        data={reviewsList}
        renderItem={({item}) => <Text style={styles.textStyling}>{item.header}</Text>}
        keyExtractor={(item, id) => id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  textStyling: {
    fontFamily: 'Quicksand',
    fontWeight: '500',
    fontSize: 14,
    color: '#562349'
},
})