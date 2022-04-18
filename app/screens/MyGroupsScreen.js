import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import ScatteredImages from "../components/ScatteredImages";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
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

function MyGroupsScreen(props) {
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    axios
      .get("/api/users/" + props.route.params.userID + "/groups")
      .then((response) => {
        setGroups(response.data.groups);
      }); // TODO error check
  }, []);

  if (!groups) return null;

  function renderGroup(group) {
    // TODO time zone stuff
    // TODO sort groups by date
    const meetingDate = new Date(group.time);
    const meetingDateText =
      months[meetingDate.getMonth()] + " " + meetingDate.getDate();
    const meetingTimeText =
      ((meetingDate.getHours() + 11) % 12) +
      1 +
      ":" +
      String(meetingDate.getMinutes()).padStart(2, "0") +
      " " +
      (meetingDate.getHours() < 12 ? "AM" : "PM");

    var thumbnailPhotos = [];
    var numThumbnails = group.size >= 5 ? 5 : group.size;
    for (let i = 0; i < numThumbnails; i++) {
      thumbnailPhotos.push(group.users[i].avatar_photo);
    }

    return (
      <View>
        <TouchableOpacity
          // TODO connect to group screen
          onPress={() => props.navigation.navigate("GroupJoined", { group })}
        >
          <View style={styles.groupContainer}>
            <View>
              <ScatteredImages photos={thumbnailPhotos} />
            </View>
            <View style={{ marginLeft: 92 }}>
              <Text
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode={"tail"}
              >
                {group.group_name}
              </Text>
              <Text style={styles.time}>
                {meetingDateText} at {meetingTimeText}
              </Text>
              <Text style={styles.location}>The City, ST</Text>
            </View>
            <View style={styles.membersCircle}>
              <Text style={styles.groupSize}>
                {group.size} / {group.max_size}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={groups}
        renderItem={({ item }) => renderGroup(item)}
        keyExtractor={(item, index) => index.toString()}
        style={{ paddingVertical: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    alignSelf: "stretch",
  },
  groupContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginVertical: 5,
    marginLeft: windowWidth * 0.04,
    width: windowWidth * 0.92,
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.15,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
  },
  time: {
    color: "#2958FF",
    fontSize: 15,
    fontFamily: "Montserrat_400Regular",
  },
  location: {
    color: "#727272",
    fontSize: 15,
    fontFamily: "Montserrat_400Regular",
  },
  membersCircle: {
    alignSelf: "flex-start",
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: "#2958FF",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  groupSize: {
    color: "white",
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default MyGroupsScreen;
