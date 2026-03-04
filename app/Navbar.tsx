import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  Animated,
  LayoutChangeEvent,
} from "react-native";
import { BlurView } from "expo-blur";

type NavbarProps = {
  setSection: (section: string) => void;
  activeSection: string;
};

export const Navbar = ({ setSection, activeSection }: NavbarProps) => {
  const items = ["Experience", "Projects", "Skills", "Achievements"];

  const translateX = useRef(new Animated.Value(0)).current;
  const sliderWidth = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const [layouts, setLayouts] = useState<{ x: number; width: number }[]>([]);

  const handleLayout = (index: number, e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;

    setLayouts((prev) => {
      const updated = [...prev];
      updated[index] = { x, width };
      return updated;
    });
  };

  const handlePress = (item: string) => {
    setSection(item);
  };

  // Move highlight when section changes
  useEffect(() => {
    const index = items.indexOf(activeSection);

    // Hide highlight if section not in navbar
    if (index === -1) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(sliderWidth, {
          toValue: 0,
          duration: 120,
          useNativeDriver: false,
        }),
      ]).start();
      return;
    }

    const layout = layouts[index];
    if (!layout) return;

    Animated.parallel([
      Animated.spring(translateX, {
        toValue: layout.x,
        useNativeDriver: true,
      }),
      Animated.spring(sliderWidth, {
        toValue: layout.width,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [activeSection, layouts]);

  return (
    <View style={styles.navbar}>
      <BlurView intensity={70} tint="dark" style={styles.innerNav}>
        
        {/* Profile */}
        <Pressable onPress={() => setSection("Hero")}>
          <Image
            source={require("./assets/profile.png")}
            style={styles.profileImage}
          />
        </Pressable>

        <View style={styles.linksWrapper}>
          
          {/* Animated highlight */}
          <Animated.View
            style={[
              styles.slider,
              {
                transform: [{ translateX }],
                width: sliderWidth,
                opacity: opacity,
              },
            ]}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {items.map((item, i) => (
              <Pressable
                key={i}
                onPress={() => handlePress(item)}
                onLayout={(e) => handleLayout(i, e)}
                style={styles.linkContainer}
              >
                <Text style={styles.link}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    paddingTop: 50,
    alignItems: "center",
  },

  innerNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
    paddingHorizontal: 30,
    paddingVertical: 12,
    marginBottom: 20,
    borderRadius: 50,

    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },

    elevation: 12,
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  linksWrapper: {
    justifyContent: "center",
  },

  slider: {
    position: "absolute",
    height: 36,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 100,
    top: 0,
    left: 0,
  },

  linkContainer: {
    paddingHorizontal: 18,
    paddingVertical: 8,
  },

  link: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});