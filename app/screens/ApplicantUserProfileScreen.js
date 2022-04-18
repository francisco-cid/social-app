import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel from "../components/Carousel";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const slideList = [
  {
    id: "1",
    image:
      "https://www.rollingstone.com/wp-content/uploads/2011/03/britneyspears.jpg",
  },
  {
    id: "2",
    image:
      "https://ta-images.condecdn.net/image/DZ66Akk3L25/crop/1800/f/framingbritneyspears-05-square.jpg",
  },
  {
    id: "3",
    image:
      "https://static01.nyt.com/images/2021/02/12/universal/25nytp-britneyspears-felcia3-ITTweb/25nytp-britneyspears-felcia1-mediumSquareAt3X.jpg",
  },
];

const profile = {
  id: 1,
  name: "Mark",
  age: 26,
  city: "San Antonio, TX",
  description: "Looking for some fun. Visiting Dallas for a few weeks.",
  gender: "Male",
  pronouns: "He/him",
  sexuality: "Straight",
  ethnicity: "Hispanic",
  stddate: "June 10, 2021",
};

function ApplicantUserProfileScreen(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ height: 500 }}>
          <Carousel />
        </View>

        <View style={{ margin: 10, flexDirection: "row" }}>
          <View>
            <Text>
              <Text
                style={{ fontFamily: "Montserrat_600SemiBold", fontSize: 36 }}
              >
                {profile.name + ", "}
              </Text>
              <Text
                style={{ fontFamily: "Montserrat_400Regular", fontSize: 36 }}
              >
                {profile.age}
              </Text>
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_500Medium",
                fontSize: 18,
                color: "#2958FF",
              }}
            >
              {profile.city}
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

        <View style={{ margin: 10 }}>
          <Text
            style={{ fontFamily: "Montserrat_400Regular", color: "#727272" }}
          >
            {profile.description}
          </Text>
          <View style={styles.grayLine} />
          <Text
            style={{ fontFamily: "Montserrat_600SemiBold", color: "#727272" }}
          >
            {profile.gender}
          </Text>
          <Text
            style={{ fontFamily: "Montserrat_400Regular", color: "#727272" }}
          >
            {profile.pronouns}
          </Text>
          <View style={styles.grayLine} />
          <Text
            style={{ fontFamily: "Montserrat_600SemiBold", color: "#727272" }}
          >
            {profile.sexuality}
          </Text>
          <View style={styles.grayLine} />
          <Text
            style={{ fontFamily: "Montserrat_600SemiBold", color: "#727272" }}
          >
            {profile.ethnicity}
          </Text>
          <View style={styles.grayLine} />
          <Text
            style={{ fontFamily: "Montserrat_600SemiBold", color: "#727272" }}
          >
            Last test for STDs
          </Text>
          <Text
            style={{ fontFamily: "Montserrat_400Regular", color: "#727272" }}
          >
            {profile.stddate}
          </Text>
          <View style={styles.grayLine} />
          <Text
            style={{ fontFamily: "Montserrat_600SemiBold", color: "#727272" }}
          >
            Instagram
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat_400Regular",
              color: "#727272",
              marginBottom: 10,
            }}
          >
            @hunkydaddy69
          </Text>
          <Text
            style={{ fontFamily: "Montserrat_600SemiBold", color: "#727272" }}
          >
            Snapchat
          </Text>
          <Text
            style={{ fontFamily: "Montserrat_400Regular", color: "#727272" }}
          >
            @mauri_enrique
          </Text>
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
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View>
            <Ionicons name="arrow-back-circle" size={50} color="white" />
          </View>
          <View style={{ justifyContent: "center", marginLeft: "4.5%" }}>
            <TouchableOpacity style={styles.yesButtonContainer}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", marginLeft: 2 }}>
            <TouchableOpacity style={styles.noButtonContainer}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", marginLeft: "6%" }}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
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
    elevation: 8,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 9,
    width: windowWidth / 3,
    // Gets rid of shadow on Android
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  yesButtonContainer: {
    elevation: 8,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    paddingVertical: 9,
    width: windowWidth / 5.5,
    // Gets rid of shadow on Android
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  noButtonContainer: {
    elevation: 8,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 9,
    width: windowWidth / 6,
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

export default ApplicantUserProfileScreen;
