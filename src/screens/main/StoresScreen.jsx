import { AppState, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/reducers/productsSlice';
import Map from '../../components/Map';
import { checkLocationPermission } from '../../redux/reducers/permissionLocationSlice';

const StoresScreen = () => {

    const permissionAsk= useSelector((state)=>state.permissionLocation)
    const product = useSelector((state) => state.allProducts);
    const dispatch= useDispatch()

   
  
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

  return (
    <View style={{flex:1}}>
      <Map/>
    
    </View>
  )
}

export default StoresScreen

const styles = StyleSheet.create({
  
 });
