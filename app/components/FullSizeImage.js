// Loose reference
// https://blog.crowdbotics.com/how-to-create-a-custom-gallery-view-in-react-native/

import React, { useCallback } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { AntDesign } from "@expo/vector-icons";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

function FullSizeImage(props) {
  const renderItem = useCallback(function renderItem({ item, index }) {
    if (item.privacy === "public") {
      return (
        <Image
          key={index}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
          source={{ uri: item.image }}
        />
      );
    } else {
      return (
        <Image
          key={index}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
          blurRadius={50}
          source={{ uri: item.image }}
        />
      );
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{ position: "absolute", top: 15, right: 15 }}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          {/* TODO check drop shadow works */}
          <AntDesign
            name="close"
            size={30}
            color="white"
            style={{ shadowColor: "#000" }}
          />
        </TouchableOpacity>

        <View style={{ flex: 1 / 2 }}>
          <Carousel
            layout="default"
            data={props.route.params.images}
            sliderWidth={windowWidth}
            itemWidth={windowWidth}
            firstItem={props.route.params.openImage}
            renderItem={renderItem}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  slideImage1: {
    width: windowWidth,
    height: windowHeight,
  },
});

export default FullSizeImage;
