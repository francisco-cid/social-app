import React from 'react';
import { 
    StyleSheet, 
    SafeAreaView, 
    View,
    Dimensions,
    ScrollView,
    Text,
    TextInput,
} from 'react-native';
import Dropdown from "./Dropdown";
import DoneButton from "./DoneButton";
// import Slider from "./Slider";
import { Header, headerHeight } from "./Header";

export default function FilterScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={{marginTop: headerHeight}}>
                <View style={styles.info}>
                    <InfoBox text={"Location"} type={SLIDER} 
                        min={0} max={1000}/>
                    {props.group && <InfoBox text={"Group size"} type={DROPDOWN}/>}
                    <InfoBox text={"Gender"} type={DROPDOWN} 
                        options={["Male", "Female", "Trans male", "Trans female"]} 
                        onClick={e => updateOrientation(e)}/>
                    <InfoBox text={"Age"} type={SLIDER} 
                        min={18} max={100}/>
                    <InfoBox text={"Sexual Orientation"} type={DROPDOWN}
                        options={["Heterosexual", "Gay", "Lesbian", "Bisexual"]}/>
                        {/* Conditional rendering */}
                    <InfoBox text={"Sexual Position"} type={DROPDOWN}
                        options={["69", "420"]}/>
                    <InfoBox text={"Body type"} type={DROPDOWN}
                        options={["Lean", "Dad bod", "Abs", "Squishy <3"]}/>
                </View>
                
                <DoneButton />
            </ScrollView>
        </SafeAreaView>
    );
}


function InfoBox(props) {

  switch (props.type) {
    case INPUT:
      return (
        <>
          <Text style={styles.text}>{props.text}</Text>
          <TextInput style={styles.input}></TextInput>
        </>
      );

    case DROPDOWN:
      return (
        <View style={{marginBottom: -ddSize}}>
          <Text style={styles.text}>{props.text}</Text>
          <Dropdown title={"Select"} options={props.options}/>
          {/* Deal with onclick */}
        </View>
      );

    case SLIDER:
      return (
        <View>
          <Text style={styles.text}>{props.text}</Text>
          {/* <Slider min={props.min} max={props.max}/> */}
        </View>
      );
  }
}


const DropdownWrapper = (props) => (
  <>
    <Text style={styles.text}>{props.text}</Text>
    <Dropdown title={"Select"} options={props.options}/>
  </>
);


function updateOrientation(newOrient) {
  orientation = newOrient;
}


let orientation = null;
const INPUT = 0; 
const DROPDOWN = 1; 
const SLIDER = 2;
const dim = Dimensions.get('window');
const ddSize = 50;
const topPad = dim.height * 0.05;

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
        marginLeft: dim.width * 0.05,
    },
})