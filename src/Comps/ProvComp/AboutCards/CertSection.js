import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { ref, update, get, push, child, set, onValue } from 'firebase/database';
import { database } from '../../../../firebase';

import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';

//icons
import Nut from '../../../../assets/SVG/nutritionist';
import Lac from '../../../../assets/SVG/lac';
import Sleep from '../../../../assets/SVG/sleep';
import Doula from '../../../../assets/SVG/doula';
import Osteopathy from '../../../../assets/SVG/osteopathy';
import Acupuncture from '../../../../assets/SVG/acupuncture';
import PostDula from '../../../../assets/SVG/pDula';
import Reflo from '../../../../assets/SVG/reflo';
import Homoyo from '../../../../assets/SVG/homoyphaty';
import BabyDav from '../../../../assets/SVG/babydev';
import PregSupport from '../../../../assets/SVG/pregsupport'
import Presupport from '../../../../assets/SVG/presupport';

export default function CertSection({ data, showCert, setShowCert }) {
    const flatListRef = useRef();
    const [loading, setLoading] = useState(false);
    const [fieldDataLoading, setDataLoading] = useState(false);
    const [certFields, setCert] = useState({fields: '', from: '', year: '', key: ''});
    const [certArray, setCertArray] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [isFieldFormOpen, setFieldOpen] = useState({isOpen: false, inputType: ''});
    const [fromInput, setFromInput] = useState('');
    const [yearSelect, setYear] = useState('');

    const fieldsArray = [
        {logo: <Lac />, name: 'Lactation consultant', id: '11', visible: true}, 
        {logo: <BabyDav />, name: 'Baby development', id: '12', visible: true},
        {logo: <Nut />, name: 'Nutritionists', id: '13', visible: true}, 
        {logo: <Sleep />, name: 'Sleep consultant', id: '14', visible: true}, 
        {logo: <Doula />, name: 'Birth Doula', id: '15', visible: true}, 
        {logo: <Osteopathy />, name: 'Osteopathy', id: '16', visible: true}, 
        {logo: <Acupuncture />, name: 'Acupuncture', id: '17', visible: true}, 
        {logo: <PostDula />, name: 'Postpartum doula', id: '18', visible: true}, 
        {logo: <Reflo />, name: 'Reflexology', id: '19', visible: true}, 
        {logo: <Homoyo />, name: 'Homeopathy', id: '21', visible: true}, 
        {logo: <PregSupport />, name: 'Pregnancy support', id: '22', visible: true},
        {logo: <Presupport />, name: 'Personal development', id: '23', visible: true}
    ];

    useEffect(() => {
        getFieldsFromDB();
    },[]);

    let [fontsLoaded] = useFonts({
        Inter_400Regular,
    });

    // input field comp 
    const inputField = () => {
        return (
            <View style={styles.formContainer}>
                <Text style={{ fontFamily: 'Poppins_700bold', color: '#562349',fontSize: 14}}>Select field</Text>
                <FlatList 
                    data={fieldsArray}
                    keyExtractor={item => item.id}
                    renderItem={({item, index}) => <FormCard item={item} />}
                    listKey='FieldsArrayToShow'
                    style={{ width: '100%' }}
                    ref={flatListRef}
                />
            </View>
        )
    };
    const scrollToIndex = () => {
        flatListRef.scrollToIndex({ animated: true, index: 0.5 })
    };
    const FormCard = ({item}) => {
        return (
            <TouchableOpacity 
                style={styles.fieldSelectContainer} 
                onPress={() => handleFieldInputClick(item.name) }
            >
                <Text style={styles.formTextStyle}>{item.name}</Text>
                <View style={{ height: 20, width: 20 }}>{item.logo}</View>
            </TouchableOpacity>
        )
    };
    const handleFieldInputClick = (field) => {
        // const keyVal = push(ref((database), 'users/' + data.userID  + '/cernqual' )).key;
        setFieldOpen({isOpen: false, inputType: ''});
        setCert({fields: field, from: certFields.from , year: certFields.year })
    };

    // input from comp
    const inputFrom = () => {
        return (
            <View style={styles.inputFormContainer}>
                <TextInput 
                    placeholder='Add from'
                    placeholderTextColor={'#C4A7B5'}
                    value={fromInput}
                    onChangeText={ (text) => setFromInput(text) }
                    style={styles.inputformStyle}
                /> 
                <TextInput 
                    placeholder='Add year'
                    placeholderTextColor={'#C4A7B5'}
                    value={yearSelect}
                    onChangeText={ (text) => setYear(text) }
                    maxLength={4}
                    style={styles.inputformStyle}
                /> 
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 20 }}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={ () => saveInput() }>
                        <Text style={styles.buttonTextStyle}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.buttonStyle} 
                        onPress={ () => clearInputForm() }>
                        <Text style={styles.buttonTextStyle}>Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };
    const clearInputForm = () => {
        setFieldOpen({isOpen: false, inputType: ''}); 
        setCert({fields: certFields.fields, from: '' , year: ''});
        setYear('');
        setFromInput('');
    };
    const saveInput = () => {
        setCert({fields: certFields.fields, from: fromInput , year: yearSelect});
        setFieldOpen({isOpen: false, inputType: ''})
    };

    // add to db
    const handleSubmit = () => {
        setLoading((prv) => prv = true);
        if ( certFields.fields === '' || certFields.from === '' || certFields.year === '' ) return console.log('Fields must be filled');
        const keyVal = push(ref((database), 'users/providers/' + data.userID  + '/cernqual' )).key;
        set(ref((database), 'users/providers/' + data.userID  + '/cernqual/' + keyVal) , {
                fields: certFields.fields, 
                from: certFields.from, 
                year: certFields.year,
                id: keyVal
        })
        .then(() => {
            console.log('Saved');
            setCert({fields: '', from: '', year: ''});
            setYear('');
            setFromInput('');
        })
        .then(() => {
            getFieldsFromDB();
        })
        .then(() => {
            setLoading((prv) => prv = false);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    //get array of fields of provider from db
    const getFieldsFromDB = () => {
        let arr = [];
        setDataLoading(true);
        get(child(ref(database), 'users/providers/' + data.userID  + '/cernqual/')).then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((child) => {
                    const childData = child.val();
                    arr.push(childData)
                })
                setCertArray(arr);
                setTimeout( () => setDataLoading(false), 500) ;
            } else {
              console.log("No data available");
              setDataLoading(false);
            }
          }).catch((error) => {
            console.error(error);
            setDataLoading(false);
          });
    };

    const FieldDisplay = ({item}) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#562349', paddingVertical: 5 }}>{item.fields}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', backgroundColor: '#C4A7B5', width: 130, borderRadius: 17 }}>
                    <Text style={styles.fieldDisplayTextStyle}>{item.from}</Text>
                    <Text style={styles.fieldDisplayTextStyle}>{item.year}</Text>
                </View>
            </View>
        )
    };

  return (
    <View style={{ gap: 10 }}>
        { (isFieldFormOpen.isOpen && isFieldFormOpen.inputType === 'fields') && inputField() }
        { (isFieldFormOpen.isOpen && isFieldFormOpen.inputType === 'from') && inputFrom() }

        {showCert && <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
            <Text style={styles.certSectionText}>Field of care</Text>
            <Text style={styles.certSectionText}>From</Text>
            <Text style={styles.certSectionText}>Year</Text>
        </View>}
        {showCert && <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
            {/* adding field type */}
            <TouchableOpacity style={styles.certSectionField} onPress={() => setFieldOpen({ isOpen: true, inputType: 'fields'})}>
                <Text style={styles.certSectionFieldText}>{certFields.fields === '' ? 'Add field' : certFields.fields}</Text>
            </TouchableOpacity>
            {/* add cert place */}
            <TouchableOpacity style={styles.certSectionField}>
                <Text style={styles.certSectionFieldText} onPress={() => setFieldOpen({ isOpen: true, inputType: 'from'})}>{certFields.from === '' ? 'Add field' : certFields.from}</Text>
            </TouchableOpacity>
            {/* add year */}
            <TouchableOpacity style={styles.certSectionField}>
                <Text style={styles.certSectionFieldText}>{certFields.year === '' ? 'Add field' : certFields.year}</Text>
            </TouchableOpacity>
        </View>}
        {showCert && <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginVertical: 20 }}>
            {/* <TouchableOpacity style={styles.buttonStyle} onPress={() => setCertArray([...certArray, {fields: '', from: '', year: ''}]) }>
                <Text style={styles.buttonTextStyle}>+</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.buttonStyle} onPress={(certFields.from !== '' && certFields.fields !== '' && certFields.year !== '') ? () => handleSubmit() : () => setShowCert(false) }>
                <Text style={styles.buttonTextStyle}>
                    {loading ? <ActivityIndicator size='small' color='#562349' /> : (certFields.from && certFields.fields && certFields.year) ? 'Save' : 'Done'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={ () => setCert({fields: '', from: '', year: ''}) }>
                <Text style={styles.buttonTextStyle} >Clear</Text>
            </TouchableOpacity>
        </View>}

        { fieldDataLoading ? <ActivityIndicator size='large' color='#562349' /> : 
            <FlatList 
                data={certArray}
                renderItem={({item}) => < FieldDisplay item={item} />}
                keyExtractor={item => item.id}
                // extraData={}
                // listKey='ArrayID'
            /> 
        }
    </View>
  )
}

const styles = StyleSheet.create({
    buttonStyle: {
        height: 30,
        width: 90,
        borderColor: '#562349',
        borderWidth: 2,
        borderRadius: 5,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    buttonTextStyle: {
        fontFamily: 'Poppins_700bold', 
        color: '#562349', 
        fontSize: 14,
    },
    inputTextStyle: {
        fontFamily: 'Poppins_400Regular', 
        color: '#562349', 
        fontSize: 12,
        borderColor: '#562349',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    certSectionText: {
        flex: 1,
        fontFamily: 'Poppins_400Regular', 
        color: '#562349', 
        fontSize: 12,
        textDecorationLine: 'underline',
        textAlign: 'center'
    },
    certSectionField: {
        flex: 1,
        textAlign: 'center'
    },
    certSectionFieldText: {
        fontFamily: 'Poppins_400Regular', 
        color: '#562349', 
        fontSize: 12,
    },
    formContainer: {
        zIndex: 10,
        backgroundColor: '#FFFFFF',
        height: 170,
        width: '99%',
        position: 'absolute',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#562349',
        justifyContent: 'space-between',
        // padding: 20,
        alignItems: 'center',
        overflow: 'scroll'
    },
    inputFormContainer: {
        zIndex: 10,
        backgroundColor: '#FFFFFF',
        height: 170,
        width: '99%',
        position: 'absolute',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#562349',
        justifyContent: 'space-around',
        // padding: 20,
        alignItems: 'center',
        overflow: 'scroll'
    },
    formTextStyle: {
        fontFamily: 'Poppins_400Regular', 
        color: '#562349', 
        fontSize: 14,
        lineHeight: 20,
        textTransform: 'capitalize'
    },
    fieldSelectContainer: {
        // width: '100%',
        height: 50,
        paddingHorizontal: 20,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-around', 
        // margin: 20, 
        // paddingHorizontal: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    inputformStyle: {
        width: '80%',
        fontFamily: 'Poppins_400Regular',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderColor: '#562349',
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 10,
        height: 30,
        color: '#562349',
        fontSize: 14,
    },
    fieldDisplayTextStyle: {
        color: '#FFFFFF', 
        fontFamily: 'Inter_400Regular', 
        fontSize: 14, 
        paddingVertical: 5
    }
});