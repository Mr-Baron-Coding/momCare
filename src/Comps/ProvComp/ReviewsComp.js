import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { get, ref, child } from 'firebase/database';
import { database } from '../../../firebase';

//redux
import { useSelector } from 'react-redux';

export default function ReviewsComp() {
  const reviews = useSelector((state) => state.providerData.loggedProvider.reviewList);
  // const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(reviews);
  },[])

  // useEffect(() => {
  //   setLoading(true)
  //   get(child(ref(database), 'reviews/')).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       snapshot.forEach(child => {
  //         console.log(child.val());
  //       })
  //       setReviews(snapshot.val());
  //       console.log(snapshot.val());
  //       setLoading(false)
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // },[])
  return ( 
    // loading ? <ActivityIndicator size='small' color='blue' /> :
    <View style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#FFFFFF', flex: 1 }}>
      <Text style={{ fontFamily: 'Poppins_700bold', color: '#562349', fontSize: 16 }}>Your reviews will be shown here</Text>
      {reviews ? <Text style={{ fontFamily: 'Quicksand', color: '#562349', fontSize: 14 }}>No reviews yet</Text> : <Text>{reviews.length}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({})