import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import CarouselPrivate from "../components/CarouselPrivate";
import FeedGrid from "../components/FeedGrid";
import { LinearGradient } from "expo-linear-gradient";
import { GroupText1, GroupText2 } from "../components/GroupText";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

function GroupJoinedScreen(props) {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    setGroup(props.route.params.group);
  }, []); // TODO error check

  if (!group) return null;

  const requestGroup = () =>
    Alert.alert(
      "Your group request has been made!",
      "Check “My Groups” to view the group’s response.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]
    );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["right", "left"]}>
      <ScrollView>
        <GroupText1 group={group} />

        <Text style={{ marginLeft: 10, marginBottom: 5 }}>
          <Text
            style={{
              fontFamily: "Montserrat_600SemiBold",
              color: "#2958FF",
              fontSize: 18,
            }}
          >
            Members
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat_400Regular",
              color: "#727272",
              fontSize: 18,
            }}
          >
            {" " + group.size + "/" + group.max_size}
          </Text>
        </Text>

        <View style={{ height: 170 }}>
          <FeedGrid group={group} />
        </View>

        <GroupText2 group={group} />

        <Text
          style={{
            marginLeft: 10,
            marginBottom: 5,
            fontFamily: "Montserrat_600SemiBold",
            color: "#2958FF",
            fontSize: 18,
          }}
        >
          Member Photos
        </Text>
        <View style={{ height: 520 }}>
          <View style={{ height: 500 }}>
            <CarouselPrivate photosList={group.user_photos} />
          </View>
        </View>
      </ScrollView>

      <LinearGradient
        // Background Linear Gradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        locations={[0.0, 0.99]}
        colors={["#2958FF", "#5DD1B5"]}
        style={styles.linearGradient}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => requestGroup()}
          >
            <Text style={styles.buttonText}>Request</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  blueline: {
    borderBottomColor: "#2958FF",
    borderBottomWidth: 1,
    marginBottom: 3,
  },
  grayline: {
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
});

export default GroupJoinedScreen;
