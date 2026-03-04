import React from "react";
import { View, Text, Linking, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import contacts from "../data/contacts";
import useResponsive from "../hooks/useResponsive";

export default function Contact(){

  const { isLargeScreen } = useResponsive();

  return(

    <View style={styles.container}>

      <View
        style={[
          styles.links,
          { flexDirection: isLargeScreen ? "row" : "column" }
        ]}
      >

        {contacts.map((c,i)=>(
          <Pressable
            key={i}
            onPress={()=>Linking.openURL(c.link)}
            style={styles.row}
          >

            <Ionicons
              name={c.icon}
              size={22}
              color={c.iconColor}
            />

            <Text style={styles.text}>
              {c.name}
            </Text>

          </Pressable>
        ))}

      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    alignItems:"center"
  },

  title:{
    fontSize:24,
    fontWeight:"700",
    color:"white",
    marginBottom:15
  },

  links:{
    alignItems:"center",
    justifyContent:"center"
  },

  row:{
    flexDirection:"row",
    alignItems:"center",
    margin:8
  },

  text:{
    marginLeft:10,
    fontSize:16,
    color:"white"
  }

});