import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

const Map = () => {
  return (
    <>
     <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      showsUserLocation //* la libreria react-native-maps estaba mal asi que modifique la version a la 21.0.1 desde el node-modules e instale "patch-package" para parchar los cambios de la libreria //*
      region={{
        latitude: 1.220239,
        longitude: -77.280314,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >

        <Marker coordinate={{
            latitude: 1.220239,
            longitude: -77.280314,
           
        }}/>
            
    </MapView>
    </>
  )
}

export default Map

const styles = StyleSheet.create({
  map: {
   flex:1
  },})