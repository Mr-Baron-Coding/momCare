import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { database } from '../../../firebase';
import { auth } from '../../../firebase';

import UserHeader from '../../Comps/CustomersComp/UserHeader';
import FieldIcoons from '../../Comps/FieldIcoons';
import Reviews from '../../Comps/CustomersComp/Reviews';
import News from '../../Comps/News';
import Map from '../Map';
import Footer from '../../Comps/Footer';
import MenuScreen from '../../Comps/Menu';
import LikedScreen from './LikedScreen';
import MessagesScreen from './MessagesScreen';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { saveLikedata, saveProvidersData, saveReviewsData, saveUserData } from '../../Redux/features/dataSlice';

// fonts
import { Poppins_700Bold, Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';

export default function Homescreen() {
  const dispatch = useDispatch();
  const likeList = useSelector((state) => state.data.likeData);
  const [menuWindow, setMenu] = useState(false);
  const [loggedUser, setLoggedUser] = useState({}); //current user data
  // const [likeList, setLikeList] = useState([]); // cureent user like list
  const [providersData, setData] = useState([]); // providers list of data 
  const [reviewsData, setReviewsData] = useState([]); // list of reviews
  const [isLoading, setLoading] = useState(false);
  const [shownComp, setShownComp] = useState(0);

  useEffect(() => {
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
                  }
              });
              arrList.push(arr);
              arr = {};
          })
          setData(arrList);
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
            setReviewsData(arr);
            dispatch(saveReviewsData(arr));
          } else {
            console.log("No data available");
            setLoading(false);
          }
      }).catch((error) => {
      console.error(error);
      });
    }).then(() => {
      get(child(dbRef, 'users/customers/' + auth.currentUser.uid + '/'))
      //get logged user's data
      .then((snapshot) => {
        if (snapshot.exists()) {
          let ob = {};
          snapshot.forEach(item => {
            if ( item.key !== 'likes' ) {
              ob[item.key] = item.val();
            }
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
          })            
          setLoggedUser(ob);
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
  { screen: <FieldIcoons loggedUser={loggedUser} providersData={providersData} reviewsData={reviewsData} />, id: 1 },
  { screen: <Reviews loggedUser={loggedUser} providersData={providersData} reviewsData={reviewsData} />, id: 2 },
  { screen: <News />, id: 3 },
  // { screen: <Map />, id: 4 },
  { screen: <Footer />, id: 4 },
];

  return ( isLoading ? <ActivityIndicator /> :
    <View style={styles.container}>
      <UserHeader heightVar={100} logoHeight={50} logoWidth={100} showBackIcon={true} showUserIcons={true} setMenu={setMenu} setShownComp={(x) => setShownComp(x)} />
      <MenuScreen menuWindow={menuWindow} closeMenu={ () => setMenu(false) } />
      {shownComp === 0 && 
        <FlatList
          data={Data}
          renderItem={({item}) => item.screen}
          keyExtractor={item => item.id}
          // style={styles.compStyling}
        />}
      {shownComp === 1 && <MessagesScreen />}
      {shownComp === 2 && <LikedScreen />}
      {/* <Footer /> */}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  // compStyling: {
  //   paddingHorizontal: 20
  // }  
});