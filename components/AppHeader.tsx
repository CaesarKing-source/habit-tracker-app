import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'

const AppHeader = () => {
  return (
    <View style={styles.header}>
        <Text variant="headlineSmall">Habit Tracker</Text>
        <Link href={'/profile'}>
            <Avatar.Icon style={styles.profile} size={45} icon={'account-circle-outline'} color='white' />
        </Link>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#DADADA',
    },
    profile: {
      backgroundColor: '#003b95'
    }
})
export default AppHeader;