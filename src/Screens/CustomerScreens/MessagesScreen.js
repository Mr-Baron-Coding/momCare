import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

//firebase
import { auth } from '../../../firebase';

//redux 
import { useSelector } from 'react-redux';

export default function MessagesScreen() {
    const messageData = useSelector((state) => state.data.messagesData); 
    const [menuWindow, setMenu] = useState(false);
    const [messList, setMessList] = useState([]);

    useEffect(() => {
      messageData.forEach(messObj => {
        if ((messObj.fromID === auth.currentUser.uid || messObj.toID === auth.currentUser.uid)) {
          setMessList(...messList, messObj);
          console.log(messObj);
          console.log(messObj.length);
          // setMessCount(messObj.body.length-1);
        }
    })
    },[])
 
  return (
    <View>
      <Text>MessagesScreen</Text>
    </View>
  )
};

const styles = StyleSheet.create({});