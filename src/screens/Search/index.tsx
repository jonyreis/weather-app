import * as React from 'react'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import * as Location from 'expo-location'


import Header from '../../components/Header'
import CardLocation from '../../components/CardLocation'

import { colors } from '../../utils/index'
import { MaterialIcons } from '@expo/vector-icons'


// const key = '0e2d95efff354a8ab60ce5f710a4d414'
const key ='e85809527b0341b18712ec1bacc3aab9'
const BASE_URL = `https://api.opencagedata.com/geocode/v1/json?key=${key}&q`

interface IMyLocationProps {
  id: string
  city: string
  state: string
  country: string
}

const Search = ({ navigation }: any) => {
  const [valueInput, setValueInput] = React.useState('')
  const [myLocation, setMyLocation] = React.useState<IMyLocationProps>({
    id: '',
    city: '',
    state: '',
    country: ''
  })
  const [listLocation, setListLocation] = React.useState<Array<IMyLocationProps>>([])

  const { search } = useSelector((state: RootStateOrAny) => state)
  const dispatch = useDispatch()
  
  let result

  React.useEffect(() => {
    handleLatestResearch()
  }, [myLocation])

  React.useEffect(() => {
    dispatch({
      type: 'ADD_SEARCH',
      payload: listLocation
    })
  }, [listLocation])

  async function handleSubmit() {
    const URL = `${BASE_URL}=${valueInput}`

    const response = await fetch(URL).then((res) => res.json())
    result = response.results[0]
    let timestamp = new Date().getTime()
    
    setMyLocation({ 
      id: `${result.components.city}-${timestamp}`,
      city: result.components.city,
      state: result.components.state_code,
      country: result.components.country
    })
  }

  async function handleMyLocation() {
    let { status } = await Location.getForegroundPermissionsAsync()
    if (status !== 'granted') {
      alert('Access to location is needed to run the app')
      return
    }

    const local = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest })
    const coords = `${local.coords.latitude},${local.coords.longitude}`

    const response = await fetch(`${BASE_URL}=${coords}`).then((res) => res.json())

    result = response.results[0]
    let timestamp = new Date().getTime()

    setMyLocation({
      id: `${result.components.city}-${timestamp}`,
      city: result.components.city,
      state: result.components.state_code,
      country: result.components.country
    })
  }

  function handleLatestResearch() {
    listLocation.forEach((item, index) => {
      if (item.city === myLocation.city) {
        listLocation.splice(index, 1)
      }
    })
    if (listLocation.length <= 3) {
      setListLocation([ myLocation, ...listLocation])

    } else {
      listLocation.splice(2, 1)
      setListLocation([ myLocation, ...listLocation])
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
          onSubmitEditing={handleSubmit}
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
        <View>
          <Text style={styles.previousText}>Previous Searches</Text>
          {search.map((item: { id: string; city: string; state: string; country: string }) => 
            item.id != '' &&
            <CardLocation 
              id={item.id}
              city={item.city} 
              state={item.state} 
              country={item.country} 
            />
          )}
        </View>
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