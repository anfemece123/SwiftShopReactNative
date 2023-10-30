import  { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';

const useLocation = () => {
    const [hasLocation, setHasLocation] = useState(false); // *no mostrar nada hasta no saber las coordenadas del usuario 
    const [initialPosition, setInitialPosition] = useState();


    useEffect(() => {
        Geolocation.getCurrentPosition(
          ({coords}) => {
            setInitialPosition({
                latitude: coords.latitude,
                longitud: coords.longitude
            });

            setHasLocation(true);
          }, 
          (err)=>console.log({err}), {enableHighAccuracy:true}
          
          );
      }, [])
  return {
    hasLocation,
    initialPosition
  }
}

export default useLocation
