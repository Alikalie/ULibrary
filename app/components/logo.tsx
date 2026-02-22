import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

const FULL = "ULibrary";

export default function Logo() {
  const [index, setIndex] = useState(0);
  const scale = useRef(new Animated.Value(0.95)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const blink = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // entrance animation
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    // typing effect
    const t = setInterval(() => {
      setIndex((i) => {
        if (i >= FULL.length) {
          clearInterval(t);
          return i;
        }
        return i + 1;
      });
    }, 120);

    // blinking cursor
    Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(blink, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();

    return () => clearInterval(t);
  }, []);

  const showU = index >= 1 ? FULL.charAt(0) : "";
  const showLibrary = index >= 2 ? FULL.slice(1, index) : "";

  return (
    <View style={styles.wrapper} pointerEvents="none">
      <Animated.View style={[styles.inner, { transform: [{ scale }], opacity }]}>
        <Text style={styles.base} selectable={false}>
          <Text style={styles.u}>{showU}</Text>
          <Text style={styles.library}>{showLibrary}</Text>
          <Animated.Text style={[styles.cursor, { opacity: blink }]}>|</Animated.Text>
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { justifyContent: "center", alignItems: "center" },
  inner: { alignItems: "center" },
  base: { fontSize: 44, fontWeight: "800", letterSpacing: 0.5 },
  u: { color: "#0033AA" },
  library: { color: "#000000" },
  cursor: { color: "#000000", marginLeft: 4, fontWeight: "800" },
});
