import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../src/auth/AuthContext";

export default function AppLayout() {
  const { token } = useAuth();

  if (!token) return <Redirect href="/login" />;

  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="feed" options={{ title: "Class Feed" }} />
      <Stack.Screen name="create-post" options={{ title: "Create Post" }} />
    </Stack>
  );
}
