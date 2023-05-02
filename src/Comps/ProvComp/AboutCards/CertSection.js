import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect } from 'react';
import { ref, get, update } from 'firebase/database';
import { database } from '../../../../firebase';

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

export default function CertSection({ selectedField, }) {
    const [loading, setLoading] = useState(false);
    const [certFields, setCert] = useState({fields: '', from: '', year: ''});
    const [selected, setSelected] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [isFieldFormOpen, setFieldOpen] = useState({isOpen: false, inputType: ''});
    const [fromInput, setFromInput] = useState('');
    const [yearSelect, setYear] = useState('');

    const fieldsArray = [
        {logo: <Lac />, name: 'Lactation consultant', id: '11'}, 
        {logo: <BabyDav />, name: 'Baby development', id: '12'},
        {logo: <Nut />, name: 'Nutritionists', id: '13'}, 
        {logo: <Sleep />, name: 'Sleep consultant', id: '14'}, 
        {logo: <Doula />, name: 'Birth Doula', id: '15'}, 
        {logo: <Osteopathy />, name: 'Osteopathy', id: '16'}, 
        {logo: <Acupuncture />, name: 'Acupuncture', id: '17'}, 
        {logo: <PostDula />, name: 'Postpartum doula', id: '18'}, 
        {logo: <Reflo />, name: 'Reflexology', id: '19'}, 
        {logo: <Homoyo />, name: 'Homeopathy', id: '21'}, 
        {logo: <PregSupport />, name: 'Pregnancy support', id: '22'},
        {logo: <Presupport />, name: 'Personal development', id: '23'}
    ];

    // useEffect(() => {
    //     console.log(certFields);
    //     setCert({fields: selectedField, from: certFields.from , year: certFields.year})
    //     setForm(['', false]);
    // },[selectedField]);

    // certifications form
    // const inputForm = () => {
    //     return (
    //         <View style={[styles.formContainer, fieldForm ? styles.openContainer : styles.closeContainer]}>
    //             {formType === 'fields' && <FlatList 
    //                 data={fieldsArray}
    //                 keyExtractor={item => item.id}
    //                 renderItem={formCard}
    //             /> } 
                    
    //             {formType === 'from' && 
    //                 <>
    //                     <TextInput 
    //                         placeholder='Add from'
    //                         placeholderTextColor={'#C4A7B5'}
    //                         value={fromInput}
    //                         onChangeText={ (text) => setFromInput(text) }
    //                         style={styles.inputformStyle}
    //                     /> 
    //                     <TextInput 
    //                         placeholder='Add year'
    //                         placeholderTextColor={'#C4A7B5'}
    //                         value={yearSelect}
    //                         onChangeText={ (text) => setYear(text) }
    //                         maxLength={4}
    //                         style={styles.inputformStyle}
    //                     /> 
    //                     <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 20 }}>
    //                         <TouchableOpacity style={styles.buttonStyle} onPress={ () => saveInput() }>
    //                             <Text style={styles.buttonTextStyle}>Save</Text>
    //                         </TouchableOpacity>
    //                         <TouchableOpacity style={styles.buttonStyle} onPress={() => clearFromNYear() }>
    //                             <Text style={styles.buttonTextStyle}>Clear</Text>
    //                         </TouchableOpacity>
    //                     </View>
    //                 </>
    //             }  
    //         </View>
    //     )
    // };
    // input field comp 
    const inputField = () => {
        return (
            <View style={styles.formContainer}>
                <Text style={{ fontFamily: 'Poppins_700bold', color: '#562349',fontSize: 14}}>Select field</Text>
                <FlatList 
                    data={fieldsArray}
                    keyExtractor={item => item.id}
                    renderItem={formCard}
                />
            </View>
        )
    };
    const formCard = ({item}) => {
        return (
            <TouchableOpacity 
                style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20, paddingHorizontal: 20 }} 
                onPress={() => handleFieldInputClick(item.name) }
            >
                <Text style={styles.formTextStyle}>{item.name}</Text>
                <View style={{ height: 20, width: 20 }}>{item.logo}</View>
            </TouchableOpacity>
        )
    };
    const handleFieldInputClick = (field) => {
        setFieldOpen({isOpen: false, inputType: ''});
        setCert({fields: field, from: certFields.from , year: certFields.year})
    };

    // input from comp
    const inputFrom = () => {
        return (
            <View style={styles.formContainer}>
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
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => setFieldOpen({isOpen: false, inputType: ''}) }>
                        <Text style={styles.buttonTextStyle}>Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };
    const saveInput = () => {
        setCert({fields: certFields.fields, from: fromInput , year: yearSelect});
        setFieldOpen({isOpen: false, inputType: ''})
    };

    // add to db
    const handleSubmit = () => {
        
    }

  return (
    <View style={{ gap: 10 }}>
        { (isFieldFormOpen.isOpen && isFieldFormOpen.inputType === 'fields') && inputField() }
        { (isFieldFormOpen.isOpen && isFieldFormOpen.inputType === 'from') && inputFrom() }
        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
            <Text style={styles.certSectionText}>Field of care</Text>
            <Text style={styles.certSectionText}>From</Text>
            <Text style={styles.certSectionText}>Year</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
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
            {/* <TextInput 
                placeholder='Your field of care'
                value={certFields.fields}
                onChangeText={ (text) => setCert({fields: text, from: certFields.from , year: certFields.year}) }
                style={[styles.inputTextStyle, { width: 100 }]}
                
            /> */}
            
            {/* <TextInput 
                placeholder='From'
                value={certFields.from}
                onChangeText={ (text) => setCert({fields: certFields.fields, from: text , year: certFields.year}) }
                style={[styles.inputTextStyle, { width: 100 }]}
            />
            <TextInput 
                placeholder='Year'
                value={certFields.year}
                keyboardType='numeric'
                onChangeText={ (text) => setCert({fields: certFields.fields, from: certFields.from , year: text}) }
                style={[styles.inputTextStyle, { width: 100 }]}
            /> */}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 20 }}>
            <TouchableOpacity style={styles.buttonStyle} >
                <Text style={styles.buttonTextStyle}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => handleSubmit() }>
                <Text style={styles.buttonTextStyle} onPress={ () => setCert({fields: '', from: '', year: ''}) }>Clear</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonStyle: {
        height: 30,
        width: 100,
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
        height: '90%',
        width: '99%',
        position: 'absolute',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#562349',
        justifyContent: 'space-between',
        padding: 20,
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
    inputformStyle: {
        width: '80%',
        fontFamily: 'Poppins_400Regular',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderColor: '#562349',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 5,
        marginBottom: 10,
        height: 48,
        color: '#562349',
        fontSize: 14,
    },
});