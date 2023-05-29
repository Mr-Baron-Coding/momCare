import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

import Header from '../../Comps/Header';
import UserHeader from '../../Comps/CustomersComp/UserHeader';
import MessagesScreen from './MessagesScreen';
import LikedScreen from './LikedScreen';
import MenuScreen from '../../Comps/Menu';

//icons
import Send from '../../../assets/SVG/UserIcons/Send';

export default function Message({ route }) {
    const [menuWindow, setMenu] = useState(false);
    const [message, setMessage] = useState('');
    const [messageFlow, setFlow] = useState([]);
    const [shownComp, setShownComp] = useState(0);  

    useEffect(() => {
        console.log(route.params.item);
    },[])

    const sendMessage = () => {
        if ( message.length === 0 ) { return }
        setFlow([...messageFlow, {id: messageFlow.length+1, body: message, timestamp: new Date().getHours() + ':' + new Date().getMinutes(), dateAdded: new Date().getFullYear() + ':' + new Date().getHours() + ':' + new Date().getMinutes() }]);
        setMessage('');

    };
    
    const MessageStyling = ({ item }) => {
        return(
            <View style={{ borderWidth: 1, borderColor: '#562349', borderRadius: 10, backgroundColor: '#FFA299' }}>
                <Text>{item.body}</Text>
                <Text>{item.timestamp}</Text>
            </View>
        )
    };

  return (
    <View style={{flex: 1, position: 'relative' }}>
        <UserHeader heightVar={100} logoHeight={50} logoWidth={100} showBackIcon={true} showUserIcons={true} setMenu={setMenu} setShownComp={(x) => setShownComp(x)} messActive={true} provName={route.params.item.userName} />
        <MenuScreen menuWindow={menuWindow} closeMenu={ () => setMenu(false) } />
        {shownComp === 0 && <View style={styles.container}>
            <View style={{ right: 20 }}>
                <FlatList 
                    data={messageFlow}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <MessageStyling item={item} />}
                />
            </View>
            <View style={styles.inputBox}>
                <TextInput 
                    value={message}
                    onChangeText={ (text) => setMessage(text) }
                    style={styles.placeHolder}
                    multiline={true}
                />
                {/* <Text>Send</Text> */}
                <TouchableOpacity onPress={ () => sendMessage() }>
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
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        width: '90%',
        bottom: 20,
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
});