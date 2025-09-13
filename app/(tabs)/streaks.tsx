import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
const Streaks = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} variant='headlineMedium'>Streaks</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15
  },
  title: {
    textAlign: 'center',
    marginVertical: 25,
    fontWeight: 600,
    color: '#003b95'
},
})

export default Streaks