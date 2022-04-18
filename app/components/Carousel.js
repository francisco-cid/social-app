// https://dev.to/lloyds-digital/let-s-create-a-carousel-in-react-native-4ae2

import React, { useCallback, memo, useRef, useState, useEffect } from "react";
import {
  FlatList,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const carouselHeight = 500;
const imageWidth = windowWidth / 2;
const imageHeight = carouselHeight * 0.5;

const styles = StyleSheet.create({
  slide: {
    height: windowHeight / 1.5,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage1: {
    width: imageWidth,
    height: imageHeight,
    position: "absolute",
    left: -1,
    top: -1,
  },
  slideImage2: {
    width: imageWidth,
    height: imageHeight,
    position: "absolute",
    left: imageWidth + 1,
    top: -1,
  },
  slideImage3: {
    width: imageWidth,
    height: imageHeight,
    position: "absolute",
    left: -1,
    top: imageHeight + 1,
  },
  slideImage4: {
    width: imageWidth,
    height: imageHeight,
    position: "absolute",
    left: imageWidth + 1,
    top: imageHeight + 1,
  },
  slideImageInside: {
    width: imageWidth,
    height: imageHeight,
    position: "absolute",
    left: 0,
    top: 0,
  },
  lock: {
    position: "absolute",
    top: imageHeight - 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  pagination: {
    position: "absolute",
    bottom: -10,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: { backgroundColor: "lightblue" },
  paginationDotInactive: { backgroundColor: "gray" },
  carousel: { flex: 1 },
});

var slideList = [];

const Slide = memo(function Slide({ data, navigation, allPhotos }) {
  function openFullSizeImage(imageURI) {
    var bigImages = [];
    var openImageID = -1;
    var index = 0;
    Object.keys(allPhotos).forEach((key) => {
      for (let i = 0; i < allPhotos[key].length; i++) {
        bigImages.push({
          id: index,
          privacy: key,
          image: allPhotos[key][i],
        });
        if (openImageID == -1 && allPhotos[key][i] === imageURI) {
          openImageID = index;
        }
        index++;
      }
    });

    navigation.navigate("FullSizeImage", {
      openImage: openImageID,
      images: bigImages,
    });
  }

  if (data.privacy == "public") {
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.slideImage1}
          onPress={() => openFullSizeImage(data.images[0])}
        >
          <Image
            source={{ uri: data.images[0] }}
            style={styles.slideImageInside}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.slideImage2}
          onPress={() => openFullSizeImage(data.images[1])}
        >
          <Image
            source={{ uri: data.images[1] }}
            style={styles.slideImageInside}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.slideImage3}
          onPress={() => openFullSizeImage(data.images[2])}
        >
          <Image
            source={{ uri: data.images[2] }}
            style={styles.slideImageInside}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.slideImage4}
          onPress={() => openFullSizeImage(data.images[3])}
        >
          <Image
            source={{ uri: data.images[3] }}
            style={styles.slideImageInside}
          />
        </TouchableOpacity>
      </View>
    );
  } else if (data.privacy == "private") {
    return (
      <View style={styles.slide}>
        <Image
          source={{ uri: data.images[0] }}
          style={styles.slideImage1}
          blurRadius={50}
        />
        <Image
          source={{ uri: data.images[1] }}
          style={styles.slideImage2}
          blurRadius={50}
        />
        <Image
          source={{ uri: data.images[2] }}
          style={styles.slideImage3}
          blurRadius={50}
        />
        <Image
          source={{ uri: data.images[3] }}
          style={styles.slideImage4}
          blurRadius={50}
        />
        <Entypo name="lock" size={60} color="white" style={styles.lock} />
      </View>
    );
  }
});

function Pagination({ index }) {
  return (
    <View style={styles.pagination} pointerEvents="none">
      {slideList.map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.paginationDot,
              index === i
                ? styles.paginationDotActive
                : styles.paginationDotInactive,
            ]}
          />
        );
      })}
    </View>
  );
}

export default function Carousel(props) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  const navigation = useNavigation();
  const [photos, setPhotos] = useState([]);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  useEffect(() => {
    const photosList = [];
    Object.keys(props.photosList).forEach((key) => {
      const numPhotos = props.photosList[key].length;
      for (let i = 0; i < numPhotos; i += 4) {
        var endInd = i + 4;
        if (i == numPhotos - 1 && numPhotos % 4 > 0) {
          endInd = i + (numPhotos % 4);
        }
        photosList.push({
          privacy: key,
          images: props.photosList[key].slice(i, endInd),
        });
      }
    });
    setPhotos(photosList);
    slideList = photosList;
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  const renderItem = useCallback(function renderItem({ item }) {
    return (
      <Slide data={item} navigation={navigation} allPhotos={props.photosList} />
    );
  }, []);

  return (
    <>
      <FlatList
        data={photos}
        style={styles.carousel}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <Pagination index={index}></Pagination>
    </>
  );
}
