import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

//screens
import Welcome from './src/Screens/Welcome';
import Login from './src/Comps/Login';
import Signup from './src/Comps/Signup';
import Homescreen from './src/Screens/CustomerScreens/Homescreen';
// import Map from './src/Screens/Map';
import Searchresults from './src/Screens/CustomerScreens/Searchresults';
import ProviderDetailScreen from './src/Screens/CustomerScreens/ProviderDetailScreen';
import ProviderHomeScreen from './src/Screens/ProviderHomeScreen';
import Message from './src/Screens/CustomerScreens/Message';
import MessagesScreen from './src/Screens/CustomerScreens/MessagesScreen';
import LikedScreen from './src/Screens/CustomerScreens/LikedScreen';
import ProvidersMessagScreen from './src/Screens/ProvidersScreeens/ProvidersMessagScreen';

//redux
import store from './src/Redux/store';
import { Provider } from 'react-redux';
import { auth } from './firebase';
import { database } from './firebase';
import { get, ref } from 'firebase/database';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isProvider, setIsProvider] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(prv => prv = true);
    setTimeout(() => {
      if (auth.currentUser !== null) {
        console.log(auth.currentUser.uid)
        runCheck();
      } else {
        setLoading(prv => prv = false);
        console.log('failed');
      }
    }, 1000);
  },[auth]);

  //auto login
  const runCheck = () => {
    auth.currentUser && get(ref(database, `users/providers/${auth.currentUser.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log("User is authenticated and exists in the database");
          setLoading(prv => prv = false);
          return setIsProvider(prv => prv = true);
        } else {
          setLoading(prv => prv = false);
          return setIsCustomer(prv => prv = true);
          // console.log("User is authenticated but does not exist in the database");
        }
      })
    .catch((error) => {
      console.error(error);
    });
  };

  return ( isLoading ? <ActivityIndicator size='large' color='black' /> :
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={(auth.currentUser === null) ? "Welcome" : isProvider ? "ProviderHomeScreen" : isCustomer && "Homescreen" }>
          <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} /> 
          {/* <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
          <Stack.Screen options={{ headerShown: false }} name="Signup" component={Signup} /> */}
          <Stack.Screen options={{ headerShown: false }} name="Homescreen" component={Homescreen} />
          <Stack.Screen options={{ headerShown: false }} name="ProviderHomeScreen" component={ProviderHomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="ProvidersMessagScreen" component={ProvidersMessagScreen} />
          {/* <Stack.Screen options={{ headerShown: false }} name="Map" component={Map} /> */}
          <Stack.Screen options={{ headerShown: false }} name="Searchresults" component={Searchresults} />
          <Stack.Screen options={{ headerShown: false }} name="ProviderDetail" component={ProviderDetailScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Message" component={Message} />
          <Stack.Screen options={{ headerShown: false }} name="MessagesScreen" component={MessagesScreen} />
          <Stack.Screen options={{ headerShown: false }} name="LikedScreen" component={LikedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};