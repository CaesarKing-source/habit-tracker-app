import { Account, Client, Databases, ID, Storage } from 'react-native-appwrite';

export const client = new Client()
.setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const AppwriteID = ID;

export const DATABASE_ID= process.env.EXPO_PUBLIC_DB_ID!;
export const HABITS_COLLECTION_ID=process.env.EXPO_PUBLIC_HABITS_COLLECTION!;
