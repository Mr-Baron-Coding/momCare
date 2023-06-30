import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { remove, ref, child } from 'firebase/database';
import { database } from '../../../firebase';
import { auth } from '../../../firebase';
import UserHeader from '../../Comps/CustomersComp/UserHeader';
import MenuScreen from '../../Comps/Menu';
import Footer from '../../Comps/Footer';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { saveLikedata } from '../../Redux/features/dataSlice';

//image
import Placeholder from '../../../assets/Images/placeholder.jpg'
//icons
import Heart from '../../../assets/SVG/UserIcons/heart';

//fonts
import { useFonts, Poppins_900Black, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';

export default function LikedScreen() {
  const dispatch = useDispatch();
  const providersData = useSelector((state) => state.data.providersData);
  const likeData = useSelector((state) => state.data.likeData);
  const [likeList, setLikeList] = useState([]);
  const [menuWindow, setMenu] = useState(false);

  useEffect(() => {
    setLikeList(likeData);
  },[]);

  let [fontsLoaded] = useFonts({
    Poppins_900Black, Poppins_400Regular, Inter_400Regular
  });
  if (!fontsLoaded) {
      return null;
  };

  //remove like from provider
  const removeLike = (provID) => {
    const disLiked = likeList.filter(like => like.provID === provID);
    const liked = likeList.filter(like => like.provID !== provID);
    dispatch(saveLikedata(liked));
    setLikeList(liked);
    remove(child(ref(database), 'users/customers/' + auth.currentUser.uid + '/likes/' + disLiked[0].likeID + '/'))
    .then(() =>{ 
      console.log('removed');
    })
    .catch((error) => {
        console.error(error);
    })
};

  const likePreview = (item) => {
    const provider = providersData.filter(prov => prov.userID === item.provID);
    console.log(provider);

    return (
      <View style={{ paddingVertical: 10, borderBottomColor: 'lightgrey', borderBottomWidth: 2 }}>
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', flex: 1, paddingVertical: 10 }}>
          <Image 
            source={provider[0].profilePic === '' && Placeholder}
            style={{ resizeMode: 'cover', height: 50, width: 50, borderRadius: 25 }}
          />
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.nameTextStyle}>{provider[0].userName}</Text>
            <FlatList 
              data={provider[0].cernqual}
              renderItem={({item}) => <Text style={styles.fieldsTextStyle}>{item.fields}</Text>}
              keyExtractor={item => item.messageThreadID}
              contentContainerStyle={{ gap: 5 }}
            />
            <TouchableOpacity onPress={ () => removeLike(provider[0].userID) }>
              <Heart color='#562349' />
            </TouchableOpacity>
          </View>  
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={ () => navigation.navigate('Message', {item: item}) }>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <UserHeader heightVar={100} logoHeight={50} logoWidth={100} showBackIcon={true} showUserIcons={true} setMenu={setMenu} />
      <MenuScreen menuWindow={menuWindow} closeMenu={ () => setMenu(false) } />
      <View style={styles.inerContainer}>
      <Text style={styles.headerText}>Providers you liked</Text>
      <FlatList 
          data={likeList}
          renderItem={({item}) => likePreview(item)}
          keyExtractor={item => item.messageThreadID}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    flex: 1
  },
  headerText: {
    fontFamily: 'Poppins_700bold',
    color: '#562349',
    fontSize: 16
  },
  nameTextStyle: {
    fontFamily: 'Poppins_900Black',
    color: '#562349',
    fontSize: 14
  },
  fieldsTextStyle: {
    fontFamily: 'Poppins_400Regular',
    color: '#562349',
    fontSize: 12
  },
  buttonContainer: {
    backgroundColor: '#562349',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
},
buttonText: {
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    
}
});