import React from 'react'
import { StyleSheet , View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons';

const Header = ({ navigation, title}: any) => {
  const openMenu = () => {
    navigation.openDrawer()
  }
  return (
    <View style={styles.header}>
      <Feather name="menu" size={28} color="black" onPress={openMenu} style={styles.icon} />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    height: 70,
    alignItems: 'center',
    backgroundColor: '#ddd',
    justifyContent: 'flex-end',
    paddingBottom: 8
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1
  },
  icon: {
    position: 'absolute',
    left: 16,
    bottom: 8
  }
})

export default Header