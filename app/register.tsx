import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirm?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(email.trim())) e.email = "Enter a valid email.";
    if (password.length < 8) e.password = "Password must be at least 8 characters.";
    if (!/[0-9]/.test(password) || !/[A-Za-z]/.test(password))
      e.password = (e.password ? e.password + " " : "") + "Use letters and numbers.";
    if (password !== confirm) e.confirm = "Passwords do not match.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = () => {
    if (!validate()) return;
    // Simulate secure client-side handling: do not log passwords, clear from memory quickly.
    // In a real app: send to backend over TLS, use proper password hashing on server.
    setTimeout(() => {
      setPassword("");
      setConfirm("");
      Alert.alert("Success", "Account created. Please sign in.", [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    }, 250);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(t) => setEmail(t)}
        textContentType="username"
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textContentType="newPassword"
      />
      {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

      <TextInput
        style={[styles.input, errors.confirm && styles.inputError]}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
        textContentType="password"
      />
      {errors.confirm ? <Text style={styles.error}>{errors.confirm}</Text> : null}

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={styles.backLink}>
        <Text style={styles.backText}>Back to Sign In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 16 },
  input: {
    width: "100%",
    maxWidth: 420,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  inputError: { borderColor: "#cc3333" },
  error: { color: "#cc3333", alignSelf: "flex-start", marginBottom: 8, maxWidth: 420 },
  button: { backgroundColor: "#0033AA", padding: 14, borderRadius: 8, marginTop: 8, width: "100%", maxWidth: 420, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700" },
  backLink: { marginTop: 12 },
  backText: { color: "#0066cc" },
});

