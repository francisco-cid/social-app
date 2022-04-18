import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const genders = {
  woman: "Women",
  man: "Men",
  transw: "Trans women",
  transm: "Trans men",
  nonbin: "Nonbinary",
};
const months = [
  "Jan.",
  "Feb.",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec.",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const bodyTypes = {
  thin: "Thin",
  avg: "Average",
  athletic: "Athletic",
  toned: "Toned",
  muscular: "Muscular",
  curvy: "Curvy",
  thick: "Thick",
  plus: "Plus-size",
};

export function GroupText1(props) {
  const group = props.group;
  const meetingDate = new Date(group.time);
  const meetingDateText =
    days[meetingDate.getDay()] +
    ", " +
    months[meetingDate.getMonth()] +
    " " +
    meetingDate.getDate() +
    ", " +
    meetingDate.getFullYear();
  const meetingTimeText =
    ((meetingDate.getHours() + 11) % 12) +
    1 +
    ":" +
    String(meetingDate.getMinutes()).padStart(2, "0") +
    " " +
    (meetingDate.getHours() < 12 ? "AM" : "PM");

  return (
    <View>
      <View style={{ margin: 10, flexDirection: "row" }}>
        <View>
          {props.joined && (
            <TouchableOpacity style={styles.memberContainer}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Montserrat_700Bold",
                  fontSize: 14,
                  color: "white",
                }}
              >
                Member
              </Text>
            </TouchableOpacity>
          )}
          <Text>
            <Text
              style={{ fontFamily: "Montserrat_600SemiBold", fontSize: 36 }}
            >
              {group.group_name}
            </Text>
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat_500Medium",
              fontSize: 18,
              color: "#2958FF",
            }}
          >
            {/* { group.city } TODO location */}
            Washington, DC
          </Text>
        </View>
        <AntDesign
          name="hearto"
          size={24}
          color="black"
          style={{ position: "absolute", right: 0 }}
        />
      </View>

      <View style={styles.blueLine} />
      <View style={styles.blueLine} />
      <View style={styles.blueLine} />

      <View style={{ margin: 10, flexDirection: "row" }}>
        <AntDesign
          name="clockcircleo"
          size={18}
          color="black"
          style={{ margin: 5 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={[styles.boldText, styles.blackText]}>
            {meetingDateText}
          </Text>
          <Text style={styles.regularText}>{meetingTimeText}</Text>
        </View>
      </View>

      <View
        style={{ marginHorizontal: 10, marginBottom: 10, flexDirection: "row" }}
      >
        <Ionicons
          name="location-sharp"
          size={24}
          color="black"
          style={{ margin: 2 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={[styles.boldText, styles.blackText]}>
            {/* { group.location_name } TODO location */}
            Location Name
          </Text>
          <Text style={styles.regularText}>
            {/* { group.address_line1 } */}
            1234 Street St
          </Text>
          <Text style={styles.regularText}>
            {/* { group.address_line2 } */}
            Also Address Optional, ST 09876
          </Text>
        </View>
      </View>

      <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
        <View style={styles.grayLine} />
      </View>
    </View>
  );
}

export function GroupText2(props) {
  const group = props.group;
  var groupGenders = [];
  var groupBodies = [];

  for (let i = 0; i < group.gender_pref.length - 1; i++) {
    groupGenders.push(<Text key={i}>{genders[group.gender_pref[i]]}, </Text>);
  }
  groupGenders.push(
    <Text key={group.gender_pref.length - 1}>
      {genders[group.gender_pref[group.gender_pref.length - 1]]}
    </Text>
  );
  for (let i = 0; i < group.body_pref.length - 1; i++) {
    groupBodies.push(<Text key={i}>{bodyTypes[group.body_pref[i]]}, </Text>);
  }
  if (group.body_pref.length > 0) {
    groupBodies.push(
      <Text key={group.body_pref.length - 1}>
        {bodyTypes[group.body_pref[group.body_pref.length - 1]]}
      </Text>
    );
  }

  return (
    <View>
      <View style={{ margin: 10, marginTop: 20 }}>
        <Text style={styles.regularText}>{group.group_desc}</Text>
        <View style={styles.grayLine} />
        <Text style={styles.boldText}>Genders</Text>
        <Text style={styles.regularText}>{groupGenders}</Text>
        <View style={styles.grayLine} />
        <Text style={styles.boldText}>Body types</Text>
        <Text style={styles.regularText}>{groupBodies}</Text>
        <View style={styles.grayLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blueLine: {
    borderBottomColor: "#2958FF",
    borderBottomWidth: 1,
    marginBottom: 3,
  },
  grayLine: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    alignSelf: "stretch",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 9,
    width: windowWidth / 3,
    // Gets rid of shadow on Android
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    alignSelf: "center",
  },
  regularText: {
    fontFamily: "Montserrat_400Regular",
    color: "#727272",
    fontSize: 16,
  },
  boldText: {
    fontFamily: "Montserrat_600SemiBold",
    color: "#727272",
    fontSize: 16,
  },
  blackText: {
    color: "black",
  },
  memberContainer: {
    backgroundColor: "#2958FF",
    borderRadius: 15,
    paddingVertical: 3,
    width: 80,
    // Gets rid of shadow on Android
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
});
