import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Education() {
  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.degree}>
          Bachelor in Computer Science & Engineering
        </Text>

        <Text style={styles.school}>
          Manipal Institute of Technology, Bangalore, India
        </Text>

        <Text style={styles.grade}>CGPA: 9.7 / 10</Text>

        <Text style={styles.year}>2022 — 2026</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.degree}>
          Higher Secondary (+2)
        </Text>

        <Text style={styles.school}>
          St. Lawrence Secondary School, Kathmandu, Nepal
        </Text>

        <Text style={styles.grade}>Grade: 3.88 / 4</Text>

        <Text style={styles.year}>2020 — 2022</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    paddingVertical:40,
    paddingHorizontal:100,
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between",
    width:"100%",
    alignItems:"center"
  },

  title:{
    fontSize:26,
    fontWeight:"700",
    color:"white",
    marginBottom:20
  },

  card:{
    flex:1,
    maxWidth:700,

    backgroundColor:"rgba(255,255,255,0.08)",
    borderRadius:16,
    padding:20,
    marginBottom:15,

    borderColor:"rgba(255,255,255,0.15)"
  },

  degree:{
    fontSize:18,
    fontWeight:"600",
    color:"white",
    marginBottom:6
  },

  school:{
    fontSize:16,
    color:"#cbd5f5",
    marginBottom:6
  },

  grade:{
    fontSize:15,
    color:"#a5f3fc"
  },

  year:{
    fontSize:14,
    color:"#94a3b8",
    marginTop:4
  }

});