import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CadastrarUsuario from './components/CadastrarUsuario';
import Login from './components/Login';
import MenuLateral from './components/MenuLateral';
import Post from './components/Post';
import AuthContextProvider from './config/Context';

const Stack = createStackNavigator();

const StackNav = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CadastrarUsuario"
      component={CadastrarUsuario}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MenuLateral"
      component={MenuLateral}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Post" component={Post} />
  </Stack.Navigator>
);

const App = () => (
  <NavigationContainer>
    <AuthContextProvider>
      <StackNav />
    </AuthContextProvider>
  </NavigationContainer>
);

export default App;
