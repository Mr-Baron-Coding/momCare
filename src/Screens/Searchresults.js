import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../Comps/Header';
import { Poppins_700Bold, Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import { getDatabase, ref, child, get } from "firebase/database";
import { database } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

// images
import Placeholder from '../../assets/Images/placeholder.jpg';

// icons
import Heart from '../../assets/SVG/UserIcons/heart';

export default function Searchresults({ route }) {
    const navigation = useNavigation();
    const { name } = route.params;
    const [providersData, setData] = useState([])

    useEffect(() => {
        const dbRef = ref(database);
        get(child(dbRef, 'data/Providers')).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              setData(snapshot.val());
            } else {
              console.log("No data available");
            }
        }).catch((error) => {
        console.error(error);
        });
    },[])

    let [fontsLoaded] = useFonts({
        Poppins_700Bold, Poppins_400Regular
    });
    if (!fontsLoaded) {
        return null;
    };

    const ProvCard = ({ item }) => {
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
                            <Text style={{ fontFamily: 'Poppins_700Bold', color: '#562349', fontSize: 14, lineHeight: 18 }}>{item.name}</Text>
                            <Text style={{ fontFamily: 'Poppins_400Regular', color: '#562349', fontSize: 12, lineHeight: 14 }}>{item.fields[0]}</Text>
                            <Text style={{ fontFamily: 'Poppins_400Regular', color: '#8C8C8C', fontSize: 10, lineHeight: 12 }}>Last review 00.00.0000</Text>
                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                <Text style={{ height: 20, width: 60, borderRadius: 40, backgroundColor: '#C4A7B5', color: '#FFFFFF', fontFamily: 'Poppins_700Bold', fontSize: 12, paddingVertical: 3, textAlign: 'center' }}>{item.review}</Text>
                                <Text style={{ height: 20, width: 60, borderRadius: 40, backgroundColor: '#C4A7B5', color: '#FFFFFF', fontFamily: 'Poppins_700Bold' }}>10 Years</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => {} }>
                        <Heart />
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
        <Header showSearch={true} route={route} heightVar={20} />
        <View>
            <Text style={styles.bodyHeader}>{name}</Text>
        <FlatList 
            data={providersData}
            renderItem={({item}) => <ProvCard item={item} />}
            keyExtractor={(item, id) => id}
            initialNumToRender={5}
        />
        </View>
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