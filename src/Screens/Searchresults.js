import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../Comps/Header';
import { Poppins_700Bold, Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import { getDatabase, ref, child, get, set, push, query, orderByChild, orderByKey, update } from "firebase/database";
import { database } from '../../firebase';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

// images
import Placeholder from '../../assets/Images/placeholder.jpg';

// icons
import Heart from '../../assets/SVG/UserIcons/heart';

export default function Searchresults({ route }) {
    const navigation = useNavigation();
    const { name } = route.params;
    const [providersData, setData] = useState([]);
    const [listOFProviders, setProviders] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const dbRef = ref(database);
        setLoading(prev => prev = true);
        get(child(dbRef, 'users/providers/')).then((snapshot) => {
            let arrList = [];
            if (snapshot.exists()) {
                let arr = {};
                snapshot.forEach(user => {
                    user.forEach(item => {
                        if (!item.hasChildren()) {
                            arr[item.key] = item.val();
                            // arr['selected'] = false;
                        }
                        if (item.hasChildren()) {
                            let areaList = [];
                            item.key === 'carearea' && item.forEach(area => {
                                areaList.push(area.val().carearea);
                                arr[item.key] = areaList;
                                
                            })
                            let certList = [];
                            item.key === 'cernqual' && item.forEach(area => {
                                if ( area.val().fields === name ) { 
                                    arr['selected'] = true 
                                } 
                                if ( area.val().fields !== name && arr['selected'] !== true ) { 
                                    arr['selected'] = false 
                                } 
                                certList.push({fields: area.val().fields, from: area.val().from, year: area.val().year});
                                arr[item.key] = certList;
                            })
                        }
                    });
                    arrList.push(arr);
                    setProviders(arrList);
                    arr = {};
                });
            } else {
              console.log("No data available");
            }
        })
        .then(() => {
            get(child(ref(database), 'users/customers/' + auth.currentUser.uid + '/likes/'))
            .then((snap) => {
                if (snap.exists()) {
                    let arr = [];
                    snap.forEach(likes => {
                        likes.forEach(val => {
                            arr.push({provID: val.val(), likeID: likes.key})
                        })
                    })
                setLikeList(arr);
                }
            })
            .catch((error) => {
                console.error(error);
                // setLoading(prev => prev = false);
            })
        })
        .then(() => setLoading(prev => prev = false))
        .catch((error) => {
            console.error(error);
            setLoading(prev => prev = false);
        });
    },[]);
    // useEffect(() => {
    //     console.log(listOFProviders);
    //     console.log(likeList);
    // },[listOFProviders, likeList])

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
            get(child(ref(database), 'users/customers/' + auth.currentUser.uid + '/likes/'))
            .then((snap) => {
                if (snap.exists()) {
                    let arr = [];
                    snap.forEach(likes => {
                        likes.forEach(val => {
                            arr.push({provID: val.val(), likeID: likes.key})
                        })
                    })
                setLikeList(arr);
                }
            })
            .catch((error) => {
                console.error(error);
                // setLoading(prev => prev = false);
            })
        })
        .catch((error) => {
            console.error(error);
            // setLoading(prev => prev = false);
        })
    };

    //remove like from provider
    const removeLike = (provDetail) => {
        const isLiked = likeList.filter(like => like.provID === provDetail);
        // console.log(isLiked.provID + 'Removed');
        console.log(isLiked[0]);

    };

    const ProvCard = ({ item }) => {
        const isLiked = likeList.filter(like => like.provID === item.userID);
        console.log(isLiked.length);
        return (
            <View style={styles.cardContainer}>
                <View style={styles.cardTextTop}>
                    <TouchableOpacity style={styles.pressContainer} onPress={ () => navigation.navigate('ProviderDetail', item ) }>
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
                        {/* <Heart fill={  : } /> */}
                        {isLiked.length === 0 ? <Heart color='white' /> : <Heart color='#562349' />}
                    </TouchableOpacity>
                </View>
                <View style={styles.cardTextBottom}>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Message</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

  return ( 
    <View>
        <Header showSearch={true} route={route} heightVar={20} heightProp={200} />
        {isLoading ? <ActivityIndicator size='large' color='blue' /> :
        <View>
            <Text style={styles.bodyHeader}>{name}</Text>
        {/* <FlatList 
            data={providersData}
            renderItem={({item}) => <ProvCard item={item} />}
            keyExtractor={(item, id) => id}
            initialNumToRender={5}
        /> */}
        <FlatList 
            data={listOFProviders}
            renderItem={({item}) => item.selected && <ProvCard item={item} />}
            keyExtractor={(item, id) => id}
            initialNumToRender={5}
        />
        </View>
        }
        {/* <FlatList 
            data={likeList}
            renderItem={({item}) => <Text>{item}</Text>}
            keyExtractor={(item, id) => id}
        /> */}
    </View>
  )
}

const styles = StyleSheet.create({
    bodyHeader: {
        fontFamily: 'Poppins_700Bold', 
        color: '#562349',
        height: '5%',
        marginTop: 10,
        marginBottom: 10, 
        paddingHorizontal: 15
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