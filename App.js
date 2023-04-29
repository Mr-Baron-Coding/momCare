import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';

import { ref, child, get } from "firebase/database";
import { database } from './firebase';

//screens
import Welcome from './src/Screens/Welcome';
import Login from './src/Screens/Login';
import Signup from './src/Screens/Signup';
import Homescreen from './src/Screens/Homescreen';
import Map from './src/Screens/Map';
import Searchresults from './src/Screens/Searchresults';
import ProviderDetailScreen from './src/Screens/ProviderDetailScreen';
import ProviderHomeScreen from './src/Screens/ProviderHomeScreen';
import Message from './src/Screens/Message';
//icons
import Logo from './assets/SVG/logo';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} /> 
        {/* <Stack.Screen options={{ headerShown: false }} name="Login">
          {(props) => <Login {...props} extraData={arr} /> }
        </Stack.Screen> */}
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Signup" component={Signup} />
        <Stack.Screen options={{ headerShown: false }} name="Homescreen" component={Homescreen} />
        <Stack.Screen options={{ headerShown: false }} name="ProviderHomeScreen" component={ProviderHomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Map" component={Map} />
        <Stack.Screen options={{ headerShown: false }} name="Searchresults" component={Searchresults} />
        <Stack.Screen options={{ headerShown: false }} name="ProviderDetail" component={ProviderDetailScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Message" component={Message} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};