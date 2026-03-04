import { useWindowDimensions } from "react-native";

export default function useResponsive() {
  const { width } = useWindowDimensions();

  const isSmallScreen = width < 600;
  const isMediumScreen = width >= 600 && width < 1024;
  const isLargeScreen = width >= 1024;

  return {
    width,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
  };
}
