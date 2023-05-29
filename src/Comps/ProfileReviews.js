import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ref, update, get, push, child, set, onValue } from 'firebase/database';
import { auth } from '../../firebase';
import { database } from '../../firebase';

//icons
import Edit from '../../assets/SVG/UserIcons/edit';
import Star from '../../assets/SVG/UserIcons/Star';

export default function Profilereviews({ setAddReview, providerID }) {
  const [reviewList, setReviewList] = useState([]);
  const [userHasRevied, setHasReviewed] = useState(false);
  const starRating = [1,2,3,4,5];

  useEffect(() => {
    get(child(ref(database), 'users/reviews/')).then((snap) => {
      if (snap.exists()) {
        let arr = [];
          snap.forEach(reviews => {
              if(reviews.val().providerID === providerID ){
                arr.push(reviews.val())
                // setReviewList(...reviewList, reviews.val());
                if (reviews.val().userID === auth.currentUser.uid) {
                  setHasReviewed(true);
                }
            }
          })
          setReviewList(arr);
      }
  })
  .catch((err) => {
      console.log(err);
  })
  },[]);
  
  const ReviewCard = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.userReviewHeaderTextStyling}>{item.userName}</Text>
          { item.userID === auth.currentUser.uid && <TouchableOpacity onPress={ () => setAddReview(true) }><Edit /></TouchableOpacity>}
        </View>          
        <Text style={styles.selectedFieldTextStyle}>{item.selectedField}</Text>
        {/* <Text style={styles.userReviewHeaderTextStyling}>{item.reviewField}</Text> */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {starRating.map((star,index) => {
            return (
              <Star key={index} color={(item.reviewScore !== 0 && item.reviewScore >= star) ? '#562349' : 'white'} />
            )
          })}
          <Text style={{ color: '#8C8C8C', fontSize: 14, fontFamily: 'Quicksand' }}>{item.date}</Text>
        </View>
        <Text style={styles.bodyText}>{item.reviewBody}</Text>
      </View>
    )
  };

  return ( 
    <View style={styles.container}>
      {!userHasRevied && <View>
        <Text>You havn't reviewed this provider yet</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={ () => setAddReview(true) }>
          <Text style={styles.buttonText}>Add review</Text>
        </TouchableOpacity>  
      </View>}
      {reviewList.length > 0 &&
       <View>
          <Text style={styles.textStyling}>{`${reviewList.length} Reviews`}</Text>
          <FlatList 
            data={reviewList}
            renderItem={({item}) => <ReviewCard item={item}/>}
            keyExtractor={(item, id) => id}
          /> 
      </View>} 
      {reviewList.length === 0 && <View>
          <Text style={styles.textStyling}>No reviews yet</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={ () => setAddReview(true) }>
            <Text style={styles.buttonText}>Add review</Text>
          </TouchableOpacity>
        </View>} 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  userReviewHeaderTextStyling: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#562349'
  },
  selectedFieldTextStyle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: 'white',
    backgroundColor: '#C4A7B5',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    width: '70%'
  },
  textStyling: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#8C8C8C'
  },
  cardContainer: {
    marginVertical: 15
  },
  bodyText: {
    fontFamily: 'Quicksand',
    fontWeight: '400',
    fontSize: 14,
    // paddingVertical: 10,
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