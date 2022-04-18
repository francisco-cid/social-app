import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {
    StyleSheet,
    View,
    FlatList,
    Dimensions,
    ImageBackground,
    Text,
    TouchableOpacity
} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";

// TODO: done button post to backend, when alert yes clicked
// push by wednesday 10pm
export default function UserFeedScreen(props) {
    /* note to devs: different fields can be used as keys by FlatList's keyExtractor */

    const [profiles,setProfiles] = useState([]);
    const navigation = useNavigation()
    useEffect(()=>{
        Axios.get('/api/users')
            .then(response=>{
                setProfiles(response.data.users)
            });
    },[]);
    return(
        <SafeAreaView style={styles.container} edges={["right","left"]}>
            <View style={styles.info}>
                <FlatList
                    data={profiles}
                    renderItem={({item}) => renderThumbnail(item, {navigation})}
                    keyExtractor={(item,index)=>index.toString()}
                    numColumns={3} />
            </View>
        </SafeAreaView>
    );
}

function renderThumbnail(profile,{navigation}) {

    return(
        <View style={styles.imgView}>
            <TouchableOpacity onPress={() => navigation.navigate('UserProfile',{profile})}>
                <ImageBackground source={{ uri: profile.avatar_photo }}
                                 key={profile.user_id}
                                 style={{ width: imgwidth, height: imgHeight }}>
                    <View style={styles.textView}>
                        <Text style={styles.caption}>
                            {profile.first_name + ", " + profile.age}
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>

    );
}



const profilePad = 2;
const dim = Dimensions.get('window');
const imgwidth = (dim.width - 6 * profilePad) / 3;
const imgHeight = 170;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        flexWrap: "wrap"
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

    imgView: {
        padding: profilePad
    },

    // text on the profile image thumbnails
    textView: {
        justifyContent: "flex-end",
        flex: 1,
        bottom: 10,
    },

    info: {
        paddingTop: 0,
    },
});