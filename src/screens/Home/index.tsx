import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import * as Location from 'expo-location'

import Header from '../../components/Header'
import UnitsPicker from '../../components/UnitsPicker'
import ReloadIcon from '../../components/ReloadIcon'

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

interface ICurrentWeatherProps {
  cod: number,
  main: object,
  wind: object,
  name: string,
  weather: Array<object>
}

const Home = ({ navigation }: any) => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>('')
  const [currentWeather, setCurrentWeather] = React.useState<ICurrentWeatherProps | null>({
    cod: 400,
    main: {},
    wind: {},
    name: '',
    weather: []
  })
  const [unitsSystem, setUnitsSystem] = React.useState('metric')

  
  React.useEffect(() => {
    load()
  }, []);
  
  async function load() {
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      let { status } = await Location.getForegroundPermissionsAsync()

      if (status !== 'granted') {
        setErrorMessage('Access to location is needed to run the app')
        return
      }

      const local = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })

      const { latitude, longitude } = local.coords

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=f77970f66a7ed73baa597076e70e9e6e`

      const response = await fetch(weatherUrl)

      const result = await response.json()
      if (result.cod === 200) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <>
      <Header navigation={navigation} title="Home" />
      <View style={styles.container}>
        <StatusBar style="auto" />
        {errorMessage ?
          <>
            <ReloadIcon load={load} />
            <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
          </>
        : null }
        {currentWeather?.cod !== 200 ?
          <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        : null }
      </View>
    </>
  )

}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
  },
  main: {
      justifyContent: 'center',
      flex: 1,
  },
})

export default Home
