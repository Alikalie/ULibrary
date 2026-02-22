import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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

  const InputField = ({ iconName, placeholder, value, onChangeText, secureTextEntry, keyboardType, autoCapitalize }: any) => {
    const [focused, setFocused] = useState(false);
    return (
      <View style={styles.inputContainer}>
        <View
          style={[
            styles.inputWrap,
            focused && styles.inputWrapFocused,
          ]}
        >
          <MaterialIcons
            name={iconName}
            size={20}
            color={focused ? "#0033AA" : "#666"}
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderTextColor="#aaa"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>

      <InputField
        iconName="email"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(t: string) => setEmail(t)}
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <InputField
        iconName="lock"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

      <InputField
        iconName="lock"
        placeholder="Confirm Password"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />
      {errors.confirm ? <Text style={styles.error}>{errors.confirm}</Text> : null}

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>

      <View style={styles.signInRow}>
        <Text style={styles.signInText}>Already have an account? </Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.signInLink}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, width: "100%", maxWidth: 500 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 16 },
  inputContainer: { marginBottom: 12, height: 48, width: "100%", maxWidth: 500 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0033AA",
    paddingHorizontal: 12,
    borderRadius: 8,
    height: "100%",
    width: "100%",
  },
  inputWrapFocused: { borderColor: "#0033AA" },
  input: { flex: 1, paddingVertical: 0, fontSize: 14 },
  error: { color: "#cc3333", alignSelf: "flex-start", marginBottom: 8, maxWidth: 500 },
  button: { backgroundColor: "#0033AA", padding: 14, borderRadius: 8, marginTop: 12, width: "100%", maxWidth: 500, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700" },
  signInRow: { marginTop: 16, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  signInText: { color: "#666", fontSize: 14 },
  signInLink: { color: "#0033AA", fontWeight: "700", fontSize: 14 }
});

