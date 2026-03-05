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

  /* breakpoint detection */
  const getBreakpoint = (w) => {
    if (w < 640) return "sm";
    if (w < 1024) return "md";
    return "lg";
  };

  const breakpoint = getBreakpoint(width);

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

        {/* pass breakpoint to navbar */}
        <Navbar
          setSection={setSection}
          activeSection={section}
          breakpoint={breakpoint}
        />

        {/* Prevent rendering before width is known */}
        {width > 0 && (
          <View style={{ flex: 1 }}>
            <Animated.View
              style={{
                flex: 1,
                flexDirection: "row",
                width: width * sections.length,
                transform: [{ translateX }],
              }}
            >
              <View style={{ width, flex: 1 }}>
                <Home breakpoint={breakpoint} />
              </View>

              <View style={{ width, flex: 1 }}>
                <Experience breakpoint={breakpoint} />
              </View>

              <View style={{ width, flex: 1 }}>
                <Projects breakpoint={breakpoint} />
              </View>

              <View style={{ width, flex: 1 }}>
                <Skills breakpoint={breakpoint} />
              </View>

              <View style={{ width, flex: 1 }}>
                <Achievements breakpoint={breakpoint} />
              </View>
            </Animated.View>
          </View>
        )}
      </BlurView>
    </View>
  );
}