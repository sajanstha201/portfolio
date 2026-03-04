import React, { useState, useRef, useEffect } from "react";
import { View, Animated, Dimensions } from "react-native";
import { Navbar } from "./Navbar";
import { BlurView } from "expo-blur";

import Home from "./components/Home";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";

const { width } = Dimensions.get("window");

export default function App() {
  const sections = ["Hero", "Experience", "Projects", "Skills", "Achievements"];
  const [section, setSection] = useState("Hero");

  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const index = sections.indexOf(section);

    Animated.spring(translateX, {
      toValue: -index * width,
      useNativeDriver: true,
    }).start();
  }, [section]);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <BlurView intensity={100} tint="dark" style={{ flex: 1}}>

        {/* Navbar */}
        <Navbar setSection={setSection} activeSection={section} />

        {/* Sliding Pages */}
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              flexDirection: "row",
              width: width * sections.length,
              flex: 1,
              transform: [{ translateX }],
            }}
          >

            <View style={{ width, flex: 1}}>
              <Home />
            </View>

            <View style={{ width, flex: 1 }}>
              <Experience />
            </View>

            <View style={{ width, flex: 1 }}>
              <Projects />
            </View>

            <View style={{ width, flex: 1 }}>
              <Skills />
            </View>

            <View style={{ width, flex: 1 }}>
              <Achievements />
            </View>

          </Animated.View>
        </View>

      </BlurView>
    </View>
  );
}