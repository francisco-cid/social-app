import React from "react";
import { StyleSheet, View, Image } from "react-native";

function ScatteredImages(props) {
  return (
    <View>
      <Image source={{ uri: props.photos[0] }} style={styles.image1} />
      <Image source={{ uri: props.photos[1] }} style={styles.image2} />
      <Image source={{ uri: props.photos[2] }} style={styles.image3} />
      <Image source={{ uri: props.photos[3] }} style={styles.image4} />
      <Image source={{ uri: props.photos[4] }} style={styles.image5} />
    </View>
  );
}

const styles = StyleSheet.create({
  image1: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    position: "absolute",
    left: 26,
    top: 28,
  },
  image2: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    position: "absolute",
    left: 0,
    top: 10,
  },
  image3: {
    width: 26,
    height: 26,
    borderRadius: 26 / 2,
    position: "absolute",
    left: 30,
    top: 0,
  },
  image4: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    position: "absolute",
    left: 5,
    top: 42,
  },
  image5: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    position: "absolute",
    left: 56,
    top: 13,
  },
});

export default ScatteredImages;
