import { useAuth } from '@/context/auth-context';
import { DATABASE_ID, HABITS_COLLECTION_ID, databases } from '@/lib/appwrite';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ID } from 'react-native-appwrite';
import { Button, SegmentedButtons, Text, TextInput, useTheme } from 'react-native-paper';
const frequencies = ['daily', 'monthly', 'weekly'];
type FrequencyType = (typeof frequencies)[number]; 
const AddHabit = () => {
  const [habit, setHabit] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [freq, setFreq] = useState<FrequencyType>('daily');
  const [error, setError] = useState<string>('');
  const { user } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async () => {
    if(!user) return null;
    try {
      await databases.createDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        ID.unique(),
        {
          habit,
          desc,
          user_id: user.$id,
          streak_count: 0,
          frequency: freq,
          last_completed: new Date().toISOString(),
        }
      );
      router.back();
    } 
    catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        return;
      }
      setError('Try again after sometime, some Error occurred');
    }
    finally{
      setHabit('');
      setDesc('');
      setFreq('daily');
      setError('');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title} variant='headlineMedium'>Add Habit</Text>
      <TextInput style={styles.input} label={'Habit'} placeholder='Enter habit' mode='outlined' 
      value={habit} onChangeText={setHabit} />
      <TextInput style={styles.input} label={'Description'} placeholder='Enter description' 
      value={desc} onChangeText={setDesc} mode='outlined' />

      <View style={styles.secondaryBtn}>
        <SegmentedButtons value={freq} onValueChange={(value) => setFreq(value as FrequencyType)} 
        buttons={frequencies.map((freq, index) => ({
          value: freq,
          label: freq.charAt(0).toUpperCase() + freq.slice(1)
        }))} />
      </View>
      <Button onPress={handleSubmit} style={[
        styles.button,
        (!habit || !desc) && styles.disabledButton
      ]} disabled={!habit || !desc} mode="contained">Add Habit</Button>
      { error && <Text variant='bodySmall' style={{ color: theme.colors.error}}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      padding: 15
  },
  title: {
    fontSize: 35,
    marginBottom: 25,
    fontWeight: 700,
    color: '#003b95'
  },
  input: {
      marginBottom: 15,
      backgroundColor: 'transparent'
  },
  button: {
      marginTop: 20,
      backgroundColor: '#003b95',
      paddingVertical: 5,
  },
  secondaryBtn : {
      color: '#003b95',
      borderColor: '#003b95'
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  disabledButtonText: {
    color: '#666666',
  },
})

export default AddHabit