import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import mapboxgl from 'mapbox-gl';

export default function Map() {
    // mapboxgl.accessToken = 'pk.eyJ1IjoibXJiYXJvbiIsImEiOiJjbDI3emtkajEwNGhlM2NxcmN6NjN2enZzIn0.dxCXu5SE7PngpB5BeVmDoA';
    // mapboxgl.baseApiUrl = 'https://api.mapbox.com';
    // const map = new mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/mapbox/streets-v12',
    //     center: [-74.5, 40],
    //     zoom: 9,
    // })
  return (
    <View>
      <Text>Map</Text>
      {/* {map} */}
    </View>
  )
}

const styles = StyleSheet.create({})