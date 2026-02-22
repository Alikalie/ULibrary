import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import Logo from "./components/logo";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Logo onComplete={() => router.replace("/login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
});
