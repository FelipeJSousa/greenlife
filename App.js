import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from './components/Login';
import MenuLateral from './components/MenuLateral';

const Stack = createStackNavigator();

function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MenuLateral"
        component={MenuLateral}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}

export default App;
