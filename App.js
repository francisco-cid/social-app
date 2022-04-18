import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Axios from 'axios';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//-----------IMPORT SCREENS ----------------------
import UserProfileScreen from './app/screens/UserProfileScreen';
import MyProfileScreen from './app/screens/MyProfileScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import UserFeedScreen from './app/screens/UserFeedScreen';
import GroupFeedScreen from './app/screens/GroupFeedScreen';
import RegistrationScreen from './app/screens/RegistrationScreen';
// import VerificationScreen from './app/screens/VerificationScreen';
import RegistrationScreen1 from './app/screens/RegistrationScreen1';
import RegistrationScreen2 from "./app/screens/RegistrationScreen2";
import UploadScreen from './app/screens/PhotoUpload';
import EditProfileDone from './app/screens/EditProfileDone';
// import MyProfileScreen from "./app/screens/MyProfileScreen";
import {NavigationContainer} from "@react-navigation/native";
import RootStack from "./app/components/NavigationStacks.js";
import Tabs from "./app/components/NavigationStacks.js";
// import UserFeedScreen from './app/screens/UserFeedScreen';
import EditProfileScreen from "./app/screens/EditProfileScreen";
import FilterScreen from "./app/screens/FilterScreen";
// import Header from './app/screens/Header';
import GroupPublicScreen from "./app/screens/GroupPublicScreen";
import GroupJoinedScreen from "./app/screens/GroupJoinedScreen";
import GroupApplicantsScreen from "./app/screens/GroupApplicantsScreen";
import GroupPrivatePhotosScreen from "./app/screens/GroupPrivatePhotosScreen";
import ApplicantUserProfileScreen from "./app/screens/ApplicantUserProfileScreen";
import FullSizeImage from "./app/components/FullSizeImage";
// import UserSetting from './app/screens/UserSetting';

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
import { Monoton_400Regular } from '@expo-google-fonts/monoton';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
Axios.defaults.baseURL = 'http://192.168.1.227:8000';
export default function App() {
  let [fontsLoaded] = useFonts({
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
    Monoton_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
  return(
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack/>
        </NavigationContainer>
      </SafeAreaProvider>

      // <NavigationContainer>
      //   <Tabs/>
      // </NavigationContainer>
      // <WelcomeScreen />
      // <UserFeedScreen />
      // <EditProfileScreen />
      // <FilterScreen />
      // <GroupPublicScreen />
      // <GroupJoinedScreen />
      // <GroupFeedScreen/>
      // <GroupApplicantsScreen />
      // <GroupPrivatePhotosScreen />
      // <ApplicantUserProfileScreen />
      // <UserProfileScreen />
      // <MyProfileScreen />
      // <RegistrationScreen />

  );
}