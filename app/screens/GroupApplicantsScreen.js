import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Dimensions, TouchableOpacity, Alert } from 'react-native';
import FeedGridVertical from '../components/FeedGridVertical';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import MaskedView from '@react-native-community/masked-view'

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const slideList = [
    {id: '1', image: 'https://www.rollingstone.com/wp-content/uploads/2011/03/britneyspears.jpg'},
    {id: '2', image: 'https://ta-images.condecdn.net/image/DZ66Akk3L25/crop/1800/f/framingbritneyspears-05-square.jpg'},
    {id: '3', image: 'https://static01.nyt.com/images/2021/02/12/universal/25nytp-britneyspears-felcia3-ITTweb/25nytp-britneyspears-felcia1-mediumSquareAt3X.jpg'}
]
const group = {
    id: 1, 
    name: "Pool Play", 
    city: "San Antonio, TX",
    date: "Thurs, July 4", 
    time: "10 PM to 2 AM", 
    location_name: "Highland Apartments", 
    address_line1: "2300 Avenue St.",
    address_line2: "City, State 12345",
    num_members: 6,
    max_members: 10,
    description: "Drink Jager out of each other’s buttholes! Splash in the infinity pool overlooking LA! If you’re a hot ass guy or gal, apply now.", 
    genders: "Co-ed", 
    body_type: "Tones/fit bodies",
    ethnicity: "Hispanic",
    stddate: "June 10, 2021"
}

function GroupApplicantsScreen(props) {

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView> 
                <View style={{ margin: 10, flexDirection: 'row' }}>
                    <View>
                        <View>
                            <TouchableOpacity style={{ elevation: 8,
                                    backgroundColor: "#2958FF",
                                    borderRadius: 15,
                                    paddingVertical: 3,
                                    width: 80,
                                    // Gets rid of shadow on Android
                                    shadowOffset: { height: 0, width: 0 },
                                    shadowOpacity: 0,
                                    elevation: 0 }}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_700Bold', fontSize: 14, color: 'white' }}>
                                    Member
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text>
                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 36 }}>
                                { group.name }
                            </Text> 
                        </Text>
                        <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 18, color: '#2958FF' }}>
                            { group.city }
                        </Text>
                    </View>
                    <AntDesign name="hearto" size={24} color="black" style={{ position: "absolute", right: 0 }} />
                </View>       

                <View style={styles.blueline} />
                <View style={styles.blueline} />
                <View style={styles.blueline} />

                <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 5 }}>
                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: '#2958FF', fontSize: 18, marginBottom: 5 }}>
                        Applicants
                    </Text>
                    <Text style={{ fontFamily: 'Montserrat_400Regular', color: '#727272', fontSize: 18 }}>
                        { " " + "15" }
                    </Text>
                </Text>
                <View>
                    <FeedGridVertical />
                </View>
                
            </ScrollView>

            {/* BACK BUTTON */}
            <View style={{
                width: 65,
                height: 65,
                borderRadius: 65 / 2,
                backgroundColor: "white",
                position: 'absolute',                                          
                bottom: 65.5,                                                    
                left: 24.5,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 2,  
                elevation: 5
            }} />
            <View style={{ width: 80, position: 'absolute',                                          
                            bottom: 60,                                                    
                            left: 20 }}>
                <MaskedView
                    style={{ flex: 1, flexDirection: 'row', height: 80 }}
                    maskElement={
                    <View
                        style={{
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}>
                    <Ionicons 
                        name="arrow-back-circle" 
                        size={80} 
                        color="white" />
                    </View>
                    }>
                    <LinearGradient
                        start={{x: 0, y: 0.5}}
                        end={{x: 1, y: 0.5}}
                        colors={['#2958FF', '#5DD1B5']}
                        style={{ flex: 1 }}
                    />
                </MaskedView>
            </View>

        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    blueline: {
        borderBottomColor: '#2958FF',
        borderBottomWidth: 1,
        marginBottom: 3
    },
    grayline: {
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        alignSelf: 'stretch',
      },
      buttonContainer: {
        elevation: 8,
        backgroundColor: "#fff",
        borderRadius: 30,
        paddingVertical: 9,
        width: windowWidth / 3,
        // Gets rid of shadow on Android
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        elevation: 0
      },
      buttonText: {
        fontSize: 18,
        fontFamily: "Montserrat_700Bold",
        alignSelf: "center",
      }
});

export default GroupApplicantsScreen;