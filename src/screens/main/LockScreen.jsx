import { AppState, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { openSettings } from 'react-native-permissions'
import { useDispatch, useSelector } from 'react-redux'
import { askLocationPermission, checkLocationPermission } from '../../redux/reducers/permissionLocationSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../theme/globlaTheme';


const LockScreen = () => {


  const permissionAsk = useSelector((state) => state.permissionLocation.permissionState);
  const dispatch = useDispatch();
  console.log(permissionAsk)

  const hadleClick = () => {
    if (permissionAsk === 'blocked' || permissionAsk === 'denied') {
      openSettings();
    }
  }
  useEffect(() => {
    dispatch(askLocationPermission());
  }, [dispatch])

  useEffect(() => {

    AppState.addEventListener('change', state => {
      if (state === 'active') {
        dispatch(checkLocationPermission())
      }
    })
  }, [])

  return (
    <View style={globalStyles.container} >
      <Icon style={styles.icon} name="navigate-circle" size={250} />
      <Text style={styles.textTitle} >PERMISOS DE UBICACIÓN</Text>
      <Text style={styles.textScreen}>Para brindarte la mejor experiencia, necesitamos acceder a tu ubicación actual.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => hadleClick()}>
        <Text style={styles.buttonText} >PERMISOS</Text>
      </TouchableOpacity>
    </View>

  )
}

export default LockScreen

const styles = StyleSheet.create({
  icon: {
    marginBottom: '20%',
    color: '#80ffdb',
  },
  button: {
    backgroundColor: '#80ffdb',
    width: '90%',
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    marginBottom: '10%',
    backgroundColor: '#80ffdb',
    shadowColor: "#80ffdb",
    shadowOffset: {
      width: '0%',
      height: '-5%',
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 9,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textTitle: {
    color: '#80ffdb',
    fontSize: 28,
    marginBottom: '5%',
  },
  textScreen: {
    color: 'white',
    fontSize: 20,
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '50%',
  }
})