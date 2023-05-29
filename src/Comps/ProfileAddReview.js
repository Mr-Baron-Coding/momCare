import { StyleSheet, Text, View, TouchableOpacity, TextInput, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ref, update, get, push, child, set, onValue } from 'firebase/database';
import { auth } from '../../firebase';
import { database } from '../../firebase';

//icon
import Star from '../../assets/SVG/UserIcons/Star';

export default function ProfileAddReview({ setAddReview, providerID, userName, selectedField }) {
    const [reviewField, setReviewField] = useState('');
    const [loading, setLoading] = useState(false);
    const [stars, setStars] = useState(0);
    const starRating = [1,2,3,4,5];
    const [isReviewed, setReviewed] = useState(false);
    const [reviewKey, setReviewKey] = useState('');
    const [reviewedData, setReviewedData] = useState({});

    useEffect(() => {
        get(child(ref(database), 'users/reviews/')).then((snap) => {
            if (snap.exists()) {
                snap.forEach(review => {
                    // console.log(review.key);
                    // console.log('provider:' + providerID, 'user:' + auth.currentUser.uid);
                    if(review.val().providerID === providerID && review.val().userID === auth.currentUser.uid){
                        setReviewedData(review.val());
                        setReviewField(review.val().reviewBody);
                        setStars(review.val().reviewScore);
                        setReviewKey(review.key);
                        setReviewed(true);
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    },[]);

    //add new review
    const handleSaveReview = () => {
        if ( reviewField.length < 5 ) { return console.log("Canno't be blank");}
        setLoading((prv) => prv = true);
        const keyVal = push(ref((database), 'users/reviews/')).key;
        set(ref((database), 'users/reviews/' + keyVal) , {
                userID: auth.currentUser.uid,
                userName: userName,
                providerID: providerID,
                reviewID: keyVal,
                reviewBody: reviewField,
                reviewScore: stars,
                selectedField: selectedField,
                date: (new Date().getDate() + '-' + new Date().getUTCMonth() + '-' + new Date().getFullYear())
        })
        .then(() => {
            console.log('Saved');
        })
        .then(() => {
            setLoading((prv) => prv = false);
            setAddReview(false)
        })
        .catch((err) => {
            console.log(err);
            setLoading((prv) => prv = false);
        })
    };

    //edit review
    const handleEditReview = () => {
        update(child(ref(database), 'users/reviews/' + reviewKey + '/'), {
            reviewScore: stars,
            reviewBody: reviewField
        })
        .then(() => {
            setAddReview(false);
        })
        .catch((err) => {
            console.log(err);
        })
    };

  return (
    <View style={styles.container}>
      { isReviewed ? <Text>Edit your review</Text> : <Text>Add your reveiw to this provider</Text>}
      <TextInput 
        placeholder='Write something about your favourite provider'
        value={reviewField}
        onChangeText={(text) => setReviewField(text)}
        multiline
        numberOfLines={6}
        style={styles.inputTextStyle}
      />
      <View style={{ flexDirection: 'row' ,justifyContent: 'center', alignItems: 'center' }}>
        {starRating.map((item, index) => {
            return(
                <TouchableOpacity key={index} onPress={() => setStars(item)}>
                    <Star color={(stars !== 0 && stars >= item) ? '#562349' : 'white'} />
                </TouchableOpacity>
            )
        })}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 20  }}>
        <TouchableOpacity style={styles.buttonStyle} onPress={ isReviewed ? () => handleEditReview() : () => handleSaveReview() }>
            <Text style={styles.buttonTextStyle}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={ () => setAddReview(false) }>
            <Text style={styles.buttonTextStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 10
      },
      inputTextStyle: {
        fontFamily: 'Poppins_400Regular', 
        color: '#562349', 
        fontSize: 12,
        borderColor: '#562349',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
      buttonStyle: {
        height: 30,
        width: 100,
        borderColor: '#562349',
        borderWidth: 2,
        borderRadius: 5,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    buttonTextStyle: {
        fontFamily: 'Poppins_700bold', 
        color: '#562349', 
        fontSize: 14,
    },
});