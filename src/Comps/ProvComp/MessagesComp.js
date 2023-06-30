import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

//firebase
import { auth } from '../../../firebase';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { saveSelectedMessThread } from '../../Redux/features/providerDataSlice';

//icons
import ReadIcon from '../../../assets/SVG/Messages/ReadIcon';
import UnreadIcon from '../../../assets/SVG/Messages/UnreadIcon';

//fonts
import { useFonts, Poppins_900Black, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function MessagesComp() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const usersMessListID = useSelector((state) => state.providerData.loggedProvider.messages);
  const usersMessList = useSelector((state) => state.providerData.messagesForProvider);

  let [fontsLoaded] = useFonts({
    Poppins_900Black, Poppins_400Regular
  });
  if (!fontsLoaded) {
      return null;
  };

  const moveToDM = (item) => {
    console.log(item);
    dispatch(saveSelectedMessThread(item));
    navigation.navigate('ProvidersMessagScreen');
  }

  const MessCard = ({item}) => {
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
        {(item.toID === auth.currentUser.uid && item.body[threadLength].seen === false) ? <UnreadIcon /> : <ReadIcon />}
        <TouchableOpacity style={styles.pressableContainer} onPress={() => moveToDM(item) }>
          <View style={{ justifyContent: 'space-between', overflow: 'hidden' }}>
            <Text style={styles.nameTextStyle}>{item.sendersName}</Text>
            <Text style={styles.timeTextStyle}>{item.body[threadLength].body}</Text>
          </View>
          <View style={{ justifyContent: 'space-between' }}>
            <Text style={styles.messTextStyle}>{dateSent}</Text>
            <Text style={styles.messTextStyle}>{timeSent}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      {usersMessListID.length === 0 && 
      <View>
        <Text style={styles.headerContainer}>Your conversations will be shown here</Text>
        <Text style={styles.subHeaderText}>No messages yet</Text>
      </View>}
      {usersMessListID.length !== 0 && 
      <View>
        <FlatList 
          data={usersMessList}
          keyExtractor={item => item.messageID}
          renderItem={({item}) => <MessCard item={item} />}
        />
      </View>}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20, 
    paddingTop: 10,
    backgroundColor: '#FFFFFF', 
    flex: 1
  },
  headerContainer: {
    fontFamily: 'Poppins_700bold', 
    color: '#562349', 
    fontSize: 16
  },
  subHeaderText: {
    fontFamily: 'Quicksand', 
    color: '#562349', 
    fontSize: 14 
  },
  pressableContainer: {
    flexDirection: 'row',
    flexGrow: 1, 
    justifyContent: 'space-between', 
    padding: 5, 
    overflow: 'hidden'
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