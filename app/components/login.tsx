import React, { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import Logo from "./logo";

type Props = {
  onSubmit?: (values: { email: string; password: string; remember: boolean }) => void;
  onRegister?: () => void;
};

export default function Login({ onSubmit, onRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Logo />
      </View>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.row}>
        <View style={styles.rememberRow}>
          <Switch value={remember} onValueChange={setRemember} />
          <Text style={styles.rememberText}>Remember me</Text>
        </View>
        <Pressable onPress={onRegister}>
          <Text style={styles.register}>Register</Text>
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => onSubmit && onSubmit({ email, password, remember })}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, width: "100%", maxWidth: 420 },
  logoWrapper: { alignItems: "center", marginBottom: 12 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  rememberRow: { flexDirection: "row", alignItems: "center" },
  rememberText: { marginLeft: 8 },
  register: { color: "#0066cc", fontWeight: "600" },
  button: { backgroundColor: "#0033AA", padding: 14, borderRadius: 8, alignItems: "center" },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: "#fff", fontWeight: "700" },
});
