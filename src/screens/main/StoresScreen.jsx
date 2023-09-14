import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/reducers/productsSlice';
import Geolocation from '@react-native-community/geolocation';


const StoresScreen = () => {

    const permissionAsk= useSelector((state)=>state.permissionLocation)
    const product = useSelector((state) => state.allProducts);
    const dispatch= useDispatch()
  
    useEffect(() => {
        dispatch(getAllProducts());
      }, [dispatch]);

    // console.log(product);
useEffect(() => {
  Geolocation.getCurrentPosition(info => console.log(info));
}, [])

 
  return (
    <View>
      <Text>StoresScreen</Text>
    </View>
  )
}

export default StoresScreen

const styles = StyleSheet.create({})