import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'
import { Header } from 'react-native/Libraries/NewAppScreen'

export function MyPlants(){
  return(
    <View style={styles.container}>
      <Header>

      </Header>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})