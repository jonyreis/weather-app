import * as React from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'

import Header from '../../components/Header'

const BASE_URL = 'https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q'

const Search = ({ navigation }: any) => {
  const [value, onChangeText] = React.useState('')
  const [data, setData] = React.useState<string>('')
  const weatherUrl = `${BASE_URL}=${value}`
  
  async function handleSubmit() {
    const response = await fetch(weatherUrl).then((res) => res.json())
    setData(response.results[0].components.city)
  }

  return (
    <>
      <Header navigation={navigation} title="Search" />
      <View style={styles.main}>
        <Text style={styles.inputLabel}>Type your location here:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
        <Button
          onPress={handleSubmit}
          title="Submit"
        />
        <Text>{data}</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    marginTop: 90,
    justifyContent: 'center'
  },
  inputLabel: {
    fontSize: 20
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '90%',
    margin: 16,
    height: 50
  }
})

export default Search