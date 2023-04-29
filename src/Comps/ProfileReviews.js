import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

export default function Profilereviews({ reviewsList }) {

  const ReviewCard = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.textStyling}>{item.by}</Text>
        <View style={{ flexDirection: 'row', gap: 15 }}>
          <Text>Stars</Text>
          <Text>{item.date}</Text>
        </View>
        <Text style={styles.bodyText}>{item.body}</Text>
      </View>
    )
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textStyling}>{`${reviewsList.length} Reviews`}</Text>
      <FlatList 
        data={reviewsList}
        renderItem={({item}) => <ReviewCard item={item}/>}
        keyExtractor={(item, id) => id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  textStyling: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#562349'
},
cardContainer: {
  marginVertical: 15
},
bodyText: {
  fontFamily: 'Quicksand',
  fontWeight: '400',
  fontSize: 14,
  paddingVertical: 10,
  color: '#562349'
}
})