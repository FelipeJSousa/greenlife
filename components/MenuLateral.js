import React, { useContext } from 'react';
import { Text } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import Home from './Home';
import Post from './Post';
import { AuthContext } from '../config/Context';

const Drawer = createDrawerNavigator();

const MenuLateral = () => {
  const { nomeUsuario, Logout } = useContext(AuthContext);

  const Usuario = () => (
    <Text
      style={{
        color: 'white',
        padding: 10,
        marginRight: 20,
        fontWeight: '500',
        fontSize: 15,
      }}
    >
      {nomeUsuario}
    </Text>
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
