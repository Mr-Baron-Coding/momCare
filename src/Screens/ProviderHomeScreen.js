import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

import ProviderHeader from '../Comps/ProvComp/ProviderHeader';
import AboutComp from '../Comps/ProvComp/AboutComp';
import ReviewsComp from '../Comps/ProvComp/ReviewsComp';
import MessageComp from '../Comps/ProvComp/MessagesComp';
import Footer from '../Comps/Footer';
import Menu from '../Comps/Menu';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { screenChange, saveProviderMessages } from '../Redux/features/providerDataSlice';

//firebase
import { ref, get, onChildChanged, off, query, equalTo, child } from "firebase/database";
import { database } from '../../firebase';
import { auth } from '../../firebase';

// fonts
import { Poppins_700Bold, Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import { saveLoggedProviderData } from '../Redux/features/providerDataSlice';

export default function ProviderHomeScreen() {
  const dispatch = useDispatch();
  const tabNavScreens = useSelector((state) => state.providerData.tabNavScreens);
  const [isLoading, setLoading] = useState(true);
  const [menuWindow, setMenu] = useState(false);
  // const [shownComp, setShownComp] = useState(0);
  
    useEffect(() => {
      setLoading(true);
      get(ref(database, `users/providers/${auth.currentUser.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let provObj = {};
          // check if providers have array of messages or certifications
          snapshot.forEach(items => {
            if ( items.key === 'cernqual' || items.key === 'messages' || items.key === 'carearea' || items.key === 'reviewsList' ) {
              provObj[items.key] = [];
            } else {
              provObj[items.key] = items.val();
            }
            if ( items.hasChildren ) {
              let cerList = [];
              items.forEach(arr => {
                //check messages
                if ( items.key === 'messages' ) {
                  // let listOfMessages = [];
                  arr.forEach(eachMess => {
                    let ob = {}
                    ob[eachMess.key] = eachMess.val();
                    // listOfMessages.push(ob);
                    provObj['messages'].push(ob);
                  })
                  // provObj['messages'].push(ob);
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
          if (provObj['messages'] === undefined) provObj['messages'] = [];
          dispatch(saveLoggedProviderData(provObj));
          if ( provObj['messages'].length !== 0) {
            retriveMessages(provObj['messages']);
          }
          setTimeout(() => {
            setLoading(false);

          }, 300)
        }
      })
      .catch((error) => {
        console.error(error + 'Could not retrive users data...');
        setLoading(false);
      });
    },[]);

    const retriveMessages = (messagesID) => {
      let messList = [];
      get(ref(database, 'users/messages/')).then((snap) => {
        if(snap.exists()) {
          snap.forEach(thread => {
            // console.log(thread.key);
            for(let i=0; i<=messagesID.length-1; i++){
              if (thread.key === messagesID[i].messageID){
                let threadOb = {};
                let bodyArr = [];
                thread.forEach(threadComp => {
                  if ( threadComp.hasChildren() ) {
                    //message thread messages
                    let ob = {};
                    threadComp.forEach(messBody => {
                      ob[messBody.key] = messBody.val();
                      
                    })
                    bodyArr.push(ob);
                    threadOb['body'] = bodyArr;
                  } else {
                    //base info 
                    threadOb[threadComp.key] = threadComp.val();
                  }
                })
                messList.push(threadOb);
              }
            }
          })
        } else {
          console.log('There are no messages');
        }
        dispatch(saveProviderMessages(messList));
      })
      .catch((err) => {
        console.log(err + 'No messages retrived');
      })
    }

    let [fontsLoaded] = useFonts({
      Poppins_700Bold, Poppins_400Regular,
      });
      if (!fontsLoaded) {
          return null;
    };

    onChildChanged(ref(database, 'users/providers' + auth.currentUser.uid + '/messages'), (snap) => {
      if ( snap.exists() ) {
        console.log(snap.val());
      }
      else {
        console.log('Error');
      }
      return unsub = off();
      
      // .catch((err) => {
      //   console.log(err + "Can't update");
      // })
    })

  return (
    <View style={{ backgroundColor: '#F1F1F1', flex: 1, height: '100%', justifyContent: 'space-between' }}>
      <Menu menuWindow={menuWindow} closeMenu={ () => setMenu(false) } />
      <ProviderHeader showBackIcon={false} setMenu={setMenu} />
      { !isLoading ? 
      <View style={{ flexGrow: 1 }}>
        <View style={styles.selectTabs}>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={ () => dispatch(screenChange(1)) }>
                <Text style={[tabNavScreens === 1 ? { fontFamily: 'Poppins_700Bold', backgroundColor: '#562349', color : '#FFFFFF', borderRadius: 20 } : { fontFamily: 'Quicksand', color: '#562349', }, { width: '90%', textAlign: 'center' }]}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={ () => dispatch(screenChange(2)) }>
                <Text style={[tabNavScreens === 2 ? { fontFamily: 'Poppins_700Bold', backgroundColor: '#562349', color : '#FFFFFF', borderRadius: 20 } : { fontFamily: 'Quicksand', color: '#562349', }, { width: '90%', textAlign: 'center' }]}>Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={ () => dispatch(screenChange(3)) }>
                <Text style={[tabNavScreens === 3 ? { fontFamily: 'Poppins_700Bold', backgroundColor: '#562349', color : '#FFFFFF', borderRadius: 20 } : { fontFamily: 'Quicksand', color: '#562349', }, { width: '90%', textAlign: 'center' }]}>Messages</Text>
            </TouchableOpacity>
        </View>
         {tabNavScreens === 1 && <AboutComp />} 
         {tabNavScreens === 2 && <ReviewsComp />} 
         {tabNavScreens === 3 && <MessageComp />} 
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