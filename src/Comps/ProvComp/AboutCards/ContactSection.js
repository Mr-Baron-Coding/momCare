import { StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ref, update, get, push, child, set, onValue } from 'firebase/database';
import { database } from '../../../../firebase';

//icons
import Phone from '../../../../assets/SVG/ContactIcons/Phone';
import Site from '../../../../assets/SVG/ContactIcons/Site';

export default function ContactSection({ data }) {
    const [phone, setPhone] = useState('');
    const [phoneEdit, setPhoneEdit] = useState(false);
    const [mail, setMail] = useState('');
    const [mailEdit, setMailEdit] = useState(false);
    const [site, setSite] = useState('');
    const [siteEdit, setSiteEdit] = useState(false);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
      data.mail && setMail(data.mail);
      data.phone && setPhone(data.phone);
      data.site && setSite(data.site);
    },[]);

    const handleSubmit = () => {
      setLoading((prv) => prv = true);
      update(ref((database), 'users/providers/' + data.userID  ) , {
              phone: phone, 
              site: site, 
              mail: mail,
      })
      .then(() => {
          console.log('Saved');
          setPhoneEdit(false);
          setMailEdit(false);
          setSiteEdit(false);
          // setCert({fields: '', from: '', year: ''});
          // setYear('');
          // setFromInput('');
      })
      // .then(() => {
      //   // get(child(dbRef, `users/${userId}`))
      //   get(child(ref(database), 'users/' + data.userID + '/phone' )).then((snap) => {
      //     if(snap.exists()) {
      //       console.log(snap.val());
      //       setPhone(prv => prv = snap.val());
      //     }
      //   })
      // })
      .then(() => {
          setLoading((prv) => prv = false);
      })
      .catch((err) => {
          console.log(err);
      })
    };

    const getFieldsFromDB = () => {
      let arr = [];
      setLoading(true);
      get(child(ref(database), 'users/providers/' + data.userID  + '/mail')).then((snapshot) => {
          if (snapshot.exists()) {
              snapshot.forEach((child) => {
                  const childData = child.val();
                  arr.push(childData.carearea)
                  // setSelectedList([...selectedList, childData])
                  // console.log(arr);
                  console.log(childData);
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
      {(!phoneEdit)
      ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Phone /><Text style={styles.textStyling}>{phone}</Text>
          </View>
            <TouchableOpacity onPress={() => setPhoneEdit(true)}>
              <Text style={styles.editTextStyling}>Edit</Text>
            </TouchableOpacity>
        </View>
      : <View>
          <TextInput
            onChangeText={(text) => setPhone(text)}
            value={phone}
            placeholder='Add phone number'
            style={styles.inputformStyle}
            maxLength={10}
            inputMode='numeric'
            keyboardType="numeric"
          />
        </View>}
      {(!mailEdit)
      ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30, alignItems: 'center' }}>
          <Text style={styles.textStyling}>{mail}</Text>
          <TouchableOpacity onPress={() => setMailEdit(true)}>
            <Text style={styles.editTextStyling}>Edit</Text>
          </TouchableOpacity>
        </View>
      : <TextInput
          onChangeText={(text) => setMail(text)}
          value={mail}
          placeholder='Add email'
          style={styles.inputformStyle}
        />}
      {(!siteEdit)
      ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Site /><Text style={styles.textStyling}>{site}</Text>
          </View>
          <TouchableOpacity onPress={() => setSiteEdit(true)}>
            <Text style={styles.editTextStyling}>Edit</Text>
          </TouchableOpacity>
        </View>
      : <TextInput
          onChangeText={(text) => setSite(text)}
          value={site}
          placeholder='Add personal site'
          style={styles.inputformStyle}
        />}
      
    <View style={{ alignItems: 'flex-end' }}>
      <TouchableOpacity style={styles.buttonStyle} onPress={ () => handleSubmit() }>
        <Text style={styles.buttonTextStyle}>
          {loading ? <ActivityIndicator size='small' color='#562349' /> :  'Save'}
        </Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputformStyle: {
      width: '80%',
      fontFamily: 'Poppins_400Regular',
      backgroundColor: 'white',
      paddingHorizontal: 15,
      borderColor: '#562349',
      borderWidth: 1,
      borderRadius: 10,
      // marginVertical: 10,
      height: 30,
      color: '#562349',
      fontSize: 14,
  },
  textStyling: {
    fontFamily: 'Quicksand',
    fontWeight: '700',
    fontSize: 14,
    color: '#562349'
  },
  editTextStyling: {
    fontFamily: 'Quicksand',
    fontWeight: '500',
    fontSize: 12,
    color: '#562349'
  },
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
});