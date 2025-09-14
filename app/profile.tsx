import { useAuth } from '@/context/auth-context';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const Profile = () => {
  const { user, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.pageHeading}>Profile</Text>
      <Text style={styles.title} variant='bodyLarge'>Welcome, {user?.name}👋</Text>
      <Text style={styles.title} variant='bodyLarge'>Email: {user?.email}</Text>
      <Text style={styles.title} variant='bodyLarge'>Join On: {user?.$createdAt.split('T')[0]}</Text>

      <Button style={styles.button} mode="contained" onPress={signOut}>Sign Out</Button>
      <Button mode='outlined'>Reset Password</Button>
      <Text style={styles.appFooter} variant='bodySmall'>Habit Tracker @2025 . App Version: 1.12</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
    padding: 15,
  },
  pageHeading: {
    fontSize: 35,
    marginBottom: 25,
    fontWeight: 700,
    color: '#003b95'
  },
  title: {
    fontSize: 20,
    fontWeight: "medium",
    marginBottom: 10
  },
  button: {
    backgroundColor: '#003b95',
    marginVertical: 20
  },
  appFooter: {
    position: "absolute",
    textAlign: 'center',
    left: '20%',
    bottom: 50
  }
})
export default Profile