import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect } from 'react';

//fonts
import { useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_300Light } from '@expo-google-fonts/poppins';

//icons
import Phone from '../../assets/SVG/ContactIcons/Phone';
import Site from '../../assets/SVG/ContactIcons/Site';
import Mail from '../../assets/SVG/UserIcons/mail';

export default function ProfileAbout({ userName, about, carearea, mail, phone, site, fields, cernqual }) {

  const aboutList = [
    { header: 'About', data: about, id: 'about1'},
    { header: 'Certificates and qualification', data: cernqual, id: 'about2'},
    { header: 'Care area', data: carearea, id: 'about3'},
    { header: 'Contact info', data: {mail: mail, phone: phone, site: site}, id: 'about4'},
  ];

  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_400Regular, Poppins_300Light
  });
    if (!fontsLoaded) {
        return null;
  };

  const AboutCard = ({item}) => {
    return (
      <View style={styles.container}>
        <Text style={{ fontFamily: 'Poppins_700bold', color: '#562349', fontSize: 18 }}>{item.header}</Text>
        { item.id === 'about1' && <Text style={{ fontFamily: 'Poppins_300Light', color: '#562349', fontSize: 14 }}>{item.data}</Text> }
        { item.id === 'about2' &&
           <FlatList 
              data={item.data}
              listKey="about"
              renderItem={({item}) => <QualCard items={item} />}
              keyExtractor={(items, id) => id}
            />
        }
        { item.id === 'about3' && 
            <FlatList 
              data={item.data}
              listKey="carearea"
              renderItem={({item}) => <Text style={styles.areaText}>{item}</Text>}
              keyExtractor={(items, id) => id}
              style={styles.areaContainer}
            />  
        }
        { item.id === 'about4' && 
            <ContactCard item={item.data} />
        }
      </View>
    )
  };

  //qualifications card list 
  const QualCard = ({items}) => {
    return (
      <View style={styles.qualCardContainer}>
        <Text style={styles.fieldsText}>{items.fields}</Text>
        <Text style={styles.qualText}>{items.from} {items.year}</Text>
      </View>
    )
  };

  const ContactCard = ({item}) => {
    return (
      <View>
          <View style={styles.CardContainer}>
            <Phone height={30} width={30} />
            <Text style={styles.contactText}>{item.phone ? item.phone : 'No phone yet'}</Text>
          </View> 
          <View style={styles.CardContainer}>
            <Mail height={30} width={30} />
            <Text style={styles.contactText}>{item.mail ? item.mail : 'No mail yet'}</Text>
          </View> 
          <View style={styles.CardContainer}>
            <Site />
            <Text style={styles.contactText}>{item.site ? item.site : 'No site yet'}</Text>
          </View>  
      </View>
    )
  };  

  return (
    <FlatList  
      data={aboutList}
      renderItem={({item}) => <AboutCard item={item} listKey={'subOne'} />}
      keyExtractor={item => item.id}
      listKey="main"
    />
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  qualCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  fieldsText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    // marginBottom: 5,
    // paddingHorizontal: 15,
    // paddingVertical: 5,
    lineHeight: 18,
    color: '#562349'
  },
  qualText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    marginBottom: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    lineHeight: 18,
    color: '#FFFFFF',
    backgroundColor: '#C4A7B5',
    borderRadius: 50
  },
  areaContainer: {
    flexDirection: 'row'
  },
  areaText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    paddingRight: 5,
    color: '#562349'
  },
  contactContainer: {
    flexDirection: 'column'
  },
  CardContainer: {
    flexDirection: 'row'
  },
  contactText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#562349',
    lineHeight: 18,
    paddingLeft: 10,
    paddingVertical: 8
  }
});