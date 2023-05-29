import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

// import UserHeader from '../../Comps/CustomersComp/UserHeader';
import MenuScreen from '../../Comps/Menu';

export default function LikedScreen({ route }) {
    // const [menuWindow, setMenu] = useState(false);

  return (
    <View style={{ borderColor: 'red', borderWidth: 3 }}>
        {/* <UserHeader heightVar={100} logoHeight={50} logoWidth={100} showBackIcon={true} showUserIcons={true} setMenu={setMenu} username={username} /> */}
        {/* <MenuScreen menuWindow={menuWindow} closeMenu={ () => setMenu(false) } /> */}
      <Text>LikedScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})