import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuth } from "../../src/auth/AuthContext";
import { PostCard } from "../../src/components/PostCard";
import type { Post } from "../../src/types";

function parseAuthors(input: string): string[] | undefined {
  const cleaned = input
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  return cleaned.length ? cleaned : undefined;
}

export default function FeedScreen() {
  const { token, user, signOut } = useAuth();

  const [authorsInput, setAuthorsInput] = useState("");
  const [authorsInputTimeout, setAuthorsInputTimeout] = useState<number | null>(
    null,
  );
  const authors = parseAuthors(authorsInput);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAuthorsInput = (text: string) => {
    // TODO: handle author filter input with debouncing using authorsInputTimeout
  };

  async function loadFeed() {
    // TODO: ensure token exists, get feed and set posts, and handle loading and errors
  }

  useEffect(() => {
    loadFeed();
    // reload when filter changes
  }, [authorsInput]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10 }}>Loading feed…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 12, gap: 10 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: "600" }}>
          Logged in as: {user?.username}
        </Text>

        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable
            onPress={() => router.push("/(app)/create-post")}
            style={{
              backgroundColor: "#111",
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              + New Post
            </Text>
          </Pressable>

          <Pressable
            onPress={() => signOut()}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text>Logout</Text>
          </Pressable>
        </View>

        <View style={{ gap: 6 }}>
          <Text>Filter authors (comma-separated, optional)</Text>
          <TextInput
            value={authorsInput}
            onChangeText={handleAuthorsInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="e.g. alex,sam"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 10,
            }}
          />
          <Pressable
            onPress={() => loadFeed()}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              paddingVertical: 10,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text>Reload</Text>
          </Pressable>
        </View>

        {error ? <Text style={{ color: "crimson" }}>{error}</Text> : null}
      </View>

      <FlatList
        data={posts}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ gap: 10, paddingBottom: 30 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => loadFeed()} />
        }
        renderItem={({ item }) => (
          <PostCard post={item} onAfterComment={() => loadFeed()} />
        )}
        ListEmptyComponent={<Text>No posts yet.</Text>}
      />
    </View>
  );
}
