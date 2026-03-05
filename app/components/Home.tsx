import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import Education from "./Education";
import Contact from "./Contact";
import useResponsive from "../hooks/useResponsive";
import { Platform, Linking } from "react-native";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home({breakpoint}) {
  const { isLargeScreen } = useResponsive();
  const isSM = breakpoint === "sm";
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <Image
        source={require("../assets/profile.png")}
        style={styles.image}
      />

      <Text style={styles.name}>Sajan Shrestha</Text>

      <Text style={styles.role}>Full-Stack AI Developer</Text>
      {isSM&&<Pressable   style={[
              styles.downloadButton,
              isSM ?{ position: "relative", alignSelf:"center", justifyContent:"center", top:0, left:0}:{position:"absolute"}
            ]} onPress={downloadResume}>
        <Ionicons name="download-outline" size={18} color="#00E5FF" />
        <Text style={styles.downloadText}>Resume</Text>
      </Pressable>}
      <Text
        style={[
          styles.aboutText,
          { paddingHorizontal: isLargeScreen ? 140 : 25 }
        ]}
      >
        Hi, I’m Sajan Shrestha, a Full-Stack AI Developer who builds scalable
        web applications and intelligent data-driven solutions. I specialize in
        combining modern frontend technologies, robust backend systems,
        cloud platforms, and AI to create reliable digital products that
        solve real-world problems.
      </Text>

      <Education breakpoint={breakpoint}/>

      <Contact />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1
  },

  content:{
    alignItems:"center",
    paddingTop:20,
    paddingBottom:50
  },

  image:{
    width:140,
    height:140,
    borderRadius:70,
    marginBottom:20,
    borderWidth:2,
    borderColor:"#444"
  },

  name:{
    fontSize:36,
    fontWeight:"700",
    color:"white",
    marginBottom:6
  },

  role:{
    fontSize:18,
    color:"#7dd3fc",
    marginBottom:20
  },

  aboutText:{
    fontSize:16,
    lineHeight:26,
    textAlign:"center",
    color:"white",
    maxWidth:850,
    opacity:0.9
  },
   downloadButton: {
    position: "relative",
    alignSelf:"center", 
    justifyContent:"center", 
    top:0, left:0,
    margin:20,
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