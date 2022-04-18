import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { 
    StyleSheet, 
    SafeAreaView, 
    View,
    Dimensions,
    Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native';


export default function EditProfileDone({ navigation }) {
    return (
      <LinearGradient 
        colors={["#5DD1B5","#2958FF"]} 
        style={[StyleSheet.absoluteFill, {height: dim.height, width: dim.width}]}
        start={{ x: 0, y: 0 }}  
        end={{ x: 1, y: 1 }} >
        <SafeAreaView style={{marginTop: dim.height * 0.02}}>
          <View style={styles.centering}>
            <Text style={styles.text}>ORGY</Text>
            <Text style={styles.subtext}>{msg}</Text>
            <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.next}>Get started</Text>
              </TouchableOpacity>
              <FontAwesome5 name="arrow-right" size={25} color="white" />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
}

const dim = Dimensions.get('window');
const msg = "Congratulations! You're published and ready to start orgying!"


const styles = StyleSheet.create({
    text: {
        fontFamily: 'Monoton_400Regular',
        color: "white",
        fontSize: 60,
        marginTop: dim.height * 0.02,
    },

    subtext: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 28,
        color: "white",
        marginTop: dim.height * 0.1,
        textAlign: "center",
    },

    next: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 24,
        color: "white",
        marginRight: 12,
        textAlign: "center",
    },

    centering: {
        justifyContent: "center",
        alignItems: "center",
    },

    row: {
        marginTop: dim.height * 0.07,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
});