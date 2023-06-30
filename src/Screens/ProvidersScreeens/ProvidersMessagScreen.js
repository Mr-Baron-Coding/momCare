import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import ProviderHeader from '../../Comps/ProvComp/ProviderHeader';
import Menu from '../../Comps/Menu';

//firebase
import { auth } from '../../../firebase';
import { database } from '../../../firebase';
import { update, ref, push, child, onValue, set, onChildAdded } from 'firebase/database';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, updateProvidersMessages } from '../../Redux/features/providerDataSlice';

//icons
import Send from '../../../assets/SVG/UserIcons/Send';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

//fonts
import { useFonts, Poppins_900Black, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function ProvidersMessagScreen() {
    const flatListRef = React.useRef(null);
    const dispatch = useDispatch();
    const messFlow = useSelector((state) => state.providerData.selectedMessThread);
    const [menuWindow, setMenu] = useState(false);
    const [message, setMessage] = useState(''); // typed message
    const [isLoading, setIsLoading] = useState(false);
    const [tempObject, setTempObject] = useState({});

    const visibleItemCount = 20; // Number of initially visible items
    const [bottomElements, setBottomElements] = useState([]); //number of messages will be rendered by flatlist
    const [lastElmentRendered, setLastElementRendered] = useState(0);   

    //load the last messages, scroll to bottom
    useEffect(() => {
        lastElmentRendered === 0 && setIsLoading(prv => prv = true);
        setLastElementRendered(prv => prv = 20);
        const initialBottomElements = messFlow.body.slice(-visibleItemCount).reverse();
        setBottomElements(initialBottomElements);
        // Scroll to the end of the list once it is rendered
        flatListRef.current.scrollToEnd({ animated: true });
        setIsLoading(prv => prv = false);
    }, [messFlow]);
        
    // add more messages to render
    const loadMoreItems = () => {
        const remainingItems = messFlow.body.slice(-(messFlow.body.length+lastElmentRendered)).reverse();
        console.log(lastElmentRendered);
        setLastElementRendered(lastElmentRendered + visibleItemCount);
        setBottomElements(remainingItems);
    };

    // listning for new messages
    useEffect(() => {
        onChildAdded(ref(database, 'users/messages/' +  messFlow.messageThreadID), (snapshot) => {
            const data = snapshot.val();
            let ob = {};
            snapshot.forEach(item => {
                ob[item.key] = item.val();
            })
            setTempObject(prev =>  prev = ob);
            // console.log(snapshot.val());
        });
        return(() => {
            console.log('exited');
               // //update main messages
            dispatch(updateProvidersMessages());
        })
    }, []);

    //add the new message
    useEffect(() => {
        console.log(tempObject.delivered);
        if (tempObject.body !== undefined && tempObject.body.length > 0 && tempObject.sender !== auth.currentUser.uid ) {
            tempObject.delivered = true;
            tempObject.seen = true;
            console.log(tempObject);
            //send to open thread
            dispatch(sendMessage(tempObject));

            update(ref(database, 'users/messages/' +  messFlow.messageThreadID + '/' + tempObject.bodyID), {
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

    const addMessage = () => {
        const bodyKey = push(child(ref(database), 'messages/' + messFlow.messageThreadID)).key;
        dispatch(sendMessage(
                {body: message, timestamp: new Date().getTime(), bodyID: bodyKey, sender: auth.currentUser.uid, senderName: messFlow.providersName, delivered: true, seen: false}
        ));
        update(ref(database, 'users/messages/' + messFlow.messageThreadID + '/' + bodyKey), {
            body: message,
            bodyID: bodyKey,
            sender: auth.currentUser.uid,
            senderName: messFlow.providersName,
            timestamp: new Date().getTime(),
            delivered: true,
            seen: false
        })
        .then(() => {
            console.log('Sent');

        })
        .catch((err) => {
            console.log(err);
        })
        setMessage('');
    };

    const messCard = ({ item }) => {
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
    <View style={{ backgroundColor: '#F1F1F1', flex: 1 }}>
      <Menu menuWindow={menuWindow} closeMenu={ () => setMenu(false) } />
      <ProviderHeader showBackIcon={true} messActive={true} setMenu={setMenu} />
      {isLoading ? <ActivityIndicator size='large' /> : <View style={{ paddingHorizontal: 20, paddingVertical: 10, flex: 1, overflow: 'scroll', justifyContent: 'space-between' }}>
        <FlatList 
            data={bottomElements}
            inverted={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={messCard}
            contentContainerStyle={{ gap: 5, justifyContent: 'flex-end' }}
            initialNumToRender={visibleItemCount}
            maxToRenderPerBatch={visibleItemCount}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.5}
            ref={flatListRef}
        />
        <View style={styles.inputBox}>
            <TextInput 
                value={message}
                onChangeText={ (text) => setMessage(text) }
                style={styles.placeHolder}
                multiline={true}
            />
            <TouchableOpacity onPress={ () => addMessage() }>
                <Send />
            </TouchableOpacity>
        </View>
      </View>}
    </View>
  )
};

const styles = StyleSheet.create({
    inputBox: {
        paddingBottom: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'none'
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
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    messBox: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        // flex: 1,
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
    subTextStyle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 10,
        color: '#1F1F1F'
    }
});