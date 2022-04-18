import React, {useState} from 'react';
import {ScrollView, Image, View, SafeAreaView, Text, Dimensions, Button, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from "./app/components/BottomMenu.js";
import 'react-native-gesture-handler';
import { Header, headerHeight } from "./Header";
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black,
  Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';
import { LinearGradient } from "expo-linear-gradient";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
 

function UserMain ({navigation}) {




 const [state, countState]= useState(false)
 const onClick = () => state ? countState(false) : countState(true)
 const Results = () => (
   
 <View>
      <TouchableOpacity
        style={{ justifyContent:'flex-start'}}
      onPress={() =>navigation.navigate('Membership')}
      > 
              <Text style={styles.title}>Membership</Text>
            </TouchableOpacity>

  <TouchableOpacity
        style={{ justifyContent:'flex-start'}}
      onPress={() =>navigation.navigate('Username')}
      > 
                    <Text style={styles.title}>Username</Text>

                  </TouchableOpacity>

<TouchableOpacity
        style={{ justifyContent:'flex-start'}}
      onPress={() =>navigation.navigate('Change Password')}
      > 
       <Text style={styles.title}>Change Password</Text>
                  </TouchableOpacity>
  </View>
)

    return(
      <SafeAreaView >
    <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginTop:height *0.1 }}>
    < Pressable
      onPress={(onClick) }
       style={({ pressed }) => []}
      >         
       {({ pressed }) => (
        <Text  style={[styles.text,{fontWeight:  pressed ?  'bold' :  'normal' }]}>
             {'Account Information'}
          </Text>
              )}
      </Pressable>
      { state ? <Results /> : null }
      < Pressable
      onPress={() => navigation.navigate('Notification')}>         
      {({ pressed }) => (
    <Text  style={[styles.text,{fontWeight:  pressed 
             ?  'bold' 
             :  'normal' } ]}>
    {'Notification'}
    </Text>
        )}
</Pressable>
< Pressable

onPress={() => navigation.navigate('About')}
style={({ pressed }) => [
  ]}
>         
 {({ pressed }) => (
    <Text  style={[styles.text,{fontWeight:  pressed 
             ?  'bold' 
             :  'normal' }]}>
      {' About App'}
    </Text>
        )}
</Pressable>
< Pressable

onPress={() => navigation.navigate('Chat')}
style={({ pressed }) => [
  ]}
>         
 {({ pressed }) => (
    <Text style={[styles.text, {fontWeight:  pressed 
             ?  'bold' 
             :  'normal' } ]}>
      {' Chat'}
    </Text>
        )}
</Pressable>
< Pressable

onPress={() => navigation.navigate('Preferences')}
style={({ pressed }) => [

  ]}
>         
 {({ pressed }) => (
    <Text style={[styles.text,{fontWeight:  pressed 
             ?  'bold' 
             :  'normal' }]}>
      {' Preferences'}
    </Text>
        )}
</Pressable>
 
  </View>
  </SafeAreaView>
);

}

function Membership() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
  function Username() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }

  function ChangePassword() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }

  function Notifications() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
  
function AboutApp() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
  function Chat() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
  function Preferences() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    title:{
      fontSize: 18,
      marginLeft: width * 0.10 ,
      padding: height * 0.0035, 
      fontFamily:"Montserrat_400Regular",
    },
    text: {
      marginLeft: width * 0.03,
      fontSize: 22,   
      paddingTop: height * 0.05,   
      fontFamily:"Montserrat_400Regular",
     },
  });

  const Stack = createNativeStackNavigator();



  function UserSetting() {
    return (
      <NavigationContainer >
       
        <Stack.Navigator
  >
        
          <Stack.Screen 
          name="Settings"
          component={UserMain}
        />
  
              
          <Stack.Screen name="Membership" component={Membership} />
          <Stack.Screen name="Change Password" component={ChangePassword} />
          <Stack.Screen name="Username" component={Username} />
          <Stack.Screen name="Notification" component={Notifications} />
          <Stack.Screen name="About" component={AboutApp} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Preferences" component={Preferences} />
        </Stack.Navigator>  
       
      </NavigationContainer>
    );
  }
  export default UserSetting;