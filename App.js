import Login from './components/Login'
import { NavigationContainer } from '@react-navigation/native'
import MenuLateral from './components/MenuLateral'
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator();

const StackNav = () => {
  return (
      <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="MenuLateral" component={MenuLateral} options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
  )
}

const App = () => {

  return (
    <NavigationContainer>
     <StackNav/>
    </NavigationContainer>
  );
  
}


export default App;