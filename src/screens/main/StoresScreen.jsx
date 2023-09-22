import { AppState, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/reducers/productsSlice';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // Elimina la importación PROVIDER_GOOGLE si no estás usando Google Maps
import Map from '../../components/Map';
import { checkLocationPermission } from '../../redux/reducers/permissionLocationSlice';



const StoresScreen = () => {

    const permissionAsk= useSelector((state)=>state.permissionLocation)
    const product = useSelector((state) => state.allProducts);
    const dispatch= useDispatch()

    console.log(permissionAsk);
  
    useEffect(() => {
        dispatch(getAllProducts());
      }, [dispatch]);

      useEffect(() => {
  
        AppState.addEventListener('change',state=>{
          if(state === 'active'){
            dispatch(checkLocationPermission())
          }
        })
      }, [dispatch])

    // console.log(product);
useEffect(() => {
  Geolocation.getCurrentPosition(info => console.log(info));
}, [])

 
  return (
    <View style={{flex:1}}>
      <Map/>
  
      
        </View>
  )
}

export default StoresScreen

const styles = StyleSheet.create({
  
 });
