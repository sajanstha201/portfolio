import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export function useBreakpoint() {
  const getBreakpoint = (width) => {
    if (width < 1024) return "sm";
    if (width < 1024) return "md";
    return "lg";
  };

  const [screen, setScreen] = useState(() => {
    const { width } = Dimensions.get("window");
    return {
      width,
      breakpoint: getBreakpoint(width),
    };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreen({
        width: window.width,
        breakpoint: getBreakpoint(window.width),
      });
    });

    return () => subscription?.remove();
  }, []);

  return screen;
}