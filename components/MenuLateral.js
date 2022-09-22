import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Navigator from './Navigator'
import ListItems from './ListItems'

const Drawer = createDrawerNavigator();

const MenuLateral = () => {
  return (
    <Drawer.Navigator 
        useLegacyImplementation
        initialRouteName="Home"
    >
        <Drawer.Screen 
            name="Home" 
            component={Navigator}
            options={{title: "Meu primeiro App"}}
        ></Drawer.Screen>
        <Drawer.Screen 
            name="ListItems" 
            component={ListItems}
        ></Drawer.Screen>
    </Drawer.Navigator>
  )
}

export default MenuLateral