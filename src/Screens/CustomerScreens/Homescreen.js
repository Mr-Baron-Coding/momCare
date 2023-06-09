import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

import { ref, child, get } from "firebase/database";
import { database } from '../../../firebase';
import { auth } from '../../../firebase';

import UserHeader from '../../Comps/CustomersComp/UserHeader';
import FieldIcoons from '../../Comps/CustomersComp/FieldIcoons';
import Reviews from '../../Comps/CustomersComp/Reviews';
import News from '../../Comps/CustomersComp/News';
// import Map from '../Map';
import Footer from '../../Comps/Footer';
import MenuScreen from '../../Comps/Menu';
import LikedScreen from './LikedScreen';
import MessagesScreen from './MessagesScreen';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { changetabScreen, saveLikedata, saveMessageData, saveProvidersData, saveReviewsData, saveUserData } from '../../Redux/features/dataSlice';

// fonts
import { Poppins_700Bold, Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';

export default function Homescreen() {
  const dispatch = useDispatch();
  const tabScreen = useSelector((state) => state.data.tabScreen);
  const [menuWindow, setMenu] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    tabScreen !== 0 && dispatch(changetabScreen(0));
    const dbRef = ref(database);
    setLoading(prev => prev = true);
    get(child(dbRef, 'users/providers/')).then((snapshot) => {
      //get providers
        let arrList = [];
        if (snapshot.exists()) {
            let arr = {};
            snapshot.forEach(user => {
                user.forEach(item => {
                  if (!item.hasChildren()) {
                      arr[item.key] = item.val();
                      if (item.key === 'carearea' || item.key === 'cernqual' || item.key === 'cernqual' || item.key === 'reviewsList') {
                        arr[item.key] = [];
                      }
                      
                  }
                  if (item.hasChildren()) {
                      let areaList = [];
                      item.key === 'carearea' && item.forEach(area => {
                          areaList.push(area.val().carearea);
                          arr[item.key] = areaList;
                      })
                      let certList = [];
                      item.key === 'cernqual' && item.forEach(area => {
                          certList.push({fields: area.val().fields, from: area.val().from, year: area.val().year});
                          arr[item.key] = certList;
                      })
                      let messList = [];
                      item.key === 'messages' && item.forEach(area => {
                          messList.push(area.key);
                          arr['messages'] = messList;
                      })
                  }
              });
              if (arr['reviewsList'] === undefined )  arr['reviewsList'] = [];
              arrList.push(arr);
              arr = {};
          })
          dispatch(saveProvidersData(arrList));
      } else {
        console.log("No data available");
        setLoading(false);
      }
    }).then(() => {
      //get reviews
      get(child(dbRef, 'users/reviews/')).then((snapshot) => {
        let arr = [];
          if (snapshot.exists()) {
            snapshot.forEach(provider => {
              arr.push(provider.val());
            })
            // console.log(snapshot.val());
            dispatch(saveReviewsData(arr));
          } else {
            console.log("No data available");
            setLoading(false);
          }
      }).catch((error) => {
      console.error(error);
      })
    .then(() => {
      // get all users messages threads 
      get(child(dbRef, 'users/messages/')).then((snapshot) => {
        if (snapshot.exists()) {  
          let arr = [];
          snapshot.forEach(messID => {
            let bodyFlow = [];       
            let messObj = {}; 
            messID.forEach(messItem => {
                // go through all messages threads
                if (messItem.hasChildren()){
                  // go through all items in message thread
                  let bodyI ={}; 
                  messItem.forEach(bodyItem => {
                    //if message thread has messages
                    bodyI[bodyItem.key] = bodyItem.val();
                  })
                  bodyFlow.push(bodyI);
                  bodyI ={};

                  messObj['body'] = bodyFlow;

                } else { 
                    messObj[messItem.key] = messItem.val();
                }
            })
            //check if connected to current user
            if (messObj['toID'] === auth.currentUser.uid || messObj['fromID'] === auth.currentUser.uid) {
              arr.push(messObj);
            }  
            messObj = {};
          })
          dispatch(saveMessageData(arr));
        }
      })
    })
    }).then(() => {
      get(child(dbRef, 'users/customers/' + auth.currentUser.uid + '/'))
      //get logged user's data
      .then((snapshot) => {
        if (snapshot.exists()) {
          let ob = {};
          snapshot.forEach(item => {
            if ( !item.hasChildren() ) {
              ob[item.key] = item.val();
            }
            else {
              if ( item.key === 'likes' ) {
                let likearr = [];
                item.forEach(like => {
                  like.forEach(prov => {
                    likearr.push({provID: prov.val(), likeID: like.key})
                  })
                })
              ob['likes'] = likearr;
              dispatch(saveLikedata(likearr));
              }
              if ( item.key === 'messages' ) {
                let messArr = [];
                item.forEach(mess => {
                  messArr.push(mess.key)
                })
                ob['messages'] = messArr;
              }
            }
          })            
          dispatch(saveUserData(ob));
        }
      })
      
    }).catch((error) => {
      console.error(error);
      setLoading(false);
    }); 
    setLoading(false);
  },[]);

  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_400Regular,
    });
    if (!fontsLoaded) {
        return null;
  };
  

const Data = [
  { screen: <FieldIcoons />, id: 1 },
  { screen: <Reviews />, id: 2 },
  { screen: <News />, id: 3 },
  // { screen: <Map />, id: 4 },
  { screen: <Footer />, id: 4 },
];

  return ( isLoading ? <ActivityIndicator /> :
    <View style={styles.container}>
      <UserHeader heightVar={100} logoHeight={50} logoWidth={100} showBackIcon={true} showUserIcons={true} setMenu={setMenu} />
      <MenuScreen menuWindow={menuWindow} closeMenu={ () => setMenu(false) } />
      {tabScreen === 0 && 
        <FlatList
          data={Data}
          renderItem={({item}) => item.screen}
          keyExtractor={item => item.id}
          contentContainerStyle={{ gap: 10 }}
        />}
      {tabScreen === 1 && <MessagesScreen />}
      {tabScreen === 2 && <LikedScreen />}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  }
});