import { account } from "@/lib/appwrite";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    isLoadingUser: boolean;
    signIn: (email: string, password: string) => Promise<string | null>;
    signUp: (name:string, email: string, password: string) => Promise<string | null>;
    signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined >(undefined);

export const AuthContextProvider = ({ children } : {children : ReactNode}) => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    useEffect(() => {
        getUser()
    }, []);
    
    const getUser = async () => {
        try {
            const currentUser = await account.get();
            setUser(currentUser);
        }
        catch(err) {
            if(err instanceof Error) console.error(err.message);
            setUser(null);
        }
        finally {
            setIsLoadingUser(false);
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            await account.createEmailPasswordSession(email, password);
            const currentUser = await account.get();
            setUser(currentUser);
            return null;
        }   
        catch(err) {
            if(err instanceof Error) console.error(err.message);
            return "An error occured durning the signin";
        }    
    };
    
    const signUp = async (name:string, email: string, password: string) => {
        try {
            const newUser = await account.create(ID.unique(), email, password, name);
            await signIn(email, password);
            return null;
        }   
        catch(err) {
            if(err instanceof Error) console.error(err.message);
            return "An error occured durning the signin";
        }
        
    };

    const signOut = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoadingUser, signIn, signUp, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be inside the AuthContextProvider')
    }
    return context;
}