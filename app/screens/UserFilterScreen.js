import React from 'react';
import { 
    StyleSheet, 
    SafeAreaView, 
    View,
    Dimensions,
    Text,
    TextInput,
    FlatList,
    ImageBackground,
    ScrollView
} from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import DoneButton from "./DoneButton"
import Header from "./Header";

export default function UserFilterScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.info}>
                <InfoBox text={"Location"} type={SLIDER}/>
                <InfoBox text={"Group size"} type={DROPDOWN}/>
                <InfoBox text={"Gender"} type={DROPDOWN}/>
                <InfoBox text={"Age"} type={SLIDER}/>
                <InfoBox text={"Sexual Orientation"} type={DROPDOWN}/>
                <InfoBox text={"Sexual Position"} type={DROPDOWN}/>
                <InfoBox text={"Body type"} type={DROPDOWN}/>
                
                <DoneButton />
            </View>
        </SafeAreaView>
    );
}


const InfoBox = (props) => (
    <View>
        <Text style={styles.text}>{props.text}</Text>
        {props.type == INPUT && <TextInput style={styles.input}></TextInput>}
        {props.type == DROPDOWN && <DropdownMenu />}
        {props.type == SLIDER}
    </View>
);


const INPUT = 0; 
const DROPDOWN = 1; 
const SLIDER = 2;
const dim = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
    },

    input: {
        fontSize: 27,
        opacity: 0.35,
        fontFamily: 'Montserrat_400Regular',
        color: 'gray',
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: 'stretch'
    },

    text: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 20,
        color: "black",
        paddingTop: dim.height * 0.03,
    },

    info: {
        paddingTop: dim.height * 0.05,
        marginLeft: dim.width * 0.05,
    },
})