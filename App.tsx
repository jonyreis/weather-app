import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Provider } from 'react-redux'
import Routes from './src/routes'

import store from './src/store'

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" /> 
      <Routes />
    </Provider>
  )
}