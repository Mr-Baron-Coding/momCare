import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { ref, set, get, push, child, remove } from 'firebase/database';
import { database } from '../../../../firebase';
import { auth } from '../../../../firebase';
import $ from 'jquery';

import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';    

//redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteloggedProviderArea, setLoggedProviderCareArea, changeEditOption } from '../../../Redux/features/providerDataSlice';

export default function CareAreaSection({ showArea, setShowArea }) {
    const pickerRef = useRef();
    const dispatch = useDispatch();
    const careAreaList = useSelector((state) => state.providerData.loggedProvider.carearea);
    const sectionEdit = useSelector((state) => state.providerData.providerHomescreenSections.showArea);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [cityList, setCityList] = useState([]);
    const [loading, setLoading] = useState(false);

    const NAME = 'שם יישוב';

    //get list of cities API
    useEffect(() => {
      // careAreaList !== undefined && setShowArea(false);
      careAreaList.length > 0 && dispatch(changeEditOption({ type: 'showArea', state: false }));
      var data = {
        resource_id: '351d4347-8ee0-4906-8e5b-9533aef13595', // the resource id
        limit: 1500, // get 1500 results
        // q: 'JERUSALEM' // query for 'jones'
      };
      $.ajax({
        url: 'https://data.gov.il/api/3/action/datastore_search',
        data: data,
        dataType: 'json',
        success: function(data) {
          if (data.result.records) {
            checkData(data.result.records)
            // console.log(data.result.records[0]['שם יישוב']);
          } 
        }
      });
    },[]);

    //set data to local 
    const checkData = (data) => {
      let arr = [];
      data.map(element => {
        if(element['שם יישוב באנגלית'] !== '') {
          return arr.push({cityEnglish: element['שם יישוב באנגלית'], cityHeb: element['שם יישוב'] });
        }
      });
      setCityList(arr);
    };

    const handleSubmit = (item) => {
      setLoading(true);
        const keyVal = push(ref((database), 'users/providers/' + auth.currentUser.uid  + '/carearea' )).key;
        set(ref((database), 'users/providers/' + auth.currentUser.uid  + '/carearea/' + keyVal) , {
          carearea: item,
        })
        .then(() => {
            console.log('Saved');
            dispatch(setLoggedProviderCareArea({carearea: item, id: keyVal}))
        })
        .then(() => {
            setLoading((prv) => prv = false);
        })
        .catch((err) => {
            console.log(err);
            setLoading((prv) => prv = false);
        })
    }; 

    const handleDelete = (item) => {
      remove(ref(database, 'users/providers/' + auth.currentUser.uid + '/carearea/' + item.id + '/'))
      .then(() => {
        dispatch(deleteloggedProviderArea(item.id))
      })
      .then(() => {
        console.log('removed area');
      })
      .catch((err) => {
        console.log(err + 'unable to remove area');
      })
    };

    const savePress = () => {
      dispatch(changeEditOption({ type: 'showArea', state: false }));
    };

    const CareAreaCard = ({ item }) =>{
      return (
        <TouchableOpacity onPress={ () => handleDelete(item) } style={[sectionEdit &&{ borderBottomColor: '#562349', borderBottomWidth: 1 },{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5}]}>
          <Text style={styles.textStyling}>{item.carearea}</Text>
          {sectionEdit && 
            <AntDesign name="delete" size={14} color="#562349"/>}
        </TouchableOpacity>
      )
    };

  return (
    <View style={{ gap: 10 }}>
      <FlatList 
        data={careAreaList}
        renderItem={({item}) => <CareAreaCard item={item} /> }
        keyExtractor={item => item.id}
        style={styles.areaContainer}
      />
      {sectionEdit && 
          <View style={{ gap: 10 }}>
            <Text style={styles.certSectionText}>Select areas</Text>
            <Picker
              ref={pickerRef}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) => handleSubmit(itemValue)}
              style={styles.fieldContainer}
            >
            { cityList.length !== 0 &&
              cityList.map((element, index) => {
                return <Picker.Item key={index + 'City'} label={element.cityEnglish} value={element.cityEnglish} color={index%2 === 0 ? '#562349' : '#FFA299'} />
              })
            }
            </Picker>
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => savePress()}>
                  <Text style={styles.buttonTextStyle}>{loading ? <ActivityIndicator size='small' color='#562349' /> : 'Save'}</Text>
              </TouchableOpacity>
            </View>
          </View>}
    </View>
  )
}

const styles = StyleSheet.create({
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
  certSectionText: {
    fontFamily: 'Poppins_400Regular', 
    color: '#562349', 
    fontSize: 14,
    textDecorationLine:  'underline',
  },
  areaContainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap'
  },
  textStyling: {
    fontFamily: 'Quicksand',
    fontWeight: '700',
    fontSize: 14,
    color: '#562349'
  },
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
})