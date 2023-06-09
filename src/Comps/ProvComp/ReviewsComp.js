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
    <View style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#FFFFFF', flex: 1 }}>
      <Text style={{ fontFamily: 'Poppins_700bold', color: '#562349', fontSize: 16 }}>Your reviews will be shown here</Text>
      {reviews ? <Text style={{ fontFamily: 'Quicksand', color: '#562349', fontSize: 14 }}>No reviews yet</Text> : <Text>{reviews.length}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({})