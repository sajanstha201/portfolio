import React, { useState, useRef, useEffect } from "react";
import { View, Animated } from "react-native";
import { Navbar } from "./Navbar";
import { BlurView } from "expo-blur";

import Home from "./components/Home";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";

export default function Index() {
  const sections = ["Hero", "Experience", "Projects", "Skills", "Achievements"];
  const [section, setSection] = useState("Hero");
  const [width, setWidth] = useState(0);

  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!width) return;

    const index = sections.indexOf(section);

    Animated.spring(translateX, {
      toValue: -index * width,
      useNativeDriver: true,
    }).start();
  }, [section, width]);

  return (
    <View
      style={{ flex: 1, backgroundColor: "black" }}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <BlurView intensity={100} tint="dark" style={{ flex: 1 }}>
        <Navbar setSection={setSection} activeSection={section} />

        {/* Prevent rendering before width is known */}
        {width > 0 && (
          <View style={{ flex: 1, overflow: "hidden" }}>
            <Animated.View
              style={{
                flexDirection: "row",
                width: width * sections.length,
                transform: [{ translateX }],
              }}
            >
              <View style={{ width }}>
                <Home />
              </View>

              <View style={{ width }}>
                <Experience />
              </View>

              <View style={{ width }}>
                <Projects />
              </View>

              <View style={{ width }}>
                <Skills />
              </View>

              <View style={{ width }}>
                <Achievements />
              </View>
            </Animated.View>
          </View>
        )}
      </BlurView>
    </View>
  );
}