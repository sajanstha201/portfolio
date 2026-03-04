import React from "react";
import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import useResponsive from "../hooks/useResponsive";
import publications from "../data/publications";
import certificates from "../data/certificates";

export default function Achievements() {

  const { isSmallScreen, isMediumScreen } = useResponsive();
  const columns = isSmallScreen ? 1 : isMediumScreen ? 2 : 3;

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  /* ---------------- BOOKS ---------------- */

const renderBooks = () => (
  <View style={styles.section}>

    {publications.map((item, i) => (
      <View key={i} style={styles.bookCard}>

        <Image source={item.image} style={styles.bookImage} />

        <View style={styles.bookContent}>

          {/* Title + open icon */}
          <View style={styles.titleRow}>
            <Text style={styles.bookTitle}>{item.title}</Text>

            <TouchableOpacity onPress={() => openLink(item.link)}>
              <Ionicons name="open-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Publisher */}
          <Text style={styles.publisherText}>
            Publisher: {item.publisher}
          </Text>

          {/* Date */}
          <Text style={styles.dateText}>
            Published: {item.published_date}
          </Text>

          {/* Website Link */}
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => openLink(item.link)}
          >
            <Ionicons name="link-outline" size={16} color="#7dd3fc" />
            <Text style={styles.linkText}>View Publication</Text>
          </TouchableOpacity>

        </View>

      </View>
    ))}
  </View>
);

  /* ---------------- CERTIFICATES ---------------- */

const renderCertificates = () => {

  const scrollRef = React.useRef(null);
  const scrollX = React.useRef(0);
  const lastClick = React.useRef(0);

  const CARD_WIDTH = 246; // card width + margin

  const scroll = (direction) => {

    const now = Date.now();
    const diff = now - lastClick.current;

    // if clicks are fast → scroll more cards
    const multiplier = diff < 200 ? 3 : diff < 400 ? 2 : 1;

    const move = CARD_WIDTH * multiplier;

    const newX =
      direction === "right"
        ? scrollX.current + move
        : scrollX.current - move;

    scrollRef.current?.scrollTo({
      x: Math.max(newX, 0),
      animated: true,
    });

    scrollX.current = Math.max(newX, 0);
    lastClick.current = now;
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Certificates: {certificates.length}</Text>

      <View style={styles.certContainer}>

        {/* LEFT ARROW */}
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => scroll("left")}
        >
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.certScroll}
          onScroll={(e) => {
            scrollX.current = e.nativeEvent.contentOffset.x;
          }}
          scrollEventThrottle={16}
        >
          {certificates.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.certificateCard}
              onPress={() => openLink(item.link)}
            >
              <Image source={item.image} style={styles.certImage} />

              <View style={styles.certTitleRow}>
                <Text style={styles.certTitle}>{item.title}</Text>
                <Ionicons name="open-outline" size={18} color="white" />
              </View>

            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* RIGHT ARROW */}
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => scroll("right")}
        >
          <Ionicons name="chevron-forward" size={28} color="white" />
        </TouchableOpacity>

      </View>
    </View>
  );
};
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {renderBooks()}
      {renderCertificates()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 30,
    paddingBottom: 80,
    paddingHorizontal: 100,
  },

  section: {
    marginBottom: 60,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 26,
    color: "white",
  },

  /* ---------- BOOK CARDS ---------- */

  bookCard: {
    flexDirection: "row",
    alignItems: "center",

    padding: 18,
    borderRadius: 20,
    marginBottom: 18,

    backgroundColor: "rgba(255,255,255,0.08)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },

    elevation: 10,
  },

  bookImage: {
    width: 90,
    height: 120,
    borderRadius: 12,
    marginRight: 20,
  },

  bookContent: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bookTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
    flex: 1,
    marginRight: 10,
  },
  publisherText: {
  fontSize: 14,
  color: "rgba(255,255,255,0.85)",
  marginTop: 6,
},

dateText: {
  fontSize: 13,
  color: "rgba(255,255,255,0.6)",
  marginTop: 2,
},

linkRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 8,
},

linkText: {
  marginLeft: 6,
  color: "#7dd3fc",
  fontSize: 14,
  fontWeight: "500",
},

  /* ---------- CERTIFICATE GRID ---------- */

certContainer:{
  flexDirection:"row",
  alignItems:"center"
},

arrowButton:{
  padding:8,
  backgroundColor:"rgba(255,255,255,0.08)",
  borderRadius:50,
  marginHorizontal:6
},

certScroll:{
  paddingRight:20
},

certificateCard:{
  width:230,
  padding:14,
  borderRadius:20,
  marginRight:16,

  backgroundColor:"rgba(255,255,255,0.08)",

  borderWidth:1,
  borderColor:"rgba(255,255,255,0.2)",

  shadowColor:"#000",
  shadowOpacity:0.25,
  shadowRadius:20,
  shadowOffset:{ width:0, height:10 },

  elevation:10,
},

certImage:{
  width:"100%",
  height:140,
  borderRadius:14,
  marginBottom:12
},

certTitleRow:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center"
},

certTitle:{
  fontSize:14,
  fontWeight:"600",
  color:"white",
  flex:1,
  marginRight:8
}

});