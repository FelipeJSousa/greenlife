import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPreset,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import CadastrarUsuario from './components/CadastrarUsuario';
import Login from './components/Login';
import MapMarker from './components/MapMarker';
import MenuLateral from './components/MenuLateral';
import NovoPost from './components/NovoPost';
import Post from './components/Post';
import AuthContextProvider from './config/Context';

const Stack = createStackNavigator();
const isAndroid = Platform.OS === 'android';

const StackNav = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="CadastrarUsuario" component={CadastrarUsuario} />
    <Stack.Screen
      name="MenuLateral"
      component={MenuLateral}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Post" component={Post} />
    <Stack.Screen name="NovoPost" component={NovoPost} />
    <Stack.Group
      screenOptions={{
        gestureEnabled: true,
        ...(isAndroid && TransitionPresets.ModalPresentationIOS),
      }}
    >
      <Stack.Screen name="MapMarker" component={MapMarker} />
    </Stack.Group>
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
