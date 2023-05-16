import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { get, ref, child } from 'firebase/database';
import { database } from '../../../firebase';

export default function ReviewsComp({ data }) {
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    get(child(ref(database), 'reviews/')).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach(child => {
          console.log(child.val());
        })
        setReviews(snapshot.val());
        console.log(snapshot.val());
        setLoading(false)
      }
    })
    .catch((error) => {
      console.error(error);
    });
  },[])
  return ( loading ? <ActivityIndicator size='small' color='blue' /> :
    <View style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#FFFFFF' }}>
      <Text style={{ fontFamily: 'Poppins_700bold', color: '#562349', fontSize: 16 }}>Your reviews will be shown here</Text>
      {!data.reviews ? <Text style={{ fontFamily: 'Quicksand', color: '#562349', fontSize: 14 }}>No reviews yet</Text> : <Text>{data.reviews.length}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({})