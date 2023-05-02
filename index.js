import { registerRootComponent } from 'expo';
// import { AppRegistry } from 'react-native';

import App from './App';
// AppRegistry.registerComponent('momcare2.0', () => App);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

// import { registerRootComponent } from 'expo';
// import { View } from 'react-native';

// export default function App() {
//   return <View />;
// }

// registerRootComponent(App);
