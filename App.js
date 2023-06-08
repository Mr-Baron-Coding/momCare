import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

//screens
import Welcome from './src/Screens/Welcome';
import Login from './src/Screens/Login';
import Signup from './src/Screens/Signup';
import Homescreen from './src/Screens/CustomerScreens/Homescreen';
// import Map from './src/Screens/Map';
import Searchresults from './src/Screens/CustomerScreens/Searchresults';
import ProviderDetailScreen from './src/Screens/CustomerScreens/ProviderDetailScreen';
import ProviderHomeScreen from './src/Screens/ProviderHomeScreen';
import Message from './src/Screens/CustomerScreens/Message';
import MessagesScreen from './src/Screens/CustomerScreens/MessagesScreen';
import LikedScreen from './src/Screens/CustomerScreens/LikedScreen';

//redux
import store from './src/Redux/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} /> 
          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
          <Stack.Screen options={{ headerShown: false }} name="Signup" component={Signup} />
          <Stack.Screen options={{ headerShown: false }} name="Homescreen" component={Homescreen} />
          <Stack.Screen options={{ headerShown: false }} name="ProviderHomeScreen" component={ProviderHomeScreen} />
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