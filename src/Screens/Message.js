import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';

import Header from '../Comps/Header';

//icons
import Send from '../../assets/SVG/UserIcons/Send';

export default function Message({ route }) {
    const [message, setMessage] = useState('');
    const [messageFlow, setFlow] = useState([]);

    const sendMessage = () => {
        if ( message.length === 0 ) { return }
        setFlow([...messageFlow, {id: messageFlow.length+1, body: message, timestamp: new Date().getHours() + ':' + new Date().getMinutes()}]);
        setMessage('');

    };
  return (
    <View style={{flex: 1, position: 'relative' }}>
        <View style={{ height: 100 }}>
            <Header showSearch={false} showProfile={false} messHeader={true} route={route} heightVar={20} heightProp={100} />
        </View>
        <View style={styles.container}>
            {/* <View>
                <Text>{messageFlow.body}</Text>
            </View> */}
            <FlatList 
                data={messageFlow}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Text>{item.body}{item.timestamp}</Text>}
            />
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
        </View>
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