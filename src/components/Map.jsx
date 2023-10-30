import { StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import { followUserLocation, getLocation, stopFollowUserLocation } from '../redux/reducers/locationSlice'
import LoadingScreen from './LoadingScreen'
import Fab from './Fab'

const Map = () => {
  
  const dispatch= useDispatch();
  const product = useSelector((state) => state.allProducts);
  const {loading, locationState, userLocation, watchId}= useSelector((state)=>state.location); 

  const mapViewRef= useRef(); 
  const following= useRef(true); 
  console.log(watchId,'USER LOCATION'); 

  useEffect(() => {
  dispatch(getLocation());
  }, [])  


  useEffect(() => {

    if(!following.current) return;
   
    mapViewRef.current?.animateCamera(
      {
        center: {
          latitude: userLocation?.latitude,
          longitude: userLocation?.longitude,
        }
      }
    )
  }, [userLocation]) 

  useEffect(() => {
 
      dispatch(followUserLocation())
      return () => {
        dispatch(stopFollowUserLocation(watchId))
      }
    
  }, [userLocation])
  

  const centerPosition=  ()=>{
    following.current=true;
    
    dispatch(getLocation());
    mapViewRef.current?.animateCamera(
      {
        center: {
          latitude: locationState?.latitude,
          longitude: locationState?.longitude,
        }
      }
    )
  
  }
  
  return (
    <>
    {
      !loading ?
      <>
      <MapView
        ref={(el)=>mapViewRef.current= el}
        followsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation //* la libreria react-native-maps estaba mal asi que modifique la version a la 21.0.1 desde el node-modules e instale "patch-package" para parchar los cambios de la libreria //*
        region={{
          latitude: locationState?.latitude,
          longitude: locationState?.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onTouchStart={()=>following.current= false}
      >
      {
        product.allProducts?.map((store,position)=>{

          return(
            <Marker key={position} coordinate={{
              latitude: store.location[0],
              longitude: store.location[1],           
          }}/> 
          )
        })
      }

      </MapView>
      <Fab //Boton flotante 
        iconName="compass-outline"
        onPress={centerPosition}
        style={{
          position:'absolute',
          bottom:20,
          right:20
        }}
      /></> : (<LoadingScreen/>)
    }
      
    </>
  )
}

export default Map

const styles = StyleSheet.create({
  map: {
   flex:1
  },})