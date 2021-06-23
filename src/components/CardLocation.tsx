import React from 'react'
import { StyleSheet , View, Text } from 'react-native'
import { colors } from '../utils'

import { Feather } from '@expo/vector-icons';

interface ICardLocationProps {
  id: string
  city: string
  state: string
  country: string
}


const CardLocation = (props: ICardLocationProps) => {
  
  return (
    <View style={styles.main} key={props.id}>
      <View style={styles.redContent}></View>
      <View style={styles.flexContainer}>
        <Text style={styles.city}>{props.city}</Text>
        <View style={styles.stateEndCountry}>
          <Text>{props.state}</Text>
          <Text>, {props.country}</Text>
        </View>
      </View>
      <Feather name="arrow-right" size={30} color={colors.PRIMARY_COLOR} style={styles.iconArrowRight} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    backgroundColor: '#DEDEDE',
    borderRadius: 12,
    height: 80,
    marginTop: 8,
    marginBottom: 4,
    padding: 16
  },
  redContent: {
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 4,
    width: 4,
    height: '100%'
  },
  flexContainer: {
    justifyContent: 'center',
    marginLeft: 16
  },
  city: {
    fontSize: 18,
    fontWeight: '700'
  },
  stateEndCountry: {
    fontSize: 18,
    flexDirection: 'row'
  },
  iconArrowRight: {
    position: 'absolute',
    right: 16,
    top: 24
  }
})

export default CardLocation