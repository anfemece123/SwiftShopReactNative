import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigatior from './MainNavigator';


const Stack = createNativeStackNavigator();

export const Navigator=()=> {
  // if (status === 'checking') return <LoadingScreen/>
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown:false,
      cardStyle:{
        backgroundColor:'white'
      }
    }}
    >
        <>
        <Stack.Screen name="MainNavigatior" component={MainNavigatior} />
        </>

   
    </Stack.Navigator>
  );
}