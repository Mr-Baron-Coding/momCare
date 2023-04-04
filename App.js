import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Welcome from './src/Screens/Welcome';
import Login from './src/Screens/Login';
import Signup from './src/Screens/Signup';
import Homescreen from './src/Screens/Homescreen';
import Map from './src/Screens/Map';

//icons
import Logo from './assets/SVG/logo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} /> 
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Signup" component={Signup} />
        <Stack.Screen options={{ headerShown: false }} name="Homescreen" component={Homescreen} />
        <Stack.Screen options={{ headerShown: false }} name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};