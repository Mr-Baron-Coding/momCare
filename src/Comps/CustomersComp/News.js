import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React from 'react';

import Placeholder from '../../../assets/Images/newsPlaceholder.png';

// fonts
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';

export default function News() {
    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
    });
    if (!fontsLoaded) {
        return null;
    };

    const articalList = [
        { header: 'Animal instinct?', body: 'Breastfeeding, why is it not always works, and how does nature know how to cope...', pic: '', id: 0 },
        { header: 'Sooo sleepy......', body: "Sleep problems are a common thing after giving birth, but you can't blameit all on the baby...", pic: '', id: 1 },
        { header: 'Start moving', body: 'How, how much and when to get back in shape after giving birth.', pic: '', id: 2 },
    ];

    const ArtiCard = ({item}) => {
        return(
            <View style={styles.artiCard}>
                <Image
                    style={{
                        resizeMode: 'cover',
                        width: '25%',
                        aspectRatio: '3/5'
                    }}
                    source={Placeholder}
                />
                <View style={styles.artiContainer}>
                    <Text style={styles.artiHeader}>{item.header}</Text>
                    <Text style={styles.artiContent}>{item.body}</Text>
                    <Text style={styles.artiRead}>{`Read more >`}</Text>
                </View>
            </View>
        )
    };

  return (
    <View style={styles.container}>
        <Text style={styles.bodyHeader}>Content and articles</Text>
        <FlatList 
            data={articalList}
            renderItem={({item}) => <ArtiCard item={item} />}
            keyExtractor={item => item.id}
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
    artiCard: {
        width: '95%',
        aspectRatio: '19/8',
        borderColor: '#C4A7B5',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 20,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    artiContainer: {
        paddingHorizontal: 10,
        width: '100%',
        // lineHeight: 20,
        overflow: 'visible',
        flexWrap: 'nowrap',
        flexShrink: 1
    },
    artiHeader: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
        fontWeight: 600,
        color: '#562349',
        lineHeight: 30
    },
    artiContent: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 12,
        fontWeight: 100,
        color: '#562349',
        lineHeight: 20
    },
    artiRead: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        fontSize: 10,
        fontWeight: 100,
    }
})