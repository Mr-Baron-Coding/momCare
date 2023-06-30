import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import UserHeader from '../../Comps/CustomersComp/UserHeader';
import MessagesScreen from './MessagesScreen';
import LikedScreen from './LikedScreen';
import MenuScreen from '../../Comps/Menu';
import { auth } from '../../../firebase';
import { push, ref, child, update, onChildAdded } from 'firebase/database';
import { database } from '../../../firebase';

//redux 
import { useSelector, useDispatch } from 'react-redux';
import { saveMessageData, startMessNAddToMessData, addMessageData, spliceMessages, sendMessage } from '../../Redux/features/dataSlice';

//icons
import { MaterialCommunityIcons } from '@expo/vector-icons'; //sent
import Send from '../../../assets/SVG/UserIcons/Send';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

//fonts
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Poppins_900Black, Poppins_400Regular } from '@expo-google-fonts/poppins';
SplashScreen.preventAutoHideAsync();

export default function Message() {
    const dispatch = useDispatch();
    const flatListRef = React.useRef(null);
    
    const currentMessages = useSelector((state) => state.data.selectedProvidersMessages);
    const loggedUser = useSelector((state) => state.data.userData);
    const selectedProvider = useSelector((state) => state.data.selectedProvider);
    const [menuWindow, setMenu] = useState(false);
    const [message, setMessage] = useState('');
    const [shownComp, setShownComp] = useState(0);  

    const [isLoading, setIsLoading] = useState(false);
    const [tempObject, setTempObject] = useState({});

    const visibleItemCount = 20; // Number of initially visible items
    const [bottomElements, setBottomElements] = useState([]); //number of messages will be rendered by flatlist
    const [lastElmentRendered, setLastElementRendered] = useState(0);      

    //load the last messages, scroll to bottom
    useEffect(() => {
        lastElmentRendered === 0 && setIsLoading(prv => prv = true);
        lastElmentRendered === 0 && setLastElementRendered(prv => prv = 20);
        console.log(lastElmentRendered);
        const initialBottomElements = currentMessages.body.slice(-visibleItemCount).reverse();
        setBottomElements(initialBottomElements);
        // Scroll to the end of the list once it is rendered
        flatListRef.current.scrollToEnd({ animated: true });
        setIsLoading(prv => prv = false);
    }, [currentMessages]);

    // add more messages to render
    const loadMoreItems = () => {
        console.log(lastElmentRendered);
        const threadLength = currentMessages.body.length;
        const howManyToRender = lastElmentRendered+20; 
        const remainingItems = currentMessages.body.slice(-(howManyToRender)).reverse();
        setLastElementRendered(lastElmentRendered + visibleItemCount);
        setBottomElements(prv => prv = remainingItems);
    };

    // listning for new messages
    useEffect(() => {
        onChildAdded(ref(database, 'users/messages/' +  currentMessages.messageThreadID), (snapshot) => {
            const data = snapshot.val();
            let ob = {};
            snapshot.forEach(item => {
                ob[item.key] = item.val();
            })
            setTempObject(prev =>  prev = ob);
        });
        return(() => {
            console.log('left message');
            dispatch(spliceMessages());
        })
    }, []);

    //add the new message
    useEffect(() => {
        if (tempObject.body !== undefined && tempObject.body.length > 0 && tempObject.sender !== auth.currentUser.uid ) {
            tempObject.delivered = true;
            tempObject.seen = true;
            console.log(tempObject);
            //send to open thread
            dispatch(addMessageData(tempObject));

            update(ref(database, 'users/messages/' +  currentMessages.messageThreadID + '/' + tempObject.bodyID), {
                seen: true,
                delivered: true
            })
            .then(() => {
                console.log('Delivered');
            })
            .catch((err)=>{
                console.log(err + 'not delivered');
            })
        }
        
    },[tempObject]);

    //start new convo
    const startConvo = () => {
        console.log('started');
        if ( message.length === 0 ) { return }
        const messageKey = push(child(ref(database), 'messages/')).key;
        const bodyKey = push(child(ref(database), 'messages/' + messageKey)).key;
        dispatch(startMessNAddToMessData(
            {
                messageThreadID: messageKey,
                body: [{body: message, timestamp: new Date().getTime(), bodyID: bodyKey, sender: auth.currentUser.uid, delivered: true, seen: false }], 
                from: auth.currentUser.uid, 
                to: selectedProvider.userID, 
                dateAdded: new Date().getTime(),
                sendersName: loggedUser.username,
                providersName: selectedProvider.userName
            }
        )) 
        //add convo to database
        update(ref(database, 'users/messages/' + messageKey), {
            messageThreadID: messageKey,
            fromID: auth.currentUser.uid,
            toID: selectedProvider.userID,
            timestamp: new Date().getTime(),
            sendersName: loggedUser.userName,
            providersName: selectedProvider.userName
        })
        //add message body with time to mess thread
        update(ref(database, 'users/messages/' + messageKey + '/' + bodyKey), {
            body: message,
            sender: auth.currentUser.uid,
            bodyID: bodyKey,
            timestamp: new Date().getTime(),
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
        const bodyKey = push(child(ref(database), 'messages/' + currentMessages.messageThreadID)).key;
        dispatch(addMessageData(
                {body: message, timestamp: new Date().getTime(), bodyID: bodyKey, senderName: currentMessages.sendersName, sender: auth.currentUser.uid, delivered: true, seen: false} 
        ));
        update(ref(database, 'users/messages/' + currentMessages.messageThreadID + '/' + bodyKey), {
            body: message,
            bodyID: bodyKey,
            sender: auth.currentUser.uid,
            senderName: currentMessages.sendersName,
            timestamp: new Date().getTime(),
            delivered: true,
            seen: false
        })
        .catch((err) => {
            console.log(err);
        })
        setMessage('');
    };

    const MessCard = ({ item }) => {
        function addZero(i) {
            if (i < 10) {i = "0" + i}
            return i;
          }
        const date = new Date(item.timestamp);
        const minutes = addZero(date.getMinutes());
        const houres = date.getHours();
        const timeSent = houres + ':' + minutes;
        const findSpace = (i) => {
            
            if ( i !== undefined) {
                let y = i.slice(0,1);
                return y
            } else {
                return ''
            }
            
        } 
        const name = findSpace(item.senderName);
        return (
            <View style={[item.sender === auth.currentUser.uid ? styles.flipMessContainer : styles.messCardContainer]}>
                <View style={styles.footerBox}>
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userTextStyle}>{name}</Text>
                    </View>
                    {!item.seen ? !item.delivered 
                        ? <AntDesign name="check" size={18} color="#FFA29950" /> 
                        : <Ionicons name="checkmark-done-outline" size={18} color="#FFA29950" />
                    : <Ionicons name="checkmark-done-outline" size={18} color="#562349" />
                    }
                </View>
                <View style={styles.messBox}>
                    <Text style={styles.messTextStyle}>{item.body}</Text>
                    <Text style={[styles.subTextStyle, { textAlign: 'right' }]}>{timeSent}</Text>
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
                {Object.keys(currentMessages).length !== 0 ? 
                <FlatList 
                    data={bottomElements}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <MessCard item={item}/>}
                    style={{ width: '100%' }}
                    contentContainerStyle={{ gap: 5, justifyContent: 'flex-end' }}
                    inverted={true}
                    initialNumToRender={visibleItemCount}
                    maxToRenderPerBatch={visibleItemCount}
                    onEndReached={loadMoreItems}
                    onEndReachedThreshold={0.5}
                    ref={flatListRef}
                /> : <Text>Nothing here</Text>}
                <View style={styles.inputBox}>
                    <TextInput 
                        value={message}
                        onChangeText={ (text) => setMessage(text) }
                        style={styles.placeHolder}
                        multiline={true}
                    />
                    <TouchableOpacity onPress={ Object.keys(currentMessages).length === 0 ? () => startConvo() : () => sendMessage() }>
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
    // messages styling
    messCardContainer: {
        flexDirection: 'row',
        gap: 10
    },
    flipMessContainer: {
        flexDirection: 'row-reverse',
        gap: 10
    },
    footerBox: {
        width: 25,
        justifyContent: 'space-between'
    },
    userNameContainer: {
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#562349',
        borderRadius: 10,
    },
    userTextStyle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 10,
        color: 'white'
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