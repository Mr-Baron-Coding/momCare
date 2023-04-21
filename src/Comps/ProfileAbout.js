import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

//fonts
import { useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_300Light } from '@expo-google-fonts/poppins';

//icons
import Phone from '../../assets/SVG/ContactIcons/Phone';
import Site from '../../assets/SVG/ContactIcons/Site';
import Mail from '../../assets/SVG/UserIcons/mail';

export default function ProfileAbout({ about, area, contact, fields, qualification }) {
  const aboutList = [
    { header: 'About', data: about, id: 'about1'},
    { header: 'Certificates and qualification', data: [{fields: fields, id: 'f'}, {qualification: qualification, id: 'q'}], id: 'about2'},
    { header: 'Care area', data: area, id: 'about3'},
    { header: 'Contact info', data: contact, id: 'about4'},
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
        { item.id === 'about2' && <Text>{item.data}</Text> &&
           <FlatList 
              data={item.data}
              listKey="about"
              renderItem={({item}) => <QualCard items={item} />}
              keyExtractor={(items, id) => id}
              style={styles.qualCardContainer}
            />
        }
        { item.id === 'about3' && 
            <FlatList 
              data={item.data}
              listKey="area"
              renderItem={({item}) => <Text style={styles.areaText}>{item}</Text>}
              keyExtractor={(items, id) => id}
              style={styles.areaContainer}
            />  
        }
        { item.id === 'about4' && 
            <FlatList 
              data={item.data}
              listKey="contact"
              renderItem={({item,index}) => <ContactCard items={item} id={index} />}
              keyExtractor={(items, id) => id}
              style={styles.contactContainer}
            />
        }
      </View>
    )
  };

  const QualCard = ({items}) => {
    return (
      <View >
        <FlatList 
          data={items.fields}
          renderItem={({item}) => <Text style={styles.fieldsText}>{item}</Text>}
          listKey={item => item.id + 'f'}

        />
        <FlatList 
          data={items.qualification}
          renderItem={({item}) => <Text style={styles.qualText}>{item}</Text>}
          listKey={item => item.id + 'q'}
        />
      </View>
    )
  };

  const ContactCard = ({items, id}) => {
    return (
      <>
        {id === 0 && 
          <View style={styles.CardContainer}>
            <Phone height={30} width={30} />
            <Text style={styles.contactText}>{items}</Text>
          </View> 
        }
        {id === 1 && 
          <View style={styles.CardContainer}>
            <Mail height={30} width={30} />
            <Text style={styles.contactText}>{items}</Text>
          </View> 
        }
        {id === 2 &&
          <View style={styles.CardContainer}>
            <Site />
            <Text style={styles.contactText}>{items}</Text>
          </View>  
        }
      </>
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
    padding: 15
  },
  qualCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fieldsText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    marginBottom: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
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