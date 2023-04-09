import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
// import Mapbox from '@rnmapbox/maps';
import mapboxgl from 'mapbox-gl';

// Mapbox.setAccessToken('pk.eyJ1IjoibXJiYXJvbiIsImEiOiJjbGc1enUyOWcwOG12M2ZxaXdpZnJ2eHRnIn0.gEgut6a7LRlTeCAZFaxmQw');
mapboxgl.accessToken = 'pk.eyJ1IjoibXJiYXJvbiIsImEiOiJjbGc1enUyOWcwOG12M2ZxaXdpZnJ2eHRnIn0.gEgut6a7LRlTeCAZFaxmQw';

export default function Map({ navigation }) {
    const mapContainer = useRef(null);
        const map = useRef(null);
        const [lng, setLng] = useState(34.799);
        const [lat, setLat] = useState(32.070);
        const [zoom, setZoom] = useState(15);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
        });
    });

  return (
    <View>
        <TouchableOpacity onPress={ () => navigation.navigate('Homescreen') }>
            <Text>Map</Text>
        </TouchableOpacity>    
      <View ref={mapContainer} style={styles.mapContainer} className="map-container"></View>
    </View>
  )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    mapContainer: {
        height: 400
    },
    sidebar: {

    }
});