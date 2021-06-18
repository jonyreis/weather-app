import * as React from 'react'
import { View, Text } from 'react-native'

import Header from '../../components/header'

const Search = ({ navigation }: any) => {
  return (
    <>
      <Header navigation={navigation} title="Search" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Search</Text>
      </View>
    </>
  )
}

export default Search