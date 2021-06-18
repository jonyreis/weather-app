import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import Header from '../../components/header'

const Home = ({ navigation }: any) => {
  return (
    <>
      <View style={styles.container}>
        <Header navigation={navigation} title="Home" />
        <Text>Home aaa</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: '100%',
    paddingTop: 70,
  }
})

export default Home
