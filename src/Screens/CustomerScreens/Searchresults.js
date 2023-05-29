import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Poppins_700Bold, Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
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

// images
import Placeholder from '../../../assets/Images/placeholder.jpg';

// icons
import Heart from '../../../assets/SVG/UserIcons/heart';
import Footer from '../../Comps/Footer';

export default function Searchresults({ route }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const likeList = useSelector((state) => state.data.likeData);
    const { name, providersData, reviewsData, loggedUser } = route.params;
    const [menuWindow, setMenu] = useState(false);
    const [listOFProviders, setProviders] = useState([]);
    const [localLikeList, setLocalLikeList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [shownComp, setShownComp] = useState(0);

    //filter providers with correct field of care
    useEffect(() => {
        let arr = [];
        let obj = {};
        providersData.forEach((item) => {
            obj = item;
            if (item.cernqual) {
                item.cernqual.forEach(field => {
                    if (field.fields === name) {
                        obj = {...obj, selected: true}
                    }
                })
            }
            arr.push(obj);
            obj = {};
        });
        setProviders(arr);
    },[]);

    let [fontsLoaded] = useFonts({
        Poppins_700Bold, Poppins_400Regular
    });
    if (!fontsLoaded) {
        return null;
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
            // setLoading(prev => prev = false);
        })
    };

    //remove like from provider
    const removeLike = (provID) => {
        const disLiked = likeList.filter(like => like.provID === provID);
        const liked = likeList.filter(like => like.provID !== provID);
        // setLocalLikeList(liked);
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
        const isLiked = likeList.filter(like => like.provID === item.userID);
        return (
            <View style={styles.cardContainer}>
                <View style={styles.cardTextTop}>
                    <TouchableOpacity style={styles.pressContainer} onPress={ () => navigation.navigate('ProviderDetail', {item: item, name: name, loggedUser: loggedUser, likeList: likeList} ) }>
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
                            <Text style={{ fontFamily: 'Poppins_700Bold', color: '#562349', fontSize: 14, lineHeight: 18 }}>{item.userName}</Text>
                            <Text style={{ fontFamily: 'Poppins_400Regular', color: '#562349', fontSize: 12, lineHeight: 14 }}>{name}</Text>
                            <Text style={{ fontFamily: 'Poppins_400Regular', color: '#8C8C8C', fontSize: 10, lineHeight: 12 }}>Last review 00.00.0000</Text>
                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                <Text style={{ height: 20, width: 60, borderRadius: 40, backgroundColor: '#C4A7B5', color: '#FFFFFF', fontFamily: 'Poppins_700Bold', fontSize: 12, paddingVertical: 3, textAlign: 'center' }}>{item.review}</Text>
                                <Text style={{ height: 20, width: 60, borderRadius: 40, backgroundColor: '#C4A7B5', color: '#FFFFFF', fontFamily: 'Poppins_700Bold' }}>10 Years</Text>
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
        <UserHeader heightVar={100} logoHeight={50} logoWidth={100} showBackIcon={true} showUserIcons={true} setMenu={setMenu} setShownComp={(x) => setShownComp(x)} searchFieldFill={route.params.name} likeList={likeList} />
        <MenuScreen menuWindow={menuWindow} closeMenu={ () => setMenu(false) } />
        {isLoading ? <ActivityIndicator size='large' color='#C4A7B5' /> :
        shownComp === 0 && <View style={{ flex: 1 }}>
            <Text style={styles.bodyHeader}>{route.params.name}</Text>
            <FlatList 
                data={listOFProviders}
                renderItem={({item}) => item.selected && <ProvCard item={item} />}
                keyExtractor={(item, id) => id}
                initialNumToRender={5}
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
        marginVertical: 10,
        paddingHorizontal: 15,
        
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
        
    }
});