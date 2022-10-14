import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import Home from './Home';
import { AuthContext } from '../config/Context';
import BlockImage from './BlockImage';
import Firebase from '../config/Firebase';

const Drawer = createDrawerNavigator();

const MenuLateral = () => {
  const { user, Logout } = useContext(AuthContext);
  const [userImage, setUserImage] = useState(null);

  const Usuario = () => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        width: 150,
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: 'white',
          fontWeight: '500',
          fontSize: 15,
          marginRight: 10,
        }}
      >
        {user?.nomeCompleto ?? ''}
      </Text>
      {user?.profileImage && (
        <BlockImage uri={user?.profileImage} width={40} height={40} />
      )}
    </View>
  );

  const DrawerItems = () => {
    const SairIcon = () => (
      <AntDesign name="arrowleft" size={20} color="black" />
    );

    return (
      <>
        <DrawerContentScrollView />
        <DrawerItem onPress={Logout} label="Sair" icon={SairIcon} />
      </>
    );
  };
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerItems {...props} />}
      useLegacyImplementation
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Green Life',
          headerStyle: { backgroundColor: '#008C8C' },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
          headerRight: Usuario,
        }}
      />
    </Drawer.Navigator>
  );
};

export default MenuLateral;
