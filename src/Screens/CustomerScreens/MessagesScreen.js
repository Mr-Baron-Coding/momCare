import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import UserHeader from '../../Comps/CustomersComp/UserHeader';
import MenuScreen from '../../Comps/Menu';
import Footer from '../../Comps/Footer';

//firebase
import { auth } from '../../../firebase';

//redux 
import { useSelector, useDispatch } from 'react-redux';
import { spliceMessages, splitMessages } from '../../Redux/features/dataSlice';

//image
import Placeholder from '../../../assets/Images/placeholder.jpg'
//icons
import UnreadIcon from '../../../assets/SVG/Messages/UnreadIcon';
import ReadIcon from '../../../assets/SVG/Messages/ReadIcon';

//fonts
import { useFonts, Poppins_900Black, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';

export default function MessagesScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const messageData = useSelector((state) => state.data.messagesData); 
    const providersData = useSelector((state) => state.data.providersData);
    const headerHeight = useSelector((state) => state.data.headerElement.isSearchOpen);
    const [messList, setMessList] = useState([]);
    const [menuWindow, setMenu] = useState(false);

    useEffect(() => {
      // dispatch(spliceMessages());
      messageData.forEach(messObj => {
        if ((messObj.fromID === auth.currentUser.uid || messObj.toID === auth.currentUser.uid)) {
          setMessList(prv => [...prv, messObj]);
        }
      })
    },[]);

  let [fontsLoaded] = useFonts({
    Poppins_900Black, Poppins_400Regular, Inter_400Regular
  });
  if (!fontsLoaded) {
      return null;
  };

    const threadPreview = (item) => {
      let providerName = providersData.filter(prov => prov.userID === item.toID);
      function addZero(i) {
        if (i < 10) {i = "0" + i}
        return i;
      };
      const date = new Date(item.dateStarted);
      const minutes = addZero(date.getMinutes());
      const houres = date.getHours();
      const timeSent = houres + ':' + minutes;
       
      const day = addZero(date.getDate());
      const month = addZero((date.getMonth()) + 1);
      const year = date.getFullYear();
      const dateSent = day + '.' + month + '.' + year;
  
      const threadLength = item.body.length - 1;
      return (
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', flex: 1, paddingVertical: 10, borderBottomColor: 'lightgrey', borderBottomWidth: 2 }}>
          {(item.toID === auth.currentUser.uid && item.body[item.body.length - 1].seen === false) ? <UnreadIcon /> : <ReadIcon />}
          <TouchableOpacity style={styles.pressableContainer} onPress={() => moveToChat(item) }>
            <View style={{ justifyContent: 'space-between', overflow: 'hidden' }}>
              <Text style={styles.nameTextStyle}>{providerName[0].userName}</Text>
              <Text style={styles.messTextStyle}>{item.body[item.body.length - 1].body}</Text>
            </View>
            <View style={{ justifyContent: 'space-between' }}>
              <Text style={styles.messTextStyle}>{dateSent}</Text>
              <Text style={styles.messTextStyle}>{timeSent}</Text>
            </View>
            
          </TouchableOpacity>
        </View>
      )
    };

    //go to messages with provider
    const moveToChat = (item) => {
      // console.log(item);
      dispatch(splitMessages(item.toID));
      navigation.navigate('Message');
    };
 
  return (
    <View style={[styles.container]}>
      <UserHeader heightVar={100} logoHeight={50} logoWidth={100} showBackIcon={true} showUserIcons={true} setMenu={setMenu} />
      <MenuScreen menuWindow={menuWindow} closeMenu={ () => setMenu(false) } />
      <View style={[styles.inerContainer ]}>
        <Text style={styles.headerText}>Your conversations</Text>
        <Text>You got {messList.length} conversations going</Text>
        <FlatList 
          data={messList}
          renderItem={({item}) => threadPreview(item)}
          keyExtractor={item => item.messageThreadID}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
      <Footer />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
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
  pressableContainer: {
    flexGrow: 1, 
    flexDirection: "row",
    justifyContent: 'space-between', 
    padding: 5, 
  },
  nameTextStyle: {
    fontFamily: 'Poppins_900Black',
    color: '#562349'
  },
  messTextStyle: {
    fontFamily: 'Poppins_400Regular',
    color: '#562349'
  },
  timeTextStyle: {
    fontFamily: 'Inter_400Regular',
    color: '#8C8C8C'
  }
});