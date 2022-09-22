import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import ListItems from './ListItems'
import Home from './Home'
import Login from './Login'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
            <Stack.Screen name="ListIems" component={ListItems}></Stack.Screen>
            <Stack.Screen name="Sair" component={Login}></Stack.Screen>
        </Stack.Navigator>
    )
}

const Navigator = () => {
  const activeRoute = ''
  return (
    <Home>
    </Home>
  )
}

export default Navigator