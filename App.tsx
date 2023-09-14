import React, { useEffect } from 'react'
import { Navigator } from './src/navigation/Navigator'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/redux/store'
import { AppState } from 'react-native'

const App = () => {
  
  useEffect(() => {

    AppState.addEventListener('change',state=>{
      console.log(state)
    })
  }, [])
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <NavigationContainer>
        <Navigator/>
      </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App