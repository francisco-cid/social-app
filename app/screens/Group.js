/**
 * Models an orgy group (just displays images of SOME members)
 * Not a React component per se
 **/
// import React, { Component } from "react";
// import { Image } from 'react-native-elements';
// import {
//     View,
//     FlatList,
//     Text,
//     TouchableOpacity,
// } from 'react-native';
//
// export default class Group extends Component {
//     constructor(id, name, size, maxSize, time, description,
//                 bodyPrefs, distance=3, images=myPhotos) {
//         // some params right now are unneccesary
//         this.id = id;
//         this.name = name;
//         this.size = size;
//         this.maxSize = maxSize;
//         this.time = time;
//         this.description = description;
//         this.bodyPrefs = bodyPrefs;
//         this.distance = distance; // distance is from current user to group loc
//         this.thumbnails = images;
//     }
//
//     renderThumbnail(img) {
//         return <Image source={{uri: img.url}} style={[styles.thumbnail, img.style]} />;
//     }
//
//     render({navigation}) {
//         return (
//             <View style={styles.group}>
//                 <TouchableOpacity onPress={() => navigation.navigate('GroupPublic',{group})}>
//                     <View style={styles.group}>
//                         <View style={styles.row}>
//                             <Text style={styles.pText} numberOfLines={1} ellipsizeMode={"tail"}>{this.name}</Text>
//                             <Text style={styles.eText}>{this.distance + " mi"}</Text>
//                         </View>
//                         <FlatList
//                             data={this.thumbnails}
//                             renderItem={({item}) => this.renderThumbnail(item)}
//                             numColumns={2} />
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     thumbnail: {
//         height: imgHeight,
//         width: imgWidth,
//         padding: imgPad
//     },
//
//     group: {
//         height: groupWidth,
//         width: groupWidth,
//         marginHorizontal: groupPad,
//         marginBottom: vertGroupPad,
//     },
// });