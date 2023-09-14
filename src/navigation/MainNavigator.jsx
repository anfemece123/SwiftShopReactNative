import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native'

import StoresScreen from '../screens/main/StoresScreen';
import ProductsScreen from '../screens/main/ProductsScreen';
import CartScreen from '../screens/main/CartScreen';
import { useSelector } from 'react-redux';
import LockScreen from '../screens/main/LockScreen';

const Stack = createNativeStackNavigator();

const MainNavigatior = () => {

  const permissionAsk= useSelector((state)=>state.permissionLocation.permissionState)


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
      {
        permissionAsk=== 'granted'? (
          <>
          <Stack.Screen 
          name="StoresScreen"
          component={StoresScreen}
          
          />
      <Stack.Screen  
          name="ProductScreen"
          component={ProductsScreen}
          />
        <Stack.Screen  
          name="CartScreen"
          component={CartScreen}
          />
          </>
        ):(
          <Stack.Screen  
          name="LockScreen"
          component={LockScreen}
          />
        )

      }
       
    </>

   </Stack.Navigator>
  )
}

export default MainNavigatior; 