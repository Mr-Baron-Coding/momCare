import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

export default function ProfileAbout({ about, area, fields, qualification }) {
  const aboutList = [
    { header: 'About', data: about, id: 'about1'},
    { header: 'Certificates and qualification', data: [{fields: fields, id: 'f'}, {qualification: qualification, id: 'q'}], id: 'about2'},
    { header: 'Care area', data: area, id: 'about3'},
    { header: 'Contact info', data: about, id: 'about4'},
  ];

  const AboutCard = ({item}) => {
    return (
      <View style={styles.container}>
        <Text style={{ fontFamily: 'Poppins_700bold', color: '#562349', fontSize: 18 }}>{item.header}</Text>
        { item.id === 'about1' && <Text>{item.data}</Text> }
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
        { item.id === 'about4' && <Text>{item.data}</Text> }
      </View>
    )
  };

  const QualCard = ({items}) => {
    return (
      <View >
        <FlatList 
          data={items.fields}
          renderItem={({item}) => <Text style={styles.fieldsText}>{item}</Text>}
          // keyExtractor={(item, id) => item.id + id}
          listKey={item => item.id + 'f'}

        />
        <FlatList 
          data={items.qualification}
          renderItem={({item}) => <Text style={styles.qualText}>{item}</Text>}
          // keyExtractor={(item, id) => item.id + id}
          listKey={item => item.id + 'q'}
        />
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
    padding: 15
  },
  qualCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fieldsText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 12,
    marginBottom: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    lineHeight: 18,
    color: '#562349'
  },
  qualText: {
    fontFamily: 'Quicksand',
    fontSize: 12,
    marginBottom: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    lineHeight: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    backgroundColor: '#C4A7B5',
    borderRadius: 50
  },
  areaContainer: {
    flexDirection: 'row'
  },
  areaText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 12,
    paddingRight: 5,
    color: '#562349'
  }
});