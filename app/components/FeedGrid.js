// import React from 'react';
// import {SafeAreaView,View, Text} from 'react-native';

// function UserFeedScreen(props) {
//     return (
//         <SafeAreaView>
//             <Text>Pretend this is the groups page</Text>
//         </SafeAreaView>
//     );
// }

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  InteractionManager,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function FeedGrid(props, { navigation }) {
  navigation = useNavigation();

  function renderThumbnail(profile, { navigation }) {
    // console.log(profile.avatar_photo);
    return (
      <View style={{ padding: profilePad }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfile", { profile })}
        >
          <ImageBackground
            source={{ uri: profile.avatar_photo }}
            key={profile.age}
            // onLoadStart={() => this.setState({loading: false})}
            style={{ width: imgwidth, height: imgHeight }}
          >
            <View style={styles.textView}>
              <Text style={styles.caption}>
                {profile.display_name + ", " + profile.age}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    // -1 marginHorizontal so grid covers whole width of screen
    <View style={{ marginHorizontal: -1 }}>
      <FlatList
        data={props.group.users}
        renderItem={({ item }) => renderThumbnail(item, { navigation })}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        // TODO: 15 should be number of members
        // numColumns={Math.ceil(15 / 6) * 3}
        // numRows={2}
      />
    </View>
  );
} // end class

const profilePad = 1;
const dim = Dimensions.get("window");
// +0.67 in width so grid covers whole width of screen
const imgwidth = (dim.width - 6 * profilePad) / 3 + 0.67;
const imgHeight = 170;

const styles = StyleSheet.create({
  container: {
    // -1 marginLeft so grid covers whole width of screen
    marginLeft: -1,
    height: 342,
  },

  // name, age display on the thumbnail
  caption: {
    fontSize: 18,
    left: 5,
    textAlign: "left",
    color: "white",
    fontFamily: "Montserrat_700Bold",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
    textShadowColor: "black",
  },

  // text on the profile image thumbnails
  textView: {
    justifyContent: "flex-end",
    flex: 1,
    bottom: 10,
  },
});

export default FeedGrid;
