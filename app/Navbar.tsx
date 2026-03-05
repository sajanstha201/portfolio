import React, { useRef, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform, Linking } from "react-native";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { BlurView } from "expo-blur";

export const Navbar = ({ setSection, activeSection, breakpoint }) => {

  const items = ["Experience", "Projects", "Skills", "Achievements"];

  /* icon mapping for small screens */
  const icons = {
    Experience: "briefcase-outline",
    Projects: "code-slash-outline",
    Skills: "construct-outline",
    Achievements: "trophy-outline",
  };

  const isSM = breakpoint === "sm";

  const translateX = useRef(new Animated.Value(0)).current;
  const sliderWidth = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const [layouts, setLayouts] = useState([]);

  const handleLayout = (index, e) => {
    const { x, width } = e.nativeEvent.layout;

    setLayouts((prev) => {
      const updated = [...prev];
      updated[index] = { x, width };
      return updated;
    });
  };

  const handlePress = (item) => {
    setSection(item);
  };

  useEffect(() => {
    const index = items.indexOf(activeSection);

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

  const downloadResume = () => {
    if (Platform.OS === "web") {
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Sajan_Shrestha_Resume.pdf";
      link.click();
    } else {
      Linking.openURL("https://yourwebsite.com/resume.pdf");
    }
  };

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
                {isSM ? (
                  <Ionicons
                    name={icons[item]}
                    size={20}
                    color={activeSection === item ? "#00E5FF" : "white"}
                  />
                ) : (
                  <Text style={styles.link}>{item}</Text>
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </BlurView>
          {/* Resume Button */}
      {!isSM&&<Pressable   style={[
              styles.downloadButton
            ]} onPress={downloadResume}>
        <Ionicons name="download-outline" size={18} color="#00E5FF" />
        <Text style={styles.downloadText}>Resume</Text>
      </Pressable>}

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
    justifyContent: "center",
    alignItems: "center",
  },

  link: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },

  downloadButton: {
    position:"absolute",
    right: 30,
    top: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 30,

    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(0,229,255,0.5)",

    shadowColor: "#00E5FF",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },

    elevation: 10,
  },

  downloadText: {
    color: "#00E5FF",
    fontWeight: "600",
    fontSize: 14,
  },
});