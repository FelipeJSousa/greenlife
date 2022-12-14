import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import moment from 'moment';
import 'moment/min/locales';
import React from 'react';
import { Platform } from 'react-native';
import CadastrarUsuario from './components/CadastrarUsuario';
import Login from './components/Login';
import MapMarker from './components/MapMarker';
import MenuLateral from './components/MenuLateral';
import NovoPost from './components/NovoPost';
import Post from './components/Post';
import AuthContextProvider from './providers/AuthContextProvider';
import { NovoPostContextProvider } from './providers/NovoPostContextProvider';

const Stack = createStackNavigator();
const isAndroid = Platform.OS === 'android';

moment.locale('pt-BR');

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
    <Stack.Screen
      name="NovoPost"
      options={{ title: 'Novo Post' }}
      component={NovoPost}
    />
    <Stack.Group
      screenOptions={{
        gestureEnabled: true,
        ...(isAndroid && TransitionPresets.ModalPresentationIOS),
      }}
    >
      <Stack.Screen
        name="MapMarker"
        options={{ title: 'Selecione o endereço' }}
        component={MapMarker}
      />
    </Stack.Group>
  </Stack.Navigator>
);

const App = () => (
  <NavigationContainer>
    <AuthContextProvider>
      <NovoPostContextProvider>
        <StackNav />
      </NovoPostContextProvider>
    </AuthContextProvider>
  </NavigationContainer>
);

export default App;
