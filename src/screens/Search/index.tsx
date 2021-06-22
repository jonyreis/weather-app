import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, TextInput, StyleSheet, Pressable, SafeAreaView } from 'react-native'
import * as Location from 'expo-location'
import opencage from 'opencage-api-client'


import Header from '../../components/Header'
import CardLocation from '../../components/CardLocation'

import { colors } from '../../utils/index'
import { MaterialIcons } from '@expo/vector-icons';


const key = '0e2d95efff354a8ab60ce5f710a4d414'
const BASE_URL = `https://api.opencagedata.com/geocode/v1/json?key=${key}&q`

interface IMyLocationProps {
  city: string
  state: string
  country: string
}



const Search = ({ navigation }: any) => {
  const [valueInput, setValueInput] = React.useState('')
  const [myLocation, setMyLocation] = React.useState<IMyLocationProps>({
    city: '',
    state: '',
    country: '',
  })
  const [listLocation, setListLocation] = React.useState<Array<object>>([])

  const URL = `${BASE_URL}=${valueInput}`
  let result

  React.useEffect(() => {
    const data = getData()
    console.log(data)
  }, [])
  
  async function handleSubmit() {
    const response = await fetch(URL).then((res) => res.json())
    result = response.results[0]

    setMyLocation({ 
      city: result.components.city,
      state: result.components.state_code,
      country: result.components.country
    })
    handleLatestResearch(myLocation)
  }

  async function handleMyLocation() {
    let { status } = await Location.getForegroundPermissionsAsync()

    if (status !== 'granted') {
      alert('Access to location is needed to run the app')
      return
    }

    const local = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest })
    const coords = `${local.coords.latitude}, ${local.coords.longitude}`

    opencage.geocode({ key, q: coords }).then(response => {
      result = response.results[0]

      setMyLocation({ 
        city: result.components.city,
        state: result.components.state_code,
        country: result.components.country
      })
      handleLatestResearch(myLocation)
    })
  }

  async function handleLatestResearch(myLocation: object) {
    if (listLocation.length < 3) {
      listLocation.unshift(myLocation)
      storeData(listLocation)
    }
    listLocation.pop()
    listLocation.unshift(myLocation)
    storeData(listLocation)
  }

  async function storeData(value: Array<object>) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  async function getData() {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      return jsonValue != null ? JSON.parse(jsonValue) : []
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <>
      <Header navigation={navigation} title="Search" />
      <View style={styles.main}>
        <Text style={styles.inputLabel}>Type your location here:</Text>
        <TextInput
          style={styles.input}
          value={valueInput}
          onChangeText={text => setValueInput(text)}
          onSubmitEditing={() => handleSubmit()}
        />
        <View style={styles.btnContainer}>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleMyLocation}>
            <Text style={styles.buttonText}>
              <MaterialIcons name="my-location" size={24} color="#Fff" />
            </Text>
          </Pressable>
        </View>
        <SafeAreaView>
          <Text style={styles.previousText}>Previous Searches</Text>
        </SafeAreaView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 70,
    justifyContent: 'flex-start',
    height: '100%',
    padding: 16
  },
  inputLabel: {
    fontSize: 20,
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,

    marginTop: 16,
    marginBottom: 16,
    height: 50,
    padding: 8
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 8,
    width: 100,
    height: 50
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    padding: 14
  },
  previousText: {
    color: '#000',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 24
  }
})

export default Search