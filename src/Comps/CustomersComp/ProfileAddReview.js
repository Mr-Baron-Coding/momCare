import { StyleSheet, Text, View, TouchableOpacity, TextInput, Switch } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { ref, update, get, push, child, set, onValue } from 'firebase/database';
import { auth } from '../../../firebase';
import { database } from '../../../firebase';

import { Picker } from '@react-native-picker/picker';

//redux
import { useSelector, useDispatch } from 'react-redux';

//icon
import Star from '../../../assets/SVG/UserIcons/Star';
import { editSelectedReview, editReviewData, addReviewToList } from '../../Redux/features/dataSlice';

export default function ProfileAddReview({ addReview, setAddReview, providerID, userName, item }) {
    const pickerRef = useRef();
    const dispatch= useDispatch();
    const reviewsList = useSelector((state) => state.data.reviewsData);
    const currentUserData = useSelector((state) => state.data.userData);
    const selectedProvider = useSelector((state) => state.data.selectedProvider);
    const selectedreview = useSelector((state) => state.data.selectedReviw);
    const loggedUser = useSelector((state) => state.data.userdata);

    const [selectedProviderReviews, setSelectedProviderREviews] = useState([]);

    const [reviewField, setReviewField] = useState('');
    const [loading, setLoading] = useState(false);
    const [stars, setStars] = useState(0);
    const starRating = [1,2,3,4,5];
    const [isReviewed, setReviewed] = useState(false);
    const [selectedField, setSelectedField] = useState('');

    useEffect(() => {
        //get all selected provider reviews
        const temp = reviewsList.filter(review => review.providerID === selectedProvider.userID);
        setSelectedProviderREviews(temp);

        //check if user reviewed the provider
        const reviewState = temp.filter(review => review.userID === auth.currentUser.uid);
        if ( reviewState.length !== 0) {
            setReviewed(true);
            setReviewField(reviewState[0].reviewBody);
            setSelectedField(reviewState[0].selectedField);
            setStars(reviewState[0].reviewScore);
        } else {
            setSelectedField(selectedProvider.cernqual[0].fields);
        }
        console.log(reviewState[0]);
        
    },[]);

    //add new review
    const handleSaveReview = () => {
        if ( reviewField.length < 5 ) { return console.log("Canno't be blank");}
        setLoading(true);
        const keyVal = push(ref(database, 'users/reviews/')).key;
        const reviewData = {
            userID: auth.currentUser.uid,
            userName: currentUserData.userName,
            providerID: selectedProvider.userID,
            reviewID: keyVal,
            reviewBody: reviewField,
            reviewScore: stars,
            selectedField: selectedField,
            timeStamp: (new Date().getTime())
        };
        const addUserReview = {
            reviewID: keyVal,
        };
        const addProviderReview = {
            reviewID: keyVal,
        };
        const ob ={};
        ob['users/reviews/' + keyVal] = reviewData;
        ob['users/customers/' + auth.currentUser.uid + '/reviewsList/' + keyVal] = addUserReview;
        ob['users/providers/' + selectedProvider.userID + '/reviewsList/' + keyVal] = addProviderReview;

        update(ref(database), ob)
        .then(() => {
            dispatch(addReviewToList(reviewData));
        })
        .then(() => {
            console.log('Saved');
        })
        .then(() => {
            setLoading(false);
            setAddReview(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    };

    //edit review
    const handleEditReview = () => {
        update(ref(database, 'users/reviews/' + selectedreview.reviewID + '/'), {
            reviewScore: stars,
            reviewBody: reviewField,
            selectedField: selectedField
        })
        .then(() => {
            // dispatch(editSelectedReview({selectedField: selectedField, reviewBody: reviewField, reviewScore: stars }));
            dispatch(editReviewData({selectedField: selectedField, reviewBody: reviewField, reviewScore: stars, reviewID: selectedreview.reviewID }));
        })
        .then(() => {
            setAddReview(false);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    const pickerComp = () => {
        return (
            <Picker
                ref={pickerRef}
                selectedValue={selectedField}
                onValueChange={(itemValue, itemIndex) => setSelectedField(itemValue)}
                style={styles.fieldContainer}
            >
                {selectedProvider.cernqual.map((element, index) => {
                    return <Picker.Item key={index + 'field'} label={element.fields} value={element.fields} />
                    })
                }
            </Picker>
        )
    };

  return ( 
    selectedProvider.cernqual === undefined 
        ? <View style={styles.container}>
            <Text style={styles.certSectionText}>Unable To review</Text>
            <Text style={styles.certSectionText}>Provider have no certifications</Text>
        </View> 
        : <View style={styles.container}>
      {isReviewed 
        ? <Text style={styles.certSectionText}>Edit your review</Text> 
        : <Text style={styles.certSectionText}>Add your reveiw to this provider</Text>}
      <TextInput 
        placeholder='Write something about your favourite provider'
        value={reviewField}
        onChangeText={(text) => setReviewField(text)}
        multiline
        numberOfLines={6}
        style={styles.inputTextStyle}
      />
      <View>
        <Text style={styles.certSectionText}>Select field of care</Text>
        {pickerComp()}
      </View>
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
    certSectionText: {
        fontFamily: 'Poppins_400Regular', 
        color: '#562349', 
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    fieldContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#562349',
        borderWidth: 2,
        borderRadius: 10,
        fontFamily: 'Poppins_400Regular', 
        color: '#562349', 
        fontSize: 12,
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