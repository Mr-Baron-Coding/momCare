import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function Profilereviews({ reviewsList, setAddReview }) {

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
      { reviewsList 
      ? <View>
          <Text style={styles.textStyling}>{`${reviewsList.length} Reviews`}</Text>
          <FlatList 
            data={reviewsList}
            renderItem={({item}) => <ReviewCard item={item}/>}
            keyExtractor={(item, id) => id}
          />
      </View> 
      : <View>
          <Text style={styles.textStyling}>No reviews yet</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={ () => setAddReview(true) }>
            <Text style={styles.buttonText}>Add review</Text>
          </TouchableOpacity>
        </View> } 
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
  },
  buttonContainer: {
    backgroundColor: '#562349',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 15,
    height: 28
    // width: '100%'
  },
  buttonText: {
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    
  },
})