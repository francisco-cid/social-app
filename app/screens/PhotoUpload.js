import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import Carousel from "../components/Carousel";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Header, headerHeight } from "./Header";

import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black,
  Montserrat_900Black_Italic,
} from "@expo-google-fonts/montserrat";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

function UploadScreen(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header type={"Upload photos"} />

      <ScrollView style={{ marginTop: headerHeight }}>
        <View style={styles.container}>
          <View
            style={{
              paddingTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={
                image
                  ? { uri: image }
                  : {
                      uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
                    }
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: 200 / 2,
                padding: 60,
                borderWidth: 2,
                borderColor: "black",
              }}
            />
            <TouchableOpacity
              style={{
                paddingTop: height * 0.02,
                paddingBottom: height * 0.02,
              }}
              onPress={pickImage}
            >
              <Text style={styles.profileButtonText}>
                {" "}
                Change profile picture{" "}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={{ paddingTop: height * 0.02, flexDirection: "row" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Montserrat_600SemiBold",
                  color: "#2958FF",
                  fontSize: 20,
                  marginLeft: width * 0.03,
                }}
              >
                Public photos
              </Text>
              <TouchableOpacity onPress={pickImage}>
                <Text
                  style={{
                    fontFamily: "Montserrat_400Regular",
                    color: "#B0B0B0",
                    fontSize: 18,
                  }}
                >
                  {"   " + "Add"}{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </Text>

          <View style={{ height: 520, paddingTop: height * 0.0034 }}>
            <View style={{ height: 500 }}>
              <CarouselUserProfile />
            </View>
          </View>

          <Text style={{ paddingTop: height * 0.03, flexDirection: "row" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Montserrat_600SemiBold",
                  color: "#2958FF",
                  fontSize: 20,
                  marginLeft: width * 0.03,
                }}
              >
                Private photos
              </Text>
              <TouchableOpacity onPress={pickImage}>
                <Text
                  style={{
                    fontFamily: "Montserrat_400Regular",
                    color: "#B0B0B0",
                    fontSize: 18,
                  }}
                >
                  {"   " + "Add"}{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </Text>

          <View style={{ height: 520, paddingTop: height * 0.0034 }}>
            <View style={{ height: 500 }}>
              <CarouselUserProfile />
            </View>
          </View>
        </View>

        <View style={{ padding: height * 0.01, alignSelf: "center" }}>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => props.navigation.navigate("EditProfileDone")}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },

  textHeadingStyle: {
    marginTop: 30,
    fontSize: 40,
    color: "#0250a3",
    fontWeight: "bold",
  },
  doneButtonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#ffff",
    fontFamily: "Montserrat_700Bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
  },
  profileButtonText: {
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
    color: "black",
  },
  doneButton: {
    // elevation: 8,
    justifyContent: "center",
    backgroundColor: "#2958FF",
    borderRadius: 30,
    paddingVertical: 9,
    minWidth: 150,
    width: width / 3,
    // Gets rid of shadow on Android
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default UploadScreen;
