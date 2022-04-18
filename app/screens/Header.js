import React from 'react';
import { 
    StyleSheet, 
    View, 
    Dimensions,
    Text,
    Image
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';


/**
 * @param props.type can be one of "edit", "save", or null
 **/ 
export function Header(props) {
    if (props.type) {
        let msg = props.type[0].toUpperCase() + props.type.substring(1);
        return (
            <LinearGradient 
                colors={["#2958FF", "#5DD1B5"]} 
                style={[StyleSheet.absoluteFill, {height: hdrHeight, width: dim.width}]}
                start={{ x: 0, y: 0 }}  
                end={{ x: 1, y: 1 }}>
                <View style={styles.row}>
                  <View style={{width: textWidth}}>
                    <Text style={styles.lcText}>{msg} Profile</Text>
                  </View>
                  <MaterialIcons name="settings" size={40} color="white" style={styles.lcRight} />
                </View>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient 
            colors={["#2958FF", "#5DD1B5"]} 
            style={[StyleSheet.absoluteFill, {height: hdrHeight, width: dim.width}]}
            start={{ x: 0, y: 0 }}  
            end={{ x: 1, y: 1 }}>
            <View style={styles.row}>
                <MaterialIcons name="search" size={40} color="white" style={styles.left}/>
                <Text style={styles.text}>ORGY</Text>
                <MaterialIcons name="filter-list" size={40} color="white" style={styles.right}/>
            </View>
        </LinearGradient>
    );
}

const dim = Dimensions.get('window');
const hdrHeight = dim.height * 0.13;
const iconSz = dim.width * 0.1;
const estimTextPercent = 0.2;
const textOffset = dim.width * (0.74 - estimTextPercent)/2;
const fontSz = hdrHeight * 0.4;
const leftPad = dim.width * 0.05;
const textWidth = dim.width * 0.5;
const afterTextPad = dim.width * 0.35;
export const headerHeight = hdrHeight * 0.9;


const styles = StyleSheet.create({
    text: {
        fontFamily: 'Monoton_400Regular',
        color: 'white',
        fontSize: fontSz,
        marginLeft: dim.width * 0.17,
        marginTop: hdrHeight * 0.38,
    },

    left: {
        marginTop: hdrHeight * 0.5,
        marginLeft: leftPad,
        height: iconSz, width: iconSz
    },

    right: {
        marginTop: hdrHeight * 0.5,
        marginLeft: dim.width * 0.14,
        height: iconSz * 4, width: iconSz * 4
    },

    lcText: {
        // fontFamily: 'Montserrat_400Regular',
        fontFamily: 'Montserrat_600SemiBold',
        color: 'white',
        fontSize: 25,
        marginTop: hdrHeight * 0.5,
        marginLeft: leftPad,
    },

    row: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start"
    },

    lcRight: {
      marginTop: hdrHeight * 0.5, 
      marginLeft: afterTextPad, 
      flex: 1,
      height: 30, 
      width: 30
    }
});