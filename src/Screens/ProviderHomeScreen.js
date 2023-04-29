import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import ProviderHeader from '../Comps/ProviderHeader';

export default function ProviderHomeScreen({ route }) {
  const { data } = route.params
    useEffect(() => {
        console.log(data);
    },[]);

  return (
    <View>
      <ProviderHeader data={data} />
      <Text>Welcome</Text>
    </View>
  )
}

const styles = StyleSheet.create({})