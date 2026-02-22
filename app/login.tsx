import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Login from "./components/login";

export default function LoginPage() {
  const router = useRouter();

  return (
    <View style={styles.page}>
      <Login
        onSubmit={() => {
          // placeholder: after successful auth, navigate to home or main
          router.replace("/");
        }}
        onRegister={() => router.push("/register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
});
