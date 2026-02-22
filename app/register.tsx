import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.note}>Registration page placeholder.</Text>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 8 },
  note: { color: "#666", marginBottom: 20 },
  back: { padding: 12, backgroundColor: "#0033AA", borderRadius: 8 },
  backText: { color: "#fff", fontWeight: "700" },
});
