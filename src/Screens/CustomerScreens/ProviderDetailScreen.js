import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

import About from '../../Comps/ProfileAbout';
import Review from '../../Comps/ProfileReviews';
import ProfileAddReview from '../../Comps/ProfileAddReview';
import Footer from '../../Comps/Footer';
import UserHeader from '../../Comps/CustomersComp/UserHeader';
import MessagesScreen from './MessagesScreen';
import LikedScreen from './LikedScreen';
import MenuScreen from '../../Comps/Menu';

export default function ProviderDetailScreen({ navigation, route }) {
    const { userName, carearea, mail, phone, site, fields, about, cernqual, reviewsList, userID } = route.params.item;
    const { loggedUser, likeList } = route.params;
    const selectedField = route.params.name;
    const [menuWindow, setMenu] = useState(false);
    const [tabScreen, setScreen] = useState(1);
    const [addReview, setAddReview] = useState(false);
    const [shownComp, setShownComp] = useState(0);

    // useEffect(() => {
    //     console.log(route.params);
    // },[])
    
  return (
    <View style={styles.mainContainer}>
        <UserHeader heightVar={100} logoHeight={50} logoWidth={100} showBackIcon={true} showUserIcons={true} setMenu={setMenu} userName={loggedUser.userName} setShownComp={(x) => setShownComp(x)} likeList={likeList} />
        <MenuScreen menuWindow={menuWindow} closeMenu={ () => setMenu(false) } />
        {shownComp === 0 && <View style={styles.bodyContainer}>
            <View style={styles.filedsContainer}>
                <FlatList 
                    data={fields}
                    renderItem={({item}) => <Text style={styles.textStyling}>{item}</Text>}
                    keyExtractor={(item, id) => id}
                    
                />
            <TouchableOpacity style={styles.buttonContainer} onPress={ () => navigation.navigate('Message', {item: route.params.item}) }>
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
                ? <About userName={userName} about={about} fields={fields} cernqual={cernqual} carearea={carearea} mail={mail} phone={phone} site={site} /> 
                // ? <About route={route} /> 
                : addReview 
                    ? <ProfileAddReview userName={userName} setAddReview={setAddReview} providerID={userID} selectedField={selectedField} /> 
                    : <Review reviewsList={reviewsList} addReview ={addReview} setAddReview={setAddReview} providerID={userID} />
            }
        </View>}
        {shownComp === 1 && <MessagesScreen />}
        {shownComp === 2 && <LikedScreen />}
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