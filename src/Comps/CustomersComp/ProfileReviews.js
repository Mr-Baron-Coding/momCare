import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../../../firebase';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { saveSelectedReview, editSelectedReview } from '../../Redux/features/dataSlice';

//icons
import Edit from '../../../assets/SVG/UserIcons/edit';
import Star from '../../../assets/SVG/UserIcons/Star';

export default function Profilereviews({ setAddReview, addReview }) {
  const dispatch = useDispatch();
  const reviewsList = useSelector((state) => state.data.reviewsData);
  const selectedProvider = useSelector((state) => state.data.selectedProvider);

  const [selectedProviderReviews, setSelectedProviderREviews] = useState([]);
  const starRating = [1,2,3,4,5];

  useEffect(() => {
    //get all selected provider reviews
    const temp = reviewsList.filter(review => review.providerID === selectedProvider.userID);
    setSelectedProviderREviews(temp);
    console.log(temp);
    //check if user reviwed the provider
    const reviewState = temp.filter(review => review.userID === auth.currentUser.uid);
    if ( reviewState.length !== 0) dispatch(saveSelectedReview(reviewState[0]));
  },[]);
  
  const ReviewCard = ({ item }) => {
    console.log(item);
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
      {addReview && <View>
        <Text>You havn't reviewed this provider yet</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={ () => setAddReview(true) }>
          <Text style={styles.buttonText}>Add review</Text>
        </TouchableOpacity>  
      </View>}
      {selectedProviderReviews.length > 0 &&
       <View>
          <Text style={styles.textStyling}>{`${selectedProviderReviews.length} Reviews`}</Text>
          <FlatList 
            data={selectedProviderReviews}
            renderItem={({item}) => <ReviewCard item={item}/>}
            keyExtractor={(item, id) => id}
          /> 
      </View>} 
      {selectedProviderReviews.length === 0 && <View>
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