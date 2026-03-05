import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import skills from "../data/skills";

export default function Skills({breakpoint}) {
  const isSM = (breakpoint === "sm");
  const renderCategory = (title, list) => (
    <View style={styles.categorySection}>

      <Text style={styles.categoryTitle}>{title}</Text>

      <View style={styles.grid}>
        {list.map((s, i) => (
          <View key={i} style={[styles.skillCard, isSM?{padding:10, margin:5}:{paddingVertical:16,paddingHorizontal:18,margin:8}]}>
            <FontAwesome5 name={s.icon} size={isSM?16:26} color="#0A66C2" />
            <Text style={[styles.skillName, isSM?{fontSize:10}:{fontSize:13}]}>{s.name}</Text>
          </View>
        ))}
      </View>

    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >

      {renderCategory("Frontend", skills.frontend)}
      {renderCategory("Backend", skills.backend)}
      {renderCategory("Cloud", skills.cloud)}
      {renderCategory("AI / ML", skills.ai_ml)}
      {renderCategory("Systems / Low Level", skills.systems)}
      {renderCategory("Algorithms", skills.algorithms)}
      {renderCategory("Security", skills.security)}
      {renderCategory("Tools", skills.tools)}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:24
  },

  categorySection:{
    marginBottom:28
  },

  categoryTitle:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:14,
    color:"#fff",
    textAlign:"center"
  },

  grid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"center"
  },

  skillCard:{
    backgroundColor:"#1a1a1a",
    borderRadius:14,
    alignItems:"center",
    minWidth:80,
    borderWidth:1,
    borderColor:"#2a2a2a"
  },

  skillName:{
    marginTop:8,
    color:"#fff",
    textAlign:"center"
  }

});