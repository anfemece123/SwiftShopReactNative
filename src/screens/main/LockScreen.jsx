import { AppState, Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { openSettings } from 'react-native-permissions'
import { useDispatch, useSelector } from 'react-redux'
import { askLocationPermission, checkLocationPermission } from '../../redux/reducers/permissionLocationSlice'

const LockScreen = () => {


const permissionAsk= useSelector((state)=>state.permissionLocation.permissionState);
const dispatch=useDispatch();
console.log(permissionAsk)

    const hadleClick= ()=>{ 
        if(permissionAsk==='blocked'|| permissionAsk==='denied'){
            openSettings();
        }
    }
    useEffect(() => {
        dispatch(askLocationPermission());
      }, [dispatch])

      useEffect(() => {
  
        AppState.addEventListener('change',state=>{
          if(state === 'active'){
            dispatch(checkLocationPermission())
          }
        })
      }, [])

  return (
    <View style={styles.container}>
      <Text>LockScreen</Text>
      <Button
  onPress={()=>hadleClick()}
  title="Learn More"
  color="#841584"
/>
    </View>
  )
}

export default LockScreen

const styles = StyleSheet.create({
    container:{ 
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})