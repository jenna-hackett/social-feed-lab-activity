import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import type { Post } from "../types";

function formatTime(ms: number) {
  const d = new Date(ms);
  return d.toLocaleString();
}

export function PostCard({
  post,
  onAfterComment,
}: {
  post: Post;
  onAfterComment: () => void;
}) {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitComment() {
    // TODO: grab and clean text, create the comment, call onAfterComment + extra nice details (isSubmitting logic, error handling)
  }

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        padding: 12,
        gap: 10,
      }}
    >
      <View style={{ gap: 4 }}>
        <Text style={{ fontWeight: "700" }}>{post.author}</Text>
        <Text>{post.text}</Text>
        <Text style={{ color: "#666", fontSize: 12 }}>
          {formatTime(post.createdAt)}
        </Text>
      </View>

      <View style={{ gap: 6 }}>
        <Text style={{ fontWeight: "600" }}>
          Comments ({post.commentCount})
        </Text>

        {post.comments.map((c) => (
          <View
            key={c.id}
            style={{
              paddingLeft: 10,
              borderLeftWidth: 2,
              borderLeftColor: "#eee",
            }}
          >
            <Text style={{ fontWeight: "600" }}>{c.author}</Text>
            <Text>{c.text}</Text>
            <Text style={{ color: "#666", fontSize: 12 }}>
              {formatTime(c.createdAt)}
            </Text>
          </View>
        ))}

        <View style={{ gap: 6 }}>
          <TextInput
            value={commentText}
            onChangeText={setCommentText}
            placeholder="write a comment…"
            multiline
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 10,
              minHeight: 44,
              textAlignVertical: "top",
            }}
          />

          {error ? <Text style={{ color: "crimson" }}>{error}</Text> : null}

          <Pressable
            onPress={submitComment}
            disabled={isSubmitting}
            style={{
              backgroundColor: isSubmitting ? "#999" : "#111",
              paddingVertical: 10,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={{ color: "white", fontWeight: "600" }}>Comment</Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
