import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import UserHeader from '../../Comps/CustomersComp/UserHeader';
import MessagesScreen from './MessagesScreen';
import LikedScreen from './LikedScreen';
import MenuScreen from '../../Comps/Menu';
import { auth } from '../../../firebase';
import { push, ref, child, set, update } from 'firebase/database';
import { database } from '../../../firebase';

//redux 
import { useSelector, useDispatch } from 'react-redux';
import { saveMessageData, startMessNAddToMessData, addMessageData } from '../../Redux/features/dataSlice';

//icons
import { MaterialCommunityIcons } from '@expo/vector-icons'; //sent
import Send from '../../../assets/SVG/UserIcons/Send';

export default function Message({ route }) {
    const dispatch = useDispatch();
    const flatList = useRef();
    
    const messageData = useSelector((state) => state.data.messagesData);
    const loggedUser = useSelector((state) => state.data.userData);
    const selectedProvider = useSelector((state) => state.data.selectedProvider);
    const [menuWindow, setMenu] = useState(false);
    const [message, setMessage] = useState('');
    const [messageFlow, setFlow] = useState({});
    const [shownComp, setShownComp] = useState(0);  
    const [messCount, setMessCount] = useState(0);

    useEffect(() => {
        messageData.forEach(messObj => {
            if ((messObj.fromID === auth.currentUser.uid || messObj.toID === auth.currentUser.uid) && (messObj.fromID === selectedProvider.userID || messObj.toID === selectedProvider.userID)) {
                setFlow(messObj);
                setMessCount(messObj.body.length-1);
                console.log(messObj);
            }
        })
    },[]);

    const getMessCount = async () => {
        return (
            length = await messageFlow.body.length

        )
    };

    useEffect(() => {
        console.log(messageFlow);
        
    },[messageFlow])

    //start new convo
    const startConvo = () => {
        console.log('started');
        if ( message.length === 0 ) { return }
        const messageKey = push(child(ref(database), 'messages/')).key;
        const bodyKey = push(child(ref(database), 'messages/' + messageKey)).key;
        setFlow(
            { 
                messageThreadID: messageKey,
                body: [{body: message, timeSent: new Date().getHours() + ':' + new Date().getMinutes(), bodyID: bodyKey, sender: auth.currentUser.uid, delivered: false, seen: false }], 
                from: auth.currentUser.uid, 
                to: selectedProvider.userID, 
                dateAdded: new Date().getTime()  
            }
        );
        dispatch(startMessNAddToMessData(
            {
                messageThreadID: messageKey,
                body: [{body: message, timeSent: new Date().getHours() + ':' + new Date().getMinutes(), bodyID: bodyKey, sender: auth.currentUser.uid, delivered: false, seen: false }], 
                from: auth.currentUser.uid, 
                to: selectedProvider.userID, 
                dateAdded: new Date().getTime() 
            }
        )) 
        //add convo to database
        update(ref(database, 'users/messages/' + messageKey), {
            messageThreadID: messageKey,
            fromID: auth.currentUser.uid,
            toID: selectedProvider.userID,
            dateStarted: new Date().getTime()
        })
        //add message body with time to mess thread
        update(ref(database, 'users/messages/' + messageKey + '/' + bodyKey), {
            body: message,
            sender: auth.currentUser.uid,
            bodyID: bodyKey,
            timestamp: new Date().getHours() + ':' + new Date().getMinutes(),
            delivered: false,
            seen: false
        })
        //add convo key to customer
        update(ref(database, 'users/customers/' + auth.currentUser.uid + '/messages/' + messageKey), {
            messageID: messageKey
        })
        //addd convo key to provider
        update(ref(database, 'users/providers/' + selectedProvider.userID + '/messages/' + messageKey), {
            messageID: messageKey
        })
        .catch((err) => {
            console.log(err);
        })
        setMessage('');
    };

    // continue convo
    const sendMessage = () => {
        console.log('added');
        const bodyKey = push(child(ref(database), 'messages/' + messageFlow.messageThreadID)).key;
        setFlow( 
            { 
                ...messageFlow,
                body: [...messageFlow.body, {body: message, timeSent: new Date().getHours() + ':' + new Date().getMinutes(), bodyID: bodyKey, sender: auth.currentUser.uid, delivered: false, seen: false}], 
            }
        );
        dispatch(addMessageData(
                {key: messageFlow.messageThreadID, body: [...messageFlow.body, {body: message, timeSent: new Date().getHours() + ':' + new Date().getMinutes(), bodyID: bodyKey, sender: auth.currentUser.uid, delivered: false, seen: false}]} 
        ));
        update(ref(database, 'users/messages/' + messageFlow.messageThreadID + '/' + bodyKey), {
            body: message,
            bodyID: bodyKey,
            sender: auth.currentUser.uid,
            timestamp: new Date().getHours() + ':' + new Date().getMinutes(),
            delivered: true,
            seen: false
        })
        .catch((err) => {
            console.log(err);
        })
        setMessage('');
    };

    const MessCard = ({ item }) => {
        return (
            <View style={styles.messCardContainer}>
                <View style={styles.footerBox}>
                    <Text style={styles.subTextStyle}>{loggedUser.userName}</Text>
                    <Text>
                        {!item.read ? !item.delivered 
                            ? <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" /> 
                            : <MaterialCommunityIcons name="checkbox-multiple-blank-outline" size={24} color="black" />
                        : <MaterialCommunityIcons name="checkbox-multiple-marked" size={24} color="black" />
                        }
                    </Text>
                                        

                </View>
                <View style={styles.messBox}>
                    <Text style={styles.messTextStyle}>{item.body}</Text>
                    <Text style={[styles.subTextStyle, { textAlign: 'right' }]}>{item.timestamp}</Text>
                </View>
            </View>
        )
    };

  return (
    <View style={{flex: 1, position: 'relative' }}>
        <UserHeader heightVar={100} logoHeight={50} logoWidth={100} showBackIcon={true} showUserIcons={true} setMenu={setMenu} setShownComp={(x) => setShownComp(x)} messActive={true} provName={selectedProvider.userName} />
        <MenuScreen menuWindow={menuWindow} closeMenu={ () => setMenu(false) } />
        {shownComp === 0 && 
            <View style={styles.container}>
                {!messageFlow ? <ActivityIndicator size='large' color='#562349' /> :
                <FlatList 
                    data={messageFlow.body}
                    // getItemCount={(data, index) => data.length}
                    keyExtractor={item => item.bodyID}
                    renderItem={({item}) => <MessCard item={item}/>}
                    style={{ width: '100%' }}
                    contentContainerStyle={{ gap: 5, marginBottom: 5 }}
                />}
                <View style={styles.inputBox}>
                    <TextInput 
                        value={message}
                        onChangeText={ (text) => setMessage(text) }
                        style={styles.placeHolder}
                        multiline={true}
                    />
                    <TouchableOpacity onPress={ messageFlow.messageThreadID === undefined ? () => startConvo() : () => sendMessage() }>
                        <Send />
                    </TouchableOpacity>
                </View>
            </View>}
        {shownComp === 1 && <MessagesScreen />}
        {shownComp === 2 && <LikedScreen />}
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },
    inputBox: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    placeHolder: {
        width: '90%',
        backgroundColor: 'white',
        fontFamily: 'Quicksand',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#C4A7B5',
        borderWidth: 2,
        borderRadius: 20,
        height: 'content',
        color: '#562349',
        fontSize: 14,
        textAlignVertical: 'center'
    },
    messCardContainer: {
        flexDirection: 'row',
        gap: 10
    },
    footerBox: {
        width: 25
    },
    messBox: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1, 
        borderColor: '#562349', 
        borderRadius: 10, 
        backgroundColor: '#FFA29950'
    },
    messTextStyle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#562349'
    },
    subTextStyle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 10,
        color: '#1F1F1F'
    }
});