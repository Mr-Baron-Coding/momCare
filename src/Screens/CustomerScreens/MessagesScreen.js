import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

// import UserHeader from '../Comps/CustomersComp/UserHeader';
// import MenuScreen from '../Comps/Menu';

export default function MessagesScreen() {
    const [menuWindow, setMenu] = useState(false);

  return (
    <View>
        {/* <UserHeader heightVar={100} logoHeight={50} logoWidth={100} showBackIcon={true} showUserIcons={true} setMenu={setMenu} /> */}
        {/* <MenuScreen menuWindow={menuWindow} closeMenu={ () => setMenu(false) } /> */}
      <Text>MessagesScreen</Text>
    </View>
  )
};

const styles = StyleSheet.create({});