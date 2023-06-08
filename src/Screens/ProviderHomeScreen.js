import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

import ProviderHeader from '../Comps/ProvComp/ProviderHeader';
import AboutComp from '../Comps/ProvComp/AboutComp';
import ReviewsComp from '../Comps/ProvComp/ReviewsComp';
import MessageComp from '../Comps/ProvComp/MessagesComp';
import Footer from '../Comps/Footer';
import Menu from '../Comps/Menu';

//redux
import { useDispatch } from 'react-redux';

import { ref, get } from "firebase/database";
import { database } from '../../firebase';
import { auth } from '../../firebase';

// fonts
import { Poppins_700Bold, Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import { saveLoggedProviderData } from '../Redux/features/providerDataSlice';

export default function ProviderHomeScreen() {
  const dispatch = useDispatch();
  const [userData, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [tabScreen, setScreen] = useState(1);
  const [menuWindow, setMenu] = useState(false);
  const [shownComp, setShownComp] = useState(0);
  
    useEffect(() => {
      setLoading(true);
      get(ref(database, `users/providers/${auth.currentUser.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let provObj = {};
          // check if providers have array of messages or certifications
          snapshot.forEach(items => {
            if ( items.key !== 'messages' && items.key !== 'cernqual' && items.key !== 'carearea' && items.key !== 'reviewList') {
              provObj[items.key] = items.val();
            } else if ( items.hasChildren ) {
              let cerList = [];
              items.forEach(arr => {
                //check messages
                if ( items.key === 'messages' ) {
                  let listOfMessages = [];
                  arr.forEach(eachMess => {
                    let ob = {}
                    ob[eachMess.key] = eachMess.val();
                    listOfMessages.push(ob);
                  })
                  provObj['messages'] = listOfMessages;
                }
                //check for certifications
                if ( items.key === 'cernqual' ) {
                  let cerObj = {};
                  arr.forEach(eachMess => {
                    cerObj[eachMess.key] = eachMess.val();
                  })
                  cerList.push(cerObj);
                  cerObj = {};
                  provObj['cernqual'] = cerList;
                }
                //check for carearea
                let areaArr = [];
                if ( items.key === 'carearea' ) {
                  items.forEach(area => {
                    let ob = {};
                    ob['id'] = area.key;
                    ob['carearea'] = area.val().carearea;
                    areaArr.push(ob);
                  })
                  provObj['carearea'] = areaArr;
                }
                //check for reviews
                let reviewArr = []
                if ( items.key === 'reviewList' ) {
                  items.forEach(review => {
                    let ob = {};
                    ob['id'] = review.key;
                    ob['reviewID'] = area.val().carearea;
                    reviewArr.push(ob);
                  })
                  provObj['reviewList'] = reviewArr;
                }
              })
            }
          })
          setData(provObj);
          dispatch(saveLoggedProviderData(provObj))
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error(error + 'Could not retrive users data...');
        setLoading(false);
      });
    },[]);

    let [fontsLoaded] = useFonts({
      Poppins_700Bold, Poppins_400Regular,
      });
      if (!fontsLoaded) {
          return null;
    };

  return (
    <View style={{ backgroundColor: '#F1F1F1', gap: 5, flex: 1, height: '100%', justifyContent: 'space-between' }}>
      <Menu menuWindow={menuWindow} closeMenu={ () => setMenu(false) } />
      <ProviderHeader showBackIcon={false} setMenu={setMenu} setShownComp={(x) => setShownComp(x)} />
      { !isLoading ? 
      <View style={{ flexGrow: 1 }}>
        <View style={styles.selectTabs}>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={ () => setScreen(1) }>
                <Text style={[tabScreen === 1 ? { fontFamily: 'Poppins_700Bold', backgroundColor: '#562349', color : '#FFFFFF', borderRadius: 20 } : { fontFamily: 'Quicksand', color: '#562349', }, { width: '90%', textAlign: 'center' }]}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={ () => setScreen(2) }>
                <Text style={[tabScreen === 2 ? { fontFamily: 'Poppins_700Bold', backgroundColor: '#562349', color : '#FFFFFF', borderRadius: 20 } : { fontFamily: 'Quicksand', color: '#562349', }, { width: '90%', textAlign: 'center' }]}>Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={ () => setScreen(3) }>
                <Text style={[tabScreen === 3 ? { fontFamily: 'Poppins_700Bold', backgroundColor: '#562349', color : '#FFFFFF', borderRadius: 20 } : { fontFamily: 'Quicksand', color: '#562349', }, { width: '90%', textAlign: 'center' }]}>Messages</Text>
            </TouchableOpacity>
        </View>
         {tabScreen === 1 && <AboutComp />} 
         {tabScreen === 2 && <ReviewsComp />} 
         {tabScreen === 3 && <MessageComp />} 
      </View>
      : <ActivityIndicator size='large' color='#562349' /> }
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  selectTabs: {
    borderBottomColor: '#562349',
    borderBottomWidth: 2,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 25,
    padding: 20
  },
  fieldsHeader: {
    padding: 20,
    backgroundColor: '#FFFFFF'
  },
  fieldsHeaderText: {
    fontFamily: 'Poppins_400Regular', 
    color: '#562349', 
    fontSize: 14,  
     
  }
});