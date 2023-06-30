import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

//redux
import { useSelector } from 'react-redux';

export default function ReviewsComp() {
  const reviews = useSelector((state) => state.providerData.loggedProvider.reviewsList);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(reviews);
  },[])

  return ( 
    <View style={styles.container}>
      {reviews.length === 0 && 
      <View>
        <Text style={styles.headerContainer}>Your reviews will be shown here</Text>
        <Text style={styles.subHeaderText}>No reviews yet</Text>
      </View>}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20, 
    paddingTop: 10,
    backgroundColor: '#FFFFFF', 
    flex: 1
  },
  headerContainer: {
    fontFamily: 'Poppins_700bold', 
    color: '#562349', 
    fontSize: 16
  },
  subHeaderText: {
    fontFamily: 'Quicksand', 
    color: '#562349', 
    fontSize: 14 
  }
});