import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AbaNavigator from './AbaNavigator';
import Home from './Home';
import Post from './Post';
import Login from './Login';

const Drawer = createDrawerNavigator();

function MenuLateral() {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={AbaNavigator}
        options={{
          title: 'Green Life',
          headerStyle: { backgroundColor: '#008C8C' },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        }}
      />
      <Drawer.Screen name="Post" component={Post} />
      <Drawer.Screen name="Sair" component={Login} />
    </Drawer.Navigator>
  );
}

export default MenuLateral;
