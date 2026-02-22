import React, { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Logo from "./logo";

type Props = {
  onSubmit?: (values: { email: string; password: string; remember: boolean }) => void;
  onRegister?: () => void;
};

export default function Login({ onSubmit, onRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const InputField = ({
    iconName,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
  }: any) => {
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
      <View style={styles.logoWrapper}>
        <Logo />
      </View>
      <Text style={styles.title}>Sign In</Text>

      <InputField
        iconName="email"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <InputField
        iconName="lock"
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
  container: { padding: 24, width: "100%", maxWidth: 500 },
  logoWrapper: { alignItems: "center", marginBottom: 12, marginTop: -16 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 12 },
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
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  rememberRow: { flexDirection: "row", alignItems: "center" },
  rememberText: { marginLeft: 8 },
  register: { color: "#0066cc", fontWeight: "600" },
  button: { backgroundColor: "#0033AA", padding: 14, borderRadius: 8, alignItems: "center", width: "100%", maxWidth: 500 },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: "#fff", fontWeight: "700" },
});
