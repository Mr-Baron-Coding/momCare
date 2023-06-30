import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { saveSelectedProvider } from '../../Redux/features/dataSlice';

// images
import UserPic from '../../../assets/Images/placeholder.jpg';
import Stars from '../../../assets/SVG/Stars';

// fonts
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';

export default function Reviews() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const providersList = useSelector((state) => state.data.providersData);
    const currentUserData = useSelector((state) => state.data.usedata);

    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
    });
    if (!fontsLoaded) {
        return null;
    };

    const handleMove = (item) => {
        dispatch(saveSelectedProvider(item));
        navigation.navigate('ProviderDetail');
    };

    const ProCard = ({ item }) => {
        console.log(item);
        return(
            <TouchableOpacity style={styles.profCard} onPress={ () => handleMove(item) }>
                <Image 
                    style={{
                        resizeMode: 'cover',
                        width: 140,
                        height: 140,
                        borderRadius: 105
                    }}
                    source={UserPic}
                />
                <Text style={{ fontFamily: 'Poppins_700Bold', color: '#AD6989', fontSize: 16 }}>{item.userName}</Text>
                <Text style={styles.bodyHeader}>Profession</Text>
                <Text style={styles.bodyHeader}>Location</Text>
                <Stars />
            </TouchableOpacity>
        )
    }

  return (
    <View style={styles.container}>
        <Text style={styles.bodyHeader}>Recent reviews</Text>
        <FlatList 
            data={providersList}
            renderItem={({item}) => <ProCard item={item} />}
            keyExtractor={(item, i) => i}
            horizontal={true}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    bodyHeader: {
        fontFamily: 'Poppins_700bold',
        color: '#562349',
        fontSize: 16
    },
    profCard: {
        backgroundColor: '#F0F1F1',
        width: 200,
        height: 300,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});