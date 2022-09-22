import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AbaNavigator from './AbaNavigator';
import ListItems from './ListItems';
import Home from './Home';

const Drawer = createDrawerNavigator();

function MenuLateral() {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={AbaNavigator}
        options={{ title: 'Meu primeiro App' }}
      />
      <Drawer.Screen name="ListItems" component={ListItems} />
      <Drawer.Screen name="Sair" component={Home} />
    </Drawer.Navigator>
  );
}

export default MenuLateral;
