import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { storage } from '../../../firebase';
import { ref, getBytes } from 'firebase/storage';

//firebase
import { auth } from '../../../firebase';

//redux 
import { useSelector } from 'react-redux';

export default function MessagesScreen() {
    const messageData = useSelector((state) => state.data.messagesData); 
    const providersData = useSelector((state) => state.data.providersData);
    const [messList, setMessList] = useState([]);

    useEffect(() => {
      messageData.forEach(messObj => {
        if ((messObj.fromID === auth.currentUser.uid || messObj.toID === auth.currentUser.uid)) {
          setMessList(prv => [...prv, messObj]);
          console.log(messObj);
        }
    })
    },[]);

    const threadPreview = (item) => {
      let providerName = providersData.filter(prov => prov.userID === item.toID);
      getBytes(ref(storage, providerName[0].profilePic))
      .then((snap) => {
        console.log(snap);
      })
      .catch((err) => {
        console.log(err);
      })
      return (
        <View style={{ flexDirection: 'row' }}>
          {/* <Image 
            source={require(gsReference)}
          /> */}
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>{providerName[0].userName}</Text>
              <Text>{item.body[0].timestamp}</Text>
            </View>
            <Text>{item.fromID === auth.currentUser.uid && 'You started this convo'}</Text>
          </View>
        </View>
      )
    };
 
  return (
    <View style={styles.container}>
      <View style={styles.inerContainer}>
        <Text style={styles.headerText}>Your conversations</Text>
        <Text>You got {messList.length} conversations going</Text>
        <FlatList 
          data={messList}
          renderItem={({item}) => threadPreview(item)}
          keyExtractor={item => item.id}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  inerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10
  },
  headerText: {
    fontFamily: 'Poppins_700bold',
    color: '#562349',
    fontSize: 16
  }
});