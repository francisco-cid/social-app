import React, { useState, useEffect } from "react";
import { Image } from "react-native-elements";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import Axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GroupFeedScreen(props) {
  const [groups, setGroups] = useState("initgroup");
  const navigation = useNavigation();

  useEffect(() => {
    Axios.get("/api/groups").then((response) => {
      setGroups(response.data.groups);
    });
  }, []);

  // post-processing groups, unnecesary for this screen but can be useful to link
  // with other screens
  // for (let i = 0; i < groups.length; ++ i) {
  //     g = groups[i];
  //     groups[i] = new Group(g.group_id, g.group_name, g.size,
  //                         g.max_size, g.time, g.group_desc, g.body_pref);
  // }

  return (
    <SafeAreaView style={styles.container} edges={["right", "left"]}>
      <View style={{ marginTop: 0 }}>
        <FlatList
          data={groups}
          renderItem={({ item }) => renderThumbnail(item, { navigation })}
          //   This helps distinguish the outer FlatList from the nested ones
          keyExtractor={(item, index) => "o" + index.toString()}
          //   can't have a listKey here or else an error will be thrown
          //   listKey={(item, index) => "o" + index.toString()}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}

function renderImage(img) {
  return <Image source={{ uri: img }} style={[styles.thumbnail, img.style]} />;
}

function renderThumbnail(group, { navigation }) {
  return (
    <View style={styles.group}>
      <TouchableOpacity
        onPress={() => navigation.navigate("GroupPublic", { group })}
      >
        <View style={styles.row}>
          <Text style={styles.pText} numberOfLines={1} ellipsizeMode={"tail"}>
            {group.group_name}
          </Text>
          <Text style={styles.eText}>3 mi</Text>
        </View>
        <FlatList
          data={group.user_avatars}
          renderItem={({ item }) => renderImage(item)}
          //   Identify this as a nested FlatList
          keyExtractor={(item, index) => "i" + index.toString()}
          listKey={(item, index) => "i" + index.toString()}
          numColumns={2}
        />
      </TouchableOpacity>
    </View>
  );
}

/* Note to devs: retired for now, but MUST be used for error handling */
function onFailure(error) {
  if (error.response.status == 404) {
    Alert.alert("Group not found", "Please try again.");
  } else {
    console.log(error.toString());
    Alert.alert(
      "Oops!",
      "Something went wrong. Tell the developers to fix it."
    );
  }
}

/* Note to devs: retired for now, but could be used if API design changes
    i.e. if API does not send 4 user_avatars from an api/groups request */
function onUserImagesSuccess(response) {
  let users = response.data.users;

  // we only need 4 users to display
  let bound = Math.min(user.length, 4);
  for (let i = 0; i < bound; ++i) {
    // this will ensure which image gets rounded at the right edge
    users[i] = {
      url: users[i].avatar_photo,
      style: borderRadiusStyle[idx % 4],
    };
  }
  return users;
}

const dim = Dimensions.get("window");
const vertGroupPad = dim.height * 0.05;
const groupPad = 7;
const imgPad = 0;
const groupWidth = (dim.width - 4 * groupPad) / 2;
const imgWidth = (groupWidth - 4 * imgPad) / 2;
const imgHeight = imgWidth;
const distanceWidth = groupWidth * 0.3;
const nameWidth = groupWidth - distanceWidth;
const borderRadius = 8;

const borderRadiusStyle = [
  { borderTopLeftRadius: borderRadius },
  { borderTopRightRadius: borderRadius },
  { borderBottomLeftRadius: borderRadius },
  { borderBottomRightRadius: borderRadius },
];

// const myPhotos = [
//   "https://tse2.mm.bing.net/th?id=OIP.xPzy2jxYVhb0NhzP-I7wGQHaE7&pid=Api&P=0&w=270&h=181",
//   "https://tse3.mm.bing.net/th?id=OIP.tY3kNq975IXaYD3DcEBlyAHaG7&pid=Api&P=0&w=191&h=180",
//   "https://tse3.explicit.bing.net/th?id=OIP.PiO4HB9JQV1t2P5tld6WAAHaEK&pid=Api&P=0&w=298&h=168",
//   "https://tse1.mm.bing.net/th?id=OIP.oWCzswIUjIxI1RdRdM1ZrwHaEK&pid=Api&P=0&w=320&h=181",
// ];
// myPhotos.forEach(
//   (e, idx, arr) => (arr[idx] = { url: e, style: borderRadiusStyle[idx] })
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  thumbnail: {
    height: imgHeight,
    width: imgWidth,
    padding: imgPad,
  },
  group: {
    height: groupWidth,
    width: groupWidth,
    marginHorizontal: groupPad,
    marginBottom: vertGroupPad,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  pText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 18,
    color: "blue",
    paddingRight: dim.width * 0.04,
    width: nameWidth,
  },
  eText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 18,
    color: "black",
    opacity: 0.35,
  },
});
