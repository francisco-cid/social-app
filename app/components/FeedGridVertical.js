// import React from 'react';
// import {SafeAreaView,View, Text} from 'react-native';

// function UserFeedScreen(props) {
//     return (
//         <SafeAreaView>
//             <Text>Pretend this is the groups page</Text>
//         </SafeAreaView>
//     );
// }

import React, { Component } from 'react';
import { 
    StyleSheet, 
    SafeAreaView, 
    ScrollView,
    View,
    FlatList, 
    Dimensions,
    ImageBackground,
    Text,
} from 'react-native';


class FeedGrid extends Component {

    // different fields can be used as keys by keyExtractor
    profiles = [
        {name: "Angel", key: 1, age: 23, url: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
        {name: "Otto", key: 2, age: 20, url: "https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
        {name: "Jamie", key: 3, age: 19, url: "https://images.pexels.com/photos/3812762/pexels-photo-3812762.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
        {name: "Anon", key: 4, age: 22, url: "https://images.pexels.com/photos/1851243/pexels-photo-1851243.jpeg?cs=srgb&dl=pexels-frank-k-1851243.jpg&fm=jpg"},
        {name: "Jeremiah", key: 5, age: 25, url: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name: "Velvet", key: 6, age: 30, url: "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name: "May", key: 7, age: 31, url: "https://images.pexels.com/photos/3851294/pexels-photo-3851294.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name: "Juan", key: 8, age: 20, url: "https://images.pexels.com/photos/1814410/pexels-photo-1814410.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name: "Chad", key: 9, age: 34, url: "https://images.pexels.com/photos/3374765/pexels-photo-3374765.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name: "Disdude", key: 10, age: 35, url: "https://www.pride.com/sites/www.pride.com/files/2016/07/01/stock3.jpg"},
        {name: "Elena", key: 11, age: 28, url: "https://images.pexels.com/photos/768108/pexels-photo-768108.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
        {name: "Melania", key: 12, age: 27, url: "https://images.pexels.com/photos/762093/pexels-photo-762093.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name: "Sundar", key: 13, age: 30, url: "https://images.pexels.com/photos/2741701/pexels-photo-2741701.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name: "Eve", key: 14, age: 24, url: "https://images.pexels.com/photos/5269516/pexels-photo-5269516.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name: "Jean-Marques", key: 15, age: 33, url: "https://images.pexels.com/photos/7361855/pexels-photo-7361855.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
    ];

    renderThumbnail(profile) {
        return(
            <View style={{padding: profilePad}}>
                <ImageBackground source={{ uri: profile.url }}
                    key={profile.age} 
                    onLoadStart={() => this.setState({loading: false})}
                    style={{ width: imgwidth, height: imgHeight }}>
                    <View style={styles.textView}>
                        <Text style={styles.caption}>
                            {profile.name + ", " + profile.age}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    render() {
          return(
            // <View style={styles.container}>
            //     <FlatList
            //         horizontal
            //         data={ this.profiles }
            //         renderItem={({item}) => this.renderThumbnail(item)}
            //         keyExtractor={this._keyExtractor}
            //         // numColumns={3} 
            //         numRows={2}
            //     />
            // </View>

            // -1 marginHorizontal so grid covers whole width of screen
            <View style={{ marginHorizontal: -1 }}>
                <FlatList
                    contentContainerStyle={{alignSelf: 'flex-start'}}
                    data={ this.profiles }
                    renderItem={({item}) => this.renderThumbnail(item)}
                    keyExtractor={this._keyExtractor}
                    numColumns={3} 
                />
            </View>

        );
    }

} // end class


const profilePad = 1;
const dim = Dimensions.get('window');
// +0.67 in width so grid covers whole width of screen
const imgwidth = (dim.width - 6 * profilePad) / 3 + 0.67;
const imgHeight = 170;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        // -1 marginLeft so grid covers whole width of screen
        marginLeft: -1
    },

    // name, age display on the thumbnail
    caption: {
        fontSize: 18,
        left: 5,
        textAlign: "left",
        color: "white",
        fontFamily: "Montserrat_700Bold",
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 3,
        textShadowColor: 'black',
    },

    // text on the profile image thumbnails
    textView: {
        justifyContent: "flex-end",
        flex: 1,
        bottom: 10,
    },
  });

export default FeedGrid;