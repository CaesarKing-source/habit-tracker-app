import { Models } from "react-native-appwrite";

export interface Habit extends Models.DefaultDocument {
    $id: string;
    user_id: string;
    habit: string;
    desc: string;
    streak_count: number;
    frequency: string;
    last_completed: string;
    $createdAt: string;
}

export type HabitCardProps = {
    data: Habit;
};