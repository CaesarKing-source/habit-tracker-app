import HabitCard from "@/components/HabitCard";
import { useAuth } from "@/context/auth-context";
import { DATABASE_ID, HABITS_COLLECTION_ID, RealtimeResponse, client, databases } from "@/lib/appwrite";
import { Habit } from "@/types/database.type";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Swipeable } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

export default function Index() {
  const { user } = useAuth();
  const userId = user?.$id;
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const swipeableRef = useRef<{ [key: string] : Swipeable | null }>({});

  useEffect(() => {
    if(user?.$id) {
      const channel = `databases.${DATABASE_ID}.collections.${HABITS_COLLECTION_ID}.documents`;
      const habitSubscription = client.subscribe(channel, 
        (response : RealtimeResponse) => {
          if(response.events.includes("databases.*.collections.*.create")) {
            fetchHabits(userId!);
          }
          else if(response.events.includes("databases.*.collections.*.documents")) {
            fetchHabits(userId!);
          }
          else (response.events.includes("databases.*.collections.*.documents")) 
            fetchHabits(userId!);
          
        }
      );
      fetchHabits(userId!);
    }
    return () => {
      console.log('unmounted component')
    }
  }, [user?.$id]);
  console.log(habits);

  const fetchHabits = async (id: string) => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        DATABASE_ID, HABITS_COLLECTION_ID, 
        [Query.equal('user_id', id ?? "")]
      );
      setHabits(response.documents as Habit[]);
    }
    catch(err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  }

  const renderLeft = () => (
    <View style={styles.swipeActionLeft}>
      <MaterialCommunityIcons name="trash-can-outline" size={30} color="#fff" />
    </View>
  )

  const renderRight = () => (
    <View style={styles.swipeActionRight}>
      <MaterialIcons name="check-circle-outline" size={30} color={'#fff'} />
    </View>
  )

  if(loading) {
    return (
      <View style={styles.container}>
        <Text variant="bodyLarge">Kindly, wait data is loading... 😊</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {
        habits?.length === 0 ? <Text variant="bodyLarge">No Habits found !!! 🥲🥲🥲🥲</Text> : (
          habits?.map((habit) => (
            <Swipeable 
              ref={(ref) => {
                swipeableRef.current[habit.$id] = ref;
              }} 
              key={habit.$id} 
              overshootLeft={false}
              overshootRight={false}
              renderLeftActions={renderLeft}
              renderRightActions={renderRight}
              >
              <HabitCard key={habit.$id} data={habit} />
            </Swipeable>
          ))
        )
      }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15
  },
  swipeActionLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#e53935',
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingLeft: 15
  },
  swipeActionRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#4caf50',
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingRight: 15
  }
})