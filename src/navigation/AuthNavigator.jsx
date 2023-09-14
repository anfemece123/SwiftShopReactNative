import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native'
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
   <Stack.Navigator
    screenOptions={{
        cardStyle:{
            backgroundColor:'white'
        },
        headerShown:false    
    }}
   >
       <>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>

   </Stack.Navigator>
  )
}

export default AuthNavigator; 