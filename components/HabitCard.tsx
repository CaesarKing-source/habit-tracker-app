import { HabitCardProps } from '@/types/database.type';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Surface } from 'react-native-paper';

const HabitCard = ({ data }: HabitCardProps) => {
    const { habit, desc, streak_count, frequency } = data;
    return (
    <Surface style={styles.habitCard} elevation={2}>
    <View style={styles.habitCardContent}>
      <Text style={styles.cardTitle}>{habit}</Text>
      <Text style={styles.cardDescription}>{desc}</Text>
      <View style={styles.cardFooter}>
        <View style={styles.streakBadge}>
            <FontAwesome6 name="fire" size={24} color="orange" />
            <Text style={styles.streakBadgeText}>{streak_count} days</Text>
        </View>
        <View style={styles.freqBadge}>
            <Text style={styles.freqBadgeText}>
                {frequency.charAt(0).toUpperCase()+frequency.slice(1)}</Text>
        </View>
      </View>
    </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
    habitCard: {
        marginBottom: 15,
        borderRadius: 12,
        backgroundColor: '#f8f8f8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
    },
    habitCardContent: {
        padding: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#003b95",
        marginBottom: 5
    },
    cardDescription: {
        fontSize: 14,
        color: "#6c6c80",
        marginBottom: 15
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    streakBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#fff3e0',
        borderRadius: 12,
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    streakBadgeText: {
        color: '#ff9800',
        fontSize: 14,
        fontWeight: 'bold'
    },
    freqBadge: {
        backgroundColor: '#ADD8E6',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    freqBadgeText: {
        color: '#003b95',
        fontSize: 14,
        fontWeight: 'bold'
    }
})
export default HabitCard;
