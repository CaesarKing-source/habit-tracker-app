import { useAuth } from '@/context/auth-context';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const theme = useTheme();
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const handleSignUp = () => {
    setIsSignUp((prev) => !prev);
  }

  const handleAuth = async () => {
    if(!email || !password) setError('Kindly, fill all the required fields');
    if(password.length < 5 ) setError('Password must be of 6 characters');

    setError(null);

    if(!isSignUp) {
       const message = await signIn(email, password);
       setError(message);
       setEmail("");
       setPassword("");
       router.replace('/');
       return;
    }
    else {
        const message = await signUp(name, email, password);
        setError(message);
        setName("");
        setEmail("");
        setPassword("");
        router.replace('/');
        return;
    }

  }
  return (

        <View style={styles.content}>
            <Text style={styles.title} variant='headlineMedium'>{ isSignUp ? 'Register User' : 'Login User' }</Text>

            {
                isSignUp && <TextInput style={styles.input} placeholder='John Doe'
                value={name} onChangeText={setName} mode='outlined' />
            }

            <TextInput style={styles.input} label={'Email'} placeholder='exampless@gmail.com' autoCapitalize='none' value={email} onChangeText={setEmail}
            keyboardType='email-address' mode='outlined' />

            <TextInput style={styles.input} label={'Password'} placeholder='******' autoCapitalize='none' keyboardType='default' secureTextEntry mode='outlined' value={password} onChangeText={setPassword} />

            {
                error && <Text variant='bodySmall' style={{ color: theme.colors.error}} >{error}</Text>
            }

            <Button style={styles.button} mode='contained' onPress={handleAuth}>
                { isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <Button style={styles.secondaryBtn} onPress={handleSignUp}>
                { isSignUp ? `Already have an account! Sign In` : `Don't have an account ? Sign Up`}
            </Button>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    content: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        padding: 15
    },
    title: {
        textAlign: 'center',
        marginBottom: 25,
        fontWeight: 700,
        color: '#003b95'
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'transparent'
    },
    button: {
        marginTop: 10,
        backgroundColor: '#003b95',
        borderRadius: 6,
        paddingVertical: 5
    },
    secondaryBtn : {
        marginTop: 15,
        color: '#003b95',
    }
})
export default Auth