import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import experience from "../data/experience";

export default function Experience() {
  return (
    <View style={styles.container}>

      <View style={styles.timeline}>
        {experience.map((e, i) => (
          <View key={i} style={styles.timelineItem}>

            {/* Timeline column */}
            <View style={styles.timelineColumn}>
              <View style={styles.dot} />
              {<View style={styles.line} />}
            </View>

            {/* Content */}
            <View style={styles.card}>

              <View style={styles.header}>
                <Image source={e.logo} style={styles.logo} />

                <View style={{ flex: 1 }}>
                  <Text style={styles.role}>{e.role}</Text>
                  <Text style={styles.company}>{e.company}</Text>
                </View>
              </View>

              <Text style={styles.meta}>
                {e.start} – {e.end} • {e.duration}
              </Text>

              <Text style={styles.location}>{e.location}</Text>

              <View style={styles.descContainer}>
                {e.desc.map((d, idx) => (
                  <Text key={idx} style={styles.desc}>
                    • {d}
                  </Text>
                ))}
              </View>

            </View>

          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 30,
    paddingHorizontal: 100
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30
  },

  timeline: {
    paddingLeft: 10
  },

  timelineItem: {
    flexDirection: "row",
    marginBottom: 40
  },

  timelineColumn: {
    alignItems: "center",
    marginRight: 20
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4f9cff",
    marginTop: 6
  },

  line: {
    width: 2,
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginTop: 4
  },

  card: {
    flex: 1
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6
  },

  logo: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 12
  },

  role: {
    fontSize: 18,
    fontWeight: "700",
    color: "white"
  },

  company: {
    fontSize: 15,
    color: "#d1d1d1"
  },

  meta: {
    fontSize: 13,
    color: "#a0a0a0",
    marginTop: 6
  },

  location: {
    fontSize: 13,
    color: "#a0a0a0",
    marginBottom: 8
  },

  descContainer: {
    marginTop: 6
  },

  desc: {
    fontSize: 14,
    color: "#e5e5e5",
    lineHeight: 22
  }

});