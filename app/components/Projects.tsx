import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView
} from "react-native";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import projects from "../data/projects";
import useResponsive from "../hooks/useResponsive";

export default function Projects(){

  const { isSmallScreen, isMediumScreen } = useResponsive();
  const numColumns = isSmallScreen ? 1 : isMediumScreen ? 2 : 3;

  const openLink = (url:string) => Linking.openURL(url);

  return(
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.grid}>
        {projects.map((p,i)=>(
          <View
            key={i}
            style={[
              styles.card,
              { width: numColumns === 1 ? "100%" : numColumns === 2 ? "48%" : "31%" }
            ]}
          >

            <Image source={p.image} style={styles.image}/>

            <Text style={styles.title}>{p.title}</Text>

            <Text style={styles.desc}>{p.desc}</Text>

            <View style={styles.btnRow}>

              {p.github &&
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={()=>openLink(p.github)}
              >
                <FontAwesome name="github" size={20} color="white" />
              </TouchableOpacity>}

              {p.website &&
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={()=>openLink(p.website)}
              >
                <MaterialIcons name="language" size={22} color="#7dd3fc" />
              </TouchableOpacity>}

            </View>

          </View>
        ))}
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container:{
    padding:30,
    paddingHorizontal:100,
    paddingBottom:80
  },

  heading:{
    fontSize:30,
    fontWeight:"bold",
    color:"white",
    marginBottom:30
  },

  grid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between"
  },

  card:{
    marginBottom:24,
    borderRadius:20,
    padding:16,

    backgroundColor:"rgba(255,255,255,0.08)",

    borderWidth:1,
    borderColor:"rgba(255,255,255,0.2)",

    shadowColor:"#000",
    shadowOpacity:0.3,
    shadowRadius:20,
    shadowOffset:{width:0,height:10},

    elevation:10
  },

  image:{
    width:"100%",
    height:180,
    borderRadius:14,
    marginBottom:14
  },

  title:{
    fontWeight:"700",
    fontSize:17,
    color:"white",
    marginBottom:6
  },

  desc:{
    fontSize:14,
    color:"#d1d1d1",
    lineHeight:20,
    marginBottom:14
  },

  btnRow:{
    flexDirection:"row",
    gap:12
  },

  iconBtn:{
    padding:10,
    borderRadius:10,

    backgroundColor:"rgba(255,255,255,0.1)",

    borderWidth:1,
    borderColor:"rgba(255,255,255,0.2)"
  }

});