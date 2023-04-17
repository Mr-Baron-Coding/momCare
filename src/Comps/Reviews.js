import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// images
import UserPic from '../../assets/Images/placeholder.jpg';
import Stars from '../../assets/SVG/Stars';

// fonts
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';

export default function Reviews({ providersData }) {
    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
    });
    if (!fontsLoaded) {
        return null;
    };

    // useEffect(() => {
    //     console.log(providersData);
    // },[providersData])

    const proList = [
        { name: 'Mike', profession: 'a', location: 's', pic: '', stars: '' },
        { name: 'Alex', profession: 'a', location: 's', pic: '', stars: '' },
        { name: 'Aviva', profession: 'a', location: 's', pic: '', stars: '' },
        { name: 'Viva', profession: 'a', location: 's', pic: '', stars: '' },
    ];

    const ProCard = ({ item }) => {
        return(
            <TouchableOpacity style={styles.profCard} onPress={ () => navigation.navigate('ProviderDetail', item ) }>
                <Image 
                    style={{
                        resizeMode: 'cover',
                        width: 140,
                        height: 140,
                        borderRadius: 105
                    }}
                    source={UserPic}
                />
                <Text>{item.name}</Text>
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
            data={providersData}
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
        flex: 1
    },
    bodyHeader: {
        fontFamily: 'Poppins_700Bold', 
        color: '#562349',
        marginTop: 10
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