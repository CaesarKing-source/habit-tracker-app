import { useAuth } from "@/context/auth-context";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const { signOut } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome, Akshay Giri</Text>
      <Text>Appwrite setup done 🚀</Text>

      <Button mode="text" onPress={signOut}>Sign Out</Button>
    </View>
  );
}
