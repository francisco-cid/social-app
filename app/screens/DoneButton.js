import React from 'react';
import { 
    StyleSheet, 
    Text,
    Alert,
    TouchableOpacity,
    Dimensions,
    View,
} from 'react-native';

export default function DoneButton() {
    return (
      <View style={{alignItems: "center", justifyContent: "center"}}>
        <TouchableOpacity style={styles.button} 
            onPress={() => Alert.alert("Do you want to save your changes?")}>
                <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
} 

const dim = Dimensions.get('window');

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: 'Montserrat_600SemiBold',
        color: 'white',
        fontSize: 25,
        padding: dim.height * 0.01
    },

    button: {
        alignItems: "center",
        borderRadius: 30,
        height: dim.height * 0.06,
        width: dim.width * 0.4,
        marginTop: dim.height * 0.05,
        backgroundColor: "#2958FF"
    }
});
