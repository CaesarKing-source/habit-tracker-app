import AppHeader from '@/components/AppHeader';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabsLayout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff'}} edges={['top']}>
            <AppHeader />

            <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#ffffff',
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0
            },
            tabBarActiveTintColor: '#003b95',
            tabBarInactiveTintColor: '#666666',

            tabBarButton: (props) => (
                <TouchableOpacity
                {...props}
                activeOpacity={1}
                style={props.style}
                />
            ),
            }}>
            <Tabs.Screen name='index' options={{ 
                title: `Today's Habit`,
                tabBarIcon: ({ color, size}) => (
                    <AntDesign name="linechart" size={size} color={color} />
                )  
            }} />

            <Tabs.Screen name='streaks' options={{
                title: 'Streaks',
                tabBarIcon: ({ color, size}) => (
                    <FontAwesome5 name="fire" size={size} color={color} />
                )
            }} />

            <Tabs.Screen name='add-habit' options={{
                title: 'Add Habit',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="add-alarm" size={size} color={color} />
                )
            }}
            />
            </Tabs>
        </SafeAreaView>  
    );
}