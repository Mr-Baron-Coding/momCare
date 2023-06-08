import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { ref, update, get, push, child, set, remove } from 'firebase/database';
import { auth, database } from '../../../../firebase';
import { Picker } from '@react-native-picker/picker';

import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';

//redux
import { useDispatch, useSelector } from 'react-redux';

import { AntDesign } from '@expo/vector-icons';    
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
import { deleteloggedProviderCerFields, editLoggedProviderCerField, saveLoggedProviderCerFields } from '../../../Redux/features/providerDataSlice';

export default function CertSection({ showCert, setShowCert }) {
    const pickerRef = useRef();
    const dispatch = useDispatch();
    const reduxLoggedData = useSelector((state) => state.providerData.loggedProvider)
    const [loading, setLoading] = useState(false);
    const [fieldDataLoading, setDataLoading] = useState(false);
    const [certFields, setCert] = useState({fields: '', from: '', year: '', id: ''});
    const [certArray, setCertArray] = useState([]);
    const [editable, setEditable] = useState(false); 

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
        setCertArray(reduxLoggedData.cernqual);
        setCert({...certFields, year: '2010'});
        if ( reduxLoggedData.cernqual.length > 0 ) {
            setShowCert(false);
        }
    },[]);

    
    let [fontsLoaded] = useFonts({
        Inter_400Regular,
    });

    // field select comp 
    const inputField = () => {
        return (
            <Picker
                ref={pickerRef}
                selectedValue={certFields.fields}
                prompt='Field of care'
                onValueChange={(itemValue, itemIndex) => setCert({...certFields, fields: itemValue})}
                style={styles.fieldContainer}
            >
                {fieldsArray.map((field, index) => {
                    const arr = certArray.filter(item => item.fields === field.name);
                    return(
                        arr.length !== 1 && <Picker.Item key={field + index} label={field.name} value={field.name} color={index%2 === 0 ? '#562349' : '#FFA299'} />
                    )
                })}
            </Picker>
        )
    };
    // year select comp
    const yearPicker = () => {
        let arr = [];
        for (let index = 1970; index <= new Date().getFullYear(); index++) {
            arr.push(index);    
        }
        return (
            <Picker
                ref={pickerRef}
                onValueChange={(itemValue, itemIndex) => setCert({...certFields, year: itemValue})}
                style={styles.fieldContainer}
                selectedValue={certFields.year}
            >
                {arr.map((item, index) => {
                    return <Picker.Item key={item} label={item} value={item} color={index%2 === 0 ? '#562349' : '#FFA299'} />
                })}
            </Picker>
        )
    };  

    // add to db
    const handleSubmit = () => {
        setLoading(true);
        if ( certFields.fields === '' || certFields.from === '' || certFields.year === '' ) return console.log('Fields must be filled');
        const keyVal = push(ref((database), 'users/providers/' + auth.currentUser.uid  + '/cernqual' )).key;
        set(ref((database), 'users/providers/' + auth.currentUser.uid  + '/cernqual/' + keyVal) , {
                fields: certFields.fields, 
                from: certFields.from, 
                year: certFields.year,
                id: keyVal
        })
        .then(() => {
            console.log('Saved');
            dispatch(saveLoggedProviderCerFields(certFields));
            setCert({fields: '', from: '', year: '2010', id: '' });
        })
        .then(() => {
            getFieldsFromDB();
        })
        .then(() => {
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    };

    //get array of fields of provider from db
    const getFieldsFromDB = () => {
        setDataLoading(true);
        get(child(ref(database), 'users/providers/' + auth.currentUser.uid  + '/cernqual/'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                let arr = [];
                snapshot.forEach(cer => {
                    console.log(cer.val());
                    let cerOb = {};
                    cerItem.forEach(cerItem => {
                        cerOb[cerItem.key] = cerItem.val();
                    })
                    arr.push(cerOb);
                })
                console.log(arr);
                setCertArray(arr);
                setDataLoading(false);
            } 
            else {
              console.log("No data available");
              setDataLoading(false);
            }
        }).catch((error) => {
        console.error(error);
        setDataLoading(false);
        });
    };

    //display saved fields
    const FieldDisplay = ({item}) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={() => editField(item) }>
                {showCert && 
                    <TouchableOpacity style={{ width: 20 }} onPress={ () => deleteField(item) }>
                        <AntDesign name="delete" size={14} color="#562349"/>
                    </TouchableOpacity>}
                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#562349', paddingVertical: 5 }}>{item.fields}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', backgroundColor: '#C4A7B5', width: 130, borderRadius: 17 }}>
                    <Text style={styles.fieldDisplayTextStyle}>{item.from}</Text>
                    <Text style={styles.fieldDisplayTextStyle}>{item.year}</Text>
                </View>
            </TouchableOpacity>       
        )
    };

    //edit field starting func
    const editField = (field) => {
        setShowCert(true);
        setEditable(true);
        setCert({fields: field.fields, from: field.from, year: field.year, id: field.id});
        let ob = reduxLoggedData.cernqual.filter(item => item.id !== field.id);
        setCertArray(ob);
    };
    //edit fields
    const handleEdit = () => {
        let tempArr = certArray.filter(item => item.id !== certFields.id);
        tempArr.unshift(certFields);
        setCertArray(tempArr);
        setCert({fields: '', from: '', year: '2010', id: ''});
        dispatch(editLoggedProviderCerField(tempArr));
        update(ref(database, 'users/providers/' + auth.currentUser.uid + '/cernqual/' + certFields.id ), {
            fields: certFields.fields,
            from: certFields.from,
            year: certFields.year,
            id: certFields.id
        })
        getFieldsFromDB();
        setShowCert(false);
        setEditable(false);
    };
    const handleCancel = () => {
        setCertArray(reduxLoggedData.cernqual);
        setShowCert(false);
        setEditable(false);
    };
    //delete field
    const deleteField = (field) => {
        const newCertArr = certArray.filter(item => item.fields !== field.fields);
        remove(ref(database, 'users/providers/' + auth.currentUser.uid  + '/cernqual/' + field.id))
        .then(() => {
            console.log('removed');
            setCertArray(newCertArr);
            getFieldsFromDB();
            dispatch(deleteloggedProviderCerFields(newCertArr));
        }) 
        .catch((err) => {
            console.log(err + 'unsuccessful');
        })
    };

  return (
    <View style={{ gap: 10 }}>
        {showCert && 
        <View style={{ gap: 15 }}>
            <View style={{ gap: 5 }}>
                <Text style={styles.certSectionText}>Select field of care</Text>
                {inputField()}
            </View>
            <View style={{ gap: 5 }}>
                <Text style={styles.certSectionText}>Certified from</Text>
                <TextInput
                    style={styles.cerFromInput}
                    placeholder='Certified from'
                    value={certFields.from}
                    onChangeText={text => setCert({...certFields, from: text})}
                />
            </View>
            <View style={{ gap: 5 }}>
                <Text style={styles.certSectionText}>Year of certification</Text>
                {yearPicker()}
            </View>
        </View>}
        {(showCert && !editable)&& 
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginVertical: 20 }}>
                <TouchableOpacity style={styles.buttonStyle} onPress={(certFields.from !== '' && certFields.fields !== '' && certFields.year !== '') ? () => handleSubmit() : () => setShowCert(false) }>
                    <Text style={styles.buttonTextStyle}>
                        {loading ? <ActivityIndicator size='small' color='#562349' /> : (certFields.from && certFields.fields && certFields.year) ? 'Save' : 'Cancel'}
                    </Text>
                </TouchableOpacity>
            </View>}
        {(showCert && editable)&& 
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginVertical: 20 }}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => handleEdit()}>
                    <Text style={styles.buttonTextStyle}>
                        {loading ? <ActivityIndicator size='small' color='#562349' /> :  'Save'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={ () => handleCancel() }>
                    <Text style={styles.buttonTextStyle}>
                       Cancel
                    </Text>
                </TouchableOpacity>
            </View>}

        { fieldDataLoading ? <ActivityIndicator size='large' color='#562349' /> : 
            <View>
                {(showCert && certArray.length > 0) && <Text style={styles.certSectionText}>Your fields</Text>}
                <FlatList 
                    data={certArray}
                    renderItem={({item}) => <FieldDisplay item={item} />}
                    keyExtractor={item => item.id}
                    style={{ gap: 10 }}
                /> 
            </View>
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
    fieldContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#562349',
        borderWidth: 2,
        borderRadius: 10,
        fontFamily: 'Poppins_400Regular', 
        color: '#562349', 
        fontSize: 12,
    },
    cerFromInput: {
        fontFamily: 'Poppins_400Regular', 
        color: '#562349', 
        fontSize: 12,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#562349',
        borderWidth: 2,
        borderRadius: 10,
    },  
    certSectionText: {
        fontFamily: 'Poppins_400Regular', 
        color: '#562349', 
        fontSize: 14,
        textDecorationLine: 'underline',
        // textAlign: 'center'
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
        fontSize: 10, 
        paddingVertical: 5
    },
    
});