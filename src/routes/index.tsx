import 'react-native-gesture-handler'

import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from '../screens/Home'
import SearchScreen from '../screens/Search'

const Drawer = createDrawerNavigator()

const Routes = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Home"
        drawerStyle={{
          backgroundColor: '#ff304f',
          width: '70%',
        }}
        drawerContentOptions={{
          activeBackgroundColor: 'rgba(255, 255, 255, 0.3)',
          labelStyle:{
              fontSize: 20,
              color:"#fff"
          }
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Search" component={SearchScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default Routes