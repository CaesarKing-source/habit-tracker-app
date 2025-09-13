import { AuthContextProvider, useAuth } from "@/context/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function RouteGuard({ children } : { children: React.ReactNode}) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] == 'auth';
    if(!isLoadingUser && !user && !inAuthGroup) {
      router.replace('/auth');
    }
    else if(!isLoadingUser && user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, segments]);

  return (
    <>{ children }</>
  )
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
    <RouteGuard>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
    </RouteGuard>
    </AuthContextProvider>
  );
}
