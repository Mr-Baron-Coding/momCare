import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { ref, set, get, push, child } from 'firebase/database';
import { database } from '../../../../firebase';
import $ from 'jquery';

import { Picker } from '@react-native-picker/picker';

export default function CareAreaSection({ data, showArea, setShowArea }) {
    const pickerRef = useRef();
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedList, setSelectedList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [loading, setLoading] = useState(false);

    const NAME = 'שם יישוב';

      useEffect(() => {
        getFieldsFromDB();
        var data = {
          resource_id: '351d4347-8ee0-4906-8e5b-9533aef13595', // the resource id
          limit: 1500, // get 5 results
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

      // useEffect(() => {
      //   console.log(cityList);
      // },[cityList])

    const checkData = (data) => {
      let arr = [];
      data.map(element => {
        if(element['שם יישוב באנגלית'] !== '') {
          return arr.push({cityEnglish: element['שם יישוב באנגלית'], cityHeb: element['שם יישוב'] });
        }
      });
      setCityList(arr);
    };

    const open = () => {
        pickerRef.current.focus();
    };
    const close = () => {
        pickerRef.current.blur();
    };

    // clear selection
    const clearSelection = () => {
      setSelectedList([]);
    };

    const handleSubmit = (item) => {
      setLoading(prv => prv = true);
        
        const keyVal = push(ref((database), 'users/providers/' + data.userID  + '/carearea' )).key;
        set(ref((database), 'users/providers/' + data.userID  + '/carearea/' + keyVal) , {
          carearea: item,
        })
        .then(() => {
            console.log('Saved');
            setSelectedList([...selectedList, item])
            // setCert({fields: '', from: '', year: ''});
            // setYear('');
            // setFromInput('');
        })
        .then(() => {
            setLoading((prv) => prv = false);
        })
        .catch((err) => {
            console.log(err);
            setLoading((prv) => prv = false);
        })
    }; 

    const savePress = () => {
      setShowArea(false);

    };

    //get area array of provider from db
    const getFieldsFromDB = () => {
      let arr = [];
      setLoading(true);
      get(child(ref(database), 'users/providers/' + data.userID  + '/carearea/')).then((snapshot) => {
          if (snapshot.exists()) {
              snapshot.forEach((child) => {
                  const childData = child.val();
                  arr.push(childData.carearea)
                  // setSelectedList([...selectedList, childData])
                  // console.log(arr);
              })
              // console.log(snapshot.val());
              setSelectedList(arr);
              setTimeout( () => setLoading(false), 500) ;
          } else {
            console.log("No data available");
            setLoading(false);
          }
        }).catch((error) => {
          console.error(error);
          setLoading(false);
        });
  };

  return (
    <View style={{ gap: 10 }}>
      <FlatList 
        data={selectedList}
        renderItem={({item}) => <Text style={styles.textStyling}>{item}</Text>}
        keyExtractor={item => item}
        style={styles.areaContainer}
      />
      {showArea && <View>
          <Text>Select area/s</Text>
          <Picker
            ref={pickerRef}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) => handleSubmit(itemValue)}
            style={styles.selectContainer}
          >
          { cityList.length !== 0 &&
            cityList.map((element, index) => {
              return <Picker.Item key={index + 'City'} label={element.cityEnglish} value={element.cityEnglish} />
            })
          }
        </Picker>
        </View>}
      {showArea && 
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 20 }}>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => savePress()}>
            <Text style={styles.buttonTextStyle}>{loading ? <ActivityIndicator size='small' color='#562349' /> : 'Save'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => clearSelection()}>
            <Text style={styles.buttonTextStyle}>Clear</Text>
        </TouchableOpacity>
    </View>
      }
      
    </View>
  )
}

const styles = StyleSheet.create({
    selectContainer: {
        backgroundColor: 'green'
    },
    areaContainer: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 10,
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