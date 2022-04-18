import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel from "../components/Carousel";
import ProfileText from "../components/ProfileText";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

function UserProfileScreen(props, { navigation }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setProfile(props.route.params.profile);
  }, []); // TODO error check

  if (!profile) return null;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["right", "left"]}>
      <ScrollView>
        <View style={{ height: 500 }}>
          <Carousel photosList={profile.photos} />
        </View>

        <ProfileText profile={profile} />
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
          <View style={{ marginRight: "3.5%" }}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Invite</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: "3.5%" }}>
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

export default UserProfileScreen;
