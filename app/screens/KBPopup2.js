// /**
//  * This screen has been retired, but can be used for future reference.
//  */
//
// import React, { useState } from 'react';
// import {
//     StyleSheet,
//     SafeAreaView,
//     View,
//     Dimensions,
//     Text,
//     TextInput,
//     TouchableOpacity
// } from 'react-native';
// import { LinearGradient } from "expo-linear-gradient";
// import Header from "./Header";
//
//
// export default function KBPopup2(props) {
//     const [changes, setChanges] = useState(false);
//
//     return (
//         <SafeAreaView style={styles.container}>
//             <Header />
//
//             <View style={styles.info}>
//                 <InfoBox text={"Pronouns (optional)"}/>
//                 <InfoBox text={"Sexual Orientation"}/>
//                 <InfoBox text={"Sexual position"}/>
//                 <InfoBox text={"HIV status"}/>
//                 <InfoBox text={"When were you last tested?"}/>
//                 <InfoBox text={"Gender"}/>
//
//                 <TouchableOpacity style={styles.button} onPress={() => setChanges(true)}>
//                   <LinearGradient
//                     colors={["#5DD1B5","#2958FF"]}
//                     style={[StyleSheet.absoluteFill, styles.lingrad]}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}>
//                       <Text style={styles.buttonText}>Done</Text>
//                   </LinearGradient>
//                 </TouchableOpacity>
//
//                 {changes && <Popup/>}
//             </View>
//         </SafeAreaView>
//     );
// }
//
//
// const InfoBox = (props) => (
//     <View>
//         <Text style={styles.text}>{props.text}</Text>
//         <TextInput style={styles.input}></TextInput>
//     </View>
// );
//
//
// const Popup = () => (
//     <View style={styles.popup}>
//       <LinearGradient
//           colors={["#5DD1B5","#2958FF"]}
//           style={[StyleSheet.absoluteFill, styles.lingrad],
//                 {height: height * 0.3, width: width * 0.6, alignItems: "center"}}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}>
//           <Text style={styles.buttonText}>Do you want to save your changes?</Text>
//       </LinearGradient>
//     </View>
// );
//
//
// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;
// const imgDim = width * 0.4;
// const buttonPercent = 0.32;
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: "column",
//         justifyContent: "flex-start",
//     },
//
//     input: {
//         fontSize: 27,
//         opacity: 0.4,
//         fontFamily: 'Montserrat_400Regular',
//         color: 'gray',
//         borderBottomColor: ' black',
//         borderBottomWidth: StyleSheet.hairlineWidth,
//         alignSelf: 'stretch'
//     },
//
//     text: {
//         fontFamily: 'Montserrat_400Regular',
//         fontSize: 20,
//         color: "black",
//         fontWeight: 600,
//         paddingTop: height * 0.03,
//         paddingBottom: height * 0.01
//     },
//
//     button: {
//         alignContent: "center",
//         marginLeft: width * (0.9 - buttonPercent)/2,
//         marginTop: height * 0.06,
//         height: height * 0.06,
//         width: width * buttonPercent,
//     },
//
//     info: {
//         paddingTop: height * 0.1,
//         marginLeft: width * 0.05,
//     },
//
//     lingrad: {
//         borderRadius: 22,
//         alignItems: "center"
//     },
//
//     buttonText: {
//         fontFamily: 'Montserrat_600SemiBold',
//         color: 'white',
//         fontSize: 25,
//         padding: height * 0.01
//     },
//
//     popup: {
//         position: "absolute",
//         justifyContent: "center",
//         paddingLeft: width * 0.15,
//         paddingTop: height * 0.3
//     }
//
// });