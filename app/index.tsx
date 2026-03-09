import { useAuth } from "@/src/auth/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { user } = useAuth();

  return <Redirect href={user ? "/(app)/feed" : "/login"} />;
}
