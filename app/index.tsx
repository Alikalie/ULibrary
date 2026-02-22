import { View, StyleSheet } from "react-native";
import Logo from "./components/logo";

export default function Index() {
  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
});
