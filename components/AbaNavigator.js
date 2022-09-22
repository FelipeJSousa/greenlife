import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ListItems from './ListItems';
import Home from './Home';
import Login from './Login';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ListIems" component={ListItems} />
      <Stack.Screen name="Sair" component={Login} />
    </Stack.Navigator>
  );
}

function AbaNavigator() {
  return <Home />;
}

export default AbaNavigator;
