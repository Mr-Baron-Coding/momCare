import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React from 'react';

import Placeholder from '../../assets/Images/newsPlaceholder.png';

export default function News() {
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
                        height: 150,
                        aspectRatio: '1/1'
                    }}
                    source={Placeholder}
                />
                <View>
                    <Text>{item.header}</Text>
                    <Text>{item.body}</Text>
                </View>
            </View>
        )
    };

  return (
    <View style={styles.container}>
        <Text style={styles.bodyHeader}>All fields of care</Text>
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
        textAlign: 'left',
    },
    bodyHeader: {
        fontFamily: 'Poppins_700Bold', 
        color: '#562349',
        marginTop: 10,
        marginBottom: 10
    },
    artiCard: {
        width: '95%',
        aspectRatio: '19/8',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 30,
        marginVertical: 20,
        flexDirection: 'row',
        overflow: 'hidden'
    }
})