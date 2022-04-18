import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import ProfileText from "../components/ProfileText";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Carousel from "../components/Carousel";
import {SafeAreaView} from "react-native-safe-area-context";
import {useIsFocused} from "@react-navigation/native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

function MyProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [photosProcessed, setPhotosProcessed] = useState(null);

  useEffect(() => {
    axios.get("/api/users/myprofile").then((response) => {
      setProfile(response.data);
    }); // TODO error check
  }, [useIsFocused()]);

    if (!profile) return null;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["right","left"]}>
      <ScrollView>
        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 10 }}
        >
          <Image style={styles.avatarPicRing} />
          <Image
            source={{ uri: profile.avatar_photo }}
            style={styles.avatarPic}
          />
          <TouchableOpacity
            style={{ position: "absolute", top: 0, right: windowWidth / 3.6 }}
            onPress={() => navigation.navigate("EditProfile",{profile})}
          >
            <View style={styles.editProfileButton}>
              <MaterialIcons name="edit" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>People</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", marginLeft: "8%" }}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() =>
                navigation.navigate("MyGroups", { userID: profile.user_id })
              }
            >
              <Text style={styles.buttonText}>Groups</Text>
            </TouchableOpacity>
          </View>
        </View>

          <ProfileText profile={profile} />

          {/* TODO load photos */}
          <Text style={{ marginLeft: 10 }}>
            <Text
                style={{
                  fontFamily: "Montserrat_600SemiBold",
                  color: "#2958FF",
                  fontSize: 18,
                }}
            >
              Your Photos
            </Text>
            <Text
                style={{
                  fontFamily: "Montserrat_400Regular",
                  color: "#727272",
                  fontSize: 18,
                }}
            >
              {" Edit"}
            </Text>
          </Text>
          <View style={{ height: 570 }}>
            <View style={{ height: 500 }}>
              <Carousel photosList={profile.photos}/>
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: "#2958FF",
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
    color: "white",
  },
  editProfileButton: {
    backgroundColor: "#2958FF",
    borderRadius: 25,
    padding: 10,
    height: 45,
    width: 45,
    // Gets rid of shadow on Android
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  avatarPicRing: {
    width: 156,
    height: 156,
    borderRadius: 156 / 2,
    borderColor: "#000",
    borderWidth: 1,
  },
  avatarPic: {
    position: "absolute",
    top: 3,
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    borderColor: "#000",
    borderWidth: 2,
  },
});

export default MyProfileScreen;