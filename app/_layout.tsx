import { Stack } from "expo-router";
import { AuthProvider } from "../src/auth/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
