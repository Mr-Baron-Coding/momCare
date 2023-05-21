import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

import Header from '../Comps/Header';
import About from '../Comps/ProfileAbout';
import Review from '../Comps/ProfileReviews';
import ProfileAddReview from '../Comps/ProfileAddReview';
import Footer from '../Comps/Footer';

export default function ProviderDetailScreen({ navigation, route }) {
    const { userName, carearea, mail, phone, site, fields, about, cernqual, reviewsList, userID } = route.params;
    const [tabScreen, setScreen] = useState(1);
    const [addReview, setAddReview] = useState(false);

    useEffect(() => {
        console.log(reviewsList);
    },[])
    
  return (
    <View style={styles.mainContainer}>
        <Header showSearch={false} showProfile={true} messHeader={false} route={route} heightVar={20} heightProp={140} userName={userName} />
        <View style={styles.bodyContainer}>
            <View style={styles.filedsContainer}>
                <FlatList 
                    data={fields}
                    renderItem={({item}) => <Text style={styles.textStyling}>{item}</Text>}
                    keyExtractor={(item, id) => id}
                    
                />
            <TouchableOpacity style={styles.buttonContainer} onPress={ () => navigation.navigate('Message', route.params) }>
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
                {/* <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={ () => setScreen(3) }>
                    <Text style={[tabScreen === 3 ? { fontFamily: 'Poppins_700Bold', backgroundColor: '#562349', color : '#FFFFFF', borderRadius: 20 } : { fontFamily: 'Quicksand', color: '#562349', }, { width: '90%', textAlign: 'center' }]}>Messages</Text>
                </TouchableOpacity> */}
            </View>
            {tabScreen === 1 
                ? <About userName={userName} about={about} fields={fields} cernqual={cernqual} carearea={carearea} mail={mail} phone={phone} site={site} /> 
                // ? <About route={route} /> 
                : addReview ? <ProfileAddReview setAddReview={setAddReview} providerID={userID} /> : <Review reviewsList={reviewsList} setAddReview={setAddReview} />
            }
        </View>
        <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#FAFAFA',
        justifyContent: 'space-between'
    },
    bodyContainer: {
        paddingTop: 50,
    },
    filedsContainer: {
        paddingHorizontal: 20
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
        // width: '100%'
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

// style={{
        //     shadowColor: 'black',
        //     shadowOffset: {
        //         width: 0,
        //         height: 8,
        //     },
        //     shadowOpacity: 0.46,
        //     shadowRadius: 11.14,
        // }}