import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Poppins_700Bold, Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';

import { getDatabase, ref, child, get, set, push, query, orderByChild, orderByKey, update, remove } from "firebase/database";
import { database } from '../../../firebase';
import { auth } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';

import UserHeader from '../../Comps/CustomersComp/UserHeader';
import LikedScreen from './LikedScreen';
import MessagesScreen from './MessagesScreen';
import MenuScreen from '../../Comps/Menu';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { saveLikedata } from '../../Redux/features/dataSlice';
import { saveSelectedProvider } from '../../Redux/features/dataSlice';

// images
import Placeholder from '../../../assets/Images/placeholder.jpg';

// icons
import Heart from '../../../assets/SVG/UserIcons/heart';
import Footer from '../../Comps/Footer';

export default function Searchresults() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const providersList = useSelector((state) => state.data.providersData);
    const selectedCareField = useSelector((state) => state.data.selectedCareField);
    const likeList = useSelector((state) => state.data.likeData);
    const reviewsList = useSelector((state) => state.data.reviewsData);
    const loggedUser = useSelector((state) => state.data.userData);

    const [menuWindow, setMenu] = useState(false);
    const [listOFProviders, setProviders] = useState([]);
    const [shownComp, setShownComp] = useState(0);

    //filter providers with correct field of care
    useEffect(() => {
        //get all providers with selected care field
        providersList.forEach((item,index) => {
            if ( item.cernqual !== undefined ) {
                const  listToShow = item.cernqual.filter(field => field.fields === selectedCareField);
                //get all selected provider reviews
                const temp = reviewsList.filter(review => review.id === item.id);
                const day = new Date().getDate(temp[temp.length-1].timeStamp);
                const month = new Date().getMonth(temp[temp.length-1].timeStamp) + 1;
                const year = new Date().getFullYear(temp[temp.length-1].timeStamp)
                if (listToShow.length !== 0 ) {
                    setProviders([...listOFProviders, {...item, timeStamp: day + '/' + month + '/' + year }]);
                }
            }
        });
    },[]);

    let [fontsLoaded] = useFonts({
        Poppins_700Bold, Poppins_400Regular, Inter_400Regular
    });
    if (!fontsLoaded) {
        return null;
    };

    const handleMove = (item) => {
        dispatch(saveSelectedProvider(item));
        navigation.navigate('ProviderDetail');
    };

    // add like to provider
    const handleLike = (provDetail) => {
        const newKey = push(child(ref(database), 'users/customers/' + auth.currentUser.uid + '/likes')).key;
        update(child(ref(database), 'users/customers/' + auth.currentUser.uid + '/likes/' + newKey + '/'), {
            likedID: provDetail
        })
        .then(() =>{
            console.log('Saved');
        })
        .then(() => {
            dispatch(saveLikedata([...likeList, { provID: provDetail, likeID: newKey }]))
        })
        .catch((error) => {
            console.error(error);
        })
    };

    //remove like from provider
    const removeLike = (provID) => {
        const disLiked = likeList.filter(like => like.provID === provID);
        const liked = likeList.filter(like => like.provID !== provID);
        remove(child(ref(database), 'users/customers/' + auth.currentUser.uid + '/likes/' + disLiked[0].likeID + '/'))
        .then(() =>{
            console.log('removed');
        })
        .then(() => {
            dispatch(saveLikedata(liked));
        })
        .catch((error) => {
            console.error(error);
        })
    };

    const ProvCard = ({ item }) => {
        //
        const isLiked = likeList.filter(like => like.provID === item.userID);
        //get years of care in field
        const yearsOfExp = item.cernqual.filter(field => field.fields === selectedCareField);
        return (
            <View style={styles.cardContainer}>
                <View style={styles.cardTextTop}>
                    <TouchableOpacity style={styles.pressContainer} onPress={ () => handleMove(item) }>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{
                                    resizeMode: 'cover',
                                    width: 100,
                                    height: 100,
                                    borderRadius: 105
                                }}
                                source={Placeholder}
                            />
                        </View>
                        <View style={{ gap: 5 }}>
                            <Text style={{ fontFamily: 'Poppins_700Bold', color: '#562349', fontSize: 16, lineHeight: 18 }}>{item.userName}</Text>
                            <Text style={{ fontFamily: 'Poppins_400Regular', color: '#562349', fontSize: 14, lineHeight: 14 }}>{selectedCareField}</Text>
                            <Text style={{ fontFamily: 'Poppins_400Regular', color: '#8C8C8C', fontSize: 12, lineHeight: 12 }}>{`Last review ${item.timeStamp}`}</Text>
                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                <View style={styles.reviewNExpContainerStyle}>
                                    <Text style={styles.revNExpTextStyle}>
                                        {item.review}
                                    </Text>
                                </View>
                                <View style={styles.reviewNExpContainerStyle}>
                                    <Text style={styles.revNExpTextStyle}>
                                        {yearsOfExp[0].year}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ isLiked.length === 0 ? () => handleLike(item.userID) : () => removeLike(item.userID) }>
                        {isLiked.length === 0 ? <Heart color='white' /> : <Heart color='#562349' />}
                    </TouchableOpacity>
                </View>
                <View style={styles.cardTextBottom}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={ () => navigation.navigate('Message', {item: item}) }>
                        <Text style={styles.buttonText}>Message</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

  return ( 
    <View style={{ height: '100%', justifyContent: 'space-between' }}>
        <UserHeader heightVar={100} logoHeight={50} logoWidth={100} showBackIcon={true} showUserIcons={true} setMenu={setMenu} setShownComp={(x) => setShownComp(x)} searchFieldFill={selectedCareField} likeList={likeList} />
        <MenuScreen menuWindow={menuWindow} closeMenu={ () => setMenu(false) } />
        {shownComp === 0 && <View style={{ flex: 1 }}>
            <FlatList 
                data={listOFProviders}
                renderItem={({item}) => <ProvCard item={item} />}
                keyExtractor={(item, id) => id}
                initialNumToRender={5}
                contentContainerStyle={{ gap: 10 }}
            />
        </View>
        }
        {shownComp === 1 && <MessagesScreen />}
        {shownComp === 2 && <LikedScreen />}
        <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
    bodyHeader: {
        fontFamily: 'Poppins_700Bold', 
        color: '#562349',
        height: '5%',
        marginTop: 10,
        paddingHorizontal: 10
    },
    cardContainer: {
        backgroundColor: '#FFFFFF',
        height: 150,
        paddingHorizontal: 20,
        
    },
    cardTextTop: {
        flex: 5,      
        flexDirection: 'row',
        gap: 15
    },
    pressContainer: {
        flexDirection: 'row',
        flex: 5,
        alignItems: 'center'
    },
    cardTextBottom: {
        flex: 1
    },
    buttonContainer: {
        backgroundColor: '#562349',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    buttonText: {
        fontFamily: 'Poppins_700Bold',
        color: '#FFFFFF',
        
    },
    reviewNExpContainerStyle: {
        textAlign: 'center',
        alignContent: 'center', 
        justifyContent: 'center',
        backgroundColor: '#C4A7B5', 
        width: 50,
        borderRadius: 17
    },
    revNExpTextStyle: {
        color: '#FFFFFF', 
        fontFamily: 'Inter_400Regular', 
        fontSize: 12, 
        paddingVertical: 5
    },
});