import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { splitMessages, spliceMessages } from '../../Redux/features/dataSlice';

import About from '../../Comps/CustomersComp/ProfileAbout';
import Review from '../../Comps/CustomersComp/ProfileReviews';
import ProfileAddReview from '../../Comps/CustomersComp/ProfileAddReview';
import Footer from '../../Comps/Footer';
import UserHeader from '../../Comps/CustomersComp/UserHeader';
import MessagesScreen from './MessagesScreen';
import LikedScreen from './LikedScreen';
import MenuScreen from '../../Comps/Menu';
import { auth } from '../../../firebase';

export default function ProviderDetailScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const providersList = useSelector((state) => state.data.providersData);
    const loggedUser = useSelector((state) => state.data.userdata);
    const reviewsList = useSelector((state) => state.data.reviewsData);
    const selectedProvider = useSelector((state) => state.data.selectedProvider);
    
    const [menuWindow, setMenu] = useState(false);
    const [tabScreen, setScreen] = useState(1);
    const [addReview, setAddReview] = useState(false);
    const [shownComp, setShownComp] = useState(0);

    useEffect(() => {
        console.log(reviewsList);
        //get all selected provider reviews
        const temp = reviewsList.filter(review => review.providerID === selectedProvider.userID);

        //check if user revied the provider
        const reviewState = temp.filter(review => review.providerID === auth.currentUser.uid);
        // if ( reviewState.length !== 0) setAddReview(false);
        console.log('Split');
        dispatch(splitMessages(selectedProvider.userID));
        return(() => {
            console.log('left provider');
            // dispatch(spliceMessages());
        })
    },[]);

    const goToMessScreen = () => {
        // dispatch(spliceMessages());
        navigation.navigate('Message');
    };
    
  return (
    <View style={styles.mainContainer}>
        <UserHeader heightVar={100} logoHeight={50} logoWidth={100} showBackIcon={true} showUserIcons={true} setMenu={setMenu} setShownComp={(x) => setShownComp(x)} isLookingAtProvider={true} />
        <MenuScreen menuWindow={menuWindow} closeMenu={ () => setMenu(false) } /> 
            <View style={styles.bodyContainer}>
                <View style={styles.filedsContainer}>
                    <FlatList 
                        data={selectedProvider.cernqual}
                        renderItem={({item}) => <Text style={styles.textStyling}>{item.fields}</Text>}
                        keyExtractor={(item, id) => id}
                        
                    />
                <TouchableOpacity style={styles.buttonContainer} onPress={ () => goToMessScreen() }>
                    <Text style={styles.buttonText}>Message</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.selectTabs}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={ () => setScreen(1) }>
                        <Text style={[tabScreen === 1 ? { fontFamily: 'Poppins_700Bold', backgroundColor: '#562349', color : '#FFFFFF', borderRadius: 20 } : { fontFamily: 'Quicksand', color: '#562349', }, { width: '90%', textAlign: 'center' }]}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={ () => setScreen(2) }>
                        <Text style={[tabScreen === 2 ? { fontFamily: 'Poppins_700Bold', backgroundColor: '#562349', color : '#FFFFFF', borderRadius: 20 } : { fontFamily: 'Quicksand', color: '#562349', }, { width: '90%', textAlign: 'center' }]}>Reviews</Text>
                    </TouchableOpacity>
                </View>
                {tabScreen === 1 
                    ? <About /> 
                    : addReview 
                        ? <ProfileAddReview addReview={addReview} setAddReview={ (x) => setAddReview(x) } /> 
                        : <Review addReview={addReview} setAddReview={ (x) => setAddReview(x) } />
                }
            </View>
        {/* {shownComp === 1 && <MessagesScreen />}
        {shownComp === 2 && <LikedScreen />} */}
        <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#FAFAFA',
        justifyContent: 'space-between'
    },
    filedsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    textStyling: {
        fontFamily: 'Quicksand',
        fontWeight: '500',
        fontSize: 14,
        color: '#562349'
    },
    buttonContainer: {
        backgroundColor: '#562349',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 15,
        height: 28
    },
    buttonText: {
        fontFamily: 'Poppins_700Bold',
        color: '#FFFFFF',
        
    },
    selectTabs: {
        borderBottomColor: '#562349',
        borderBottomWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 15,
        height: 25
    }
});