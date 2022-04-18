import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {Dimensions, Text, TouchableOpacity} from "react-native";
// ---------------- import screens ----------------------------
import WelcomeScreen from './../screens/WelcomeScreen';
import UserFeedScreen from './../screens/UserFeedScreen';
import GroupFeedScreen from './../screens/GroupFeedScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import MyProfileScreen from "../screens/MyProfileScreen";
import GroupPublicScreen from "../screens/GroupPublicScreen";
import BlankScreen from "../screens/BlankScreen";
import {useNavigation} from '@react-navigation/native';
import RegistrationScreen from "../screens/RegistrationScreen";
import RegistrationScreen1 from "../screens/RegistrationScreen1";
import RegistrationScreen2 from "../screens/RegistrationScreen2";
import UploadScreen from "../screens/PhotoUpload";
import EditProfileScreen from "../screens/EditProfileScreen";
import FullSizeImage from "./FullSizeImage";
import MyGroups from "../screens/MyGroupsScreen"
import GroupJoined from "../screens/GroupJoinedScreen"
import {createStackNavigator} from "@react-navigation/stack";
//-------------------------------------------------------------
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

function RootStack(){
    const navigation = useNavigation();
    return(
        <Stack.Navigator
            initialRouteName={"Auth"}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Main" component={Tabs}/>
            <Stack.Screen name = "Auth" component={AuthStack} navigation={navigation}/>
        </Stack.Navigator>
    );
}

function AuthStack({navigation}){
    return (
        <Stack.Navigator
            initialRouteName={"Welcome"}
            screenOptions={{
                headerShown:false,
                headerStyle: {
                    height: windowHeight * 0.11,
                },
                headerBackground: () => (
                    <LinearGradient colors={["#5DD1B5","#2958FF"]} style={{flex:1}} start={[1, 0]} end={[0, 0]}/>
                ),
                headerTintColor: '#5DD1B5' //'#fff'
            }}
        >
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="Registration" component={RegistrationScreen} options={{
                headerShown:true,
                headerTitle: "ORGY",
                headerTitleStyle:{
                    fontFamily: 'Monoton_400Regular',
                    fontSize: 40,
                    color: "white"
                },
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 15 }}
                    >
                        <Ionicons name="ios-chevron-back-outline" size={40} color="white" />
                    </TouchableOpacity>
                )
            }}/>
            <Stack.Screen name="Registration1" component={RegistrationScreen1} options={{
                headerShown:true,
                headerTitle: "ORGY",
                headerTitleStyle:{
                    fontFamily: 'Monoton_400Regular',
                    fontSize: 40,
                    color: "white"
                },
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 15 }}
                    >
                        <Ionicons name="ios-chevron-back-outline" size={40} color="white" />
                    </TouchableOpacity>
                )
            }}/>
            <Stack.Screen name="Registration2" component={RegistrationScreen2} options={{
                headerShown:true,
                headerTitle: "ORGY",
                headerTitleStyle:{
                    fontFamily: 'Monoton_400Regular',
                    fontSize: 40,
                    color: "white"
                },
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 15 }}
                    >
                        <Ionicons name="ios-chevron-back-outline" size={40} color="white" />
                    </TouchableOpacity>
                )
            }}/>
            <Stack.Screen name="PhotoUpload" component={UploadScreen} />
        </Stack.Navigator>
    );
}

function Tabs() {
    return (
        <Tab.Navigator
            initialRouteName={"UserStack"}
            screenOptions={{
                tabBarStyle: { position: 'relative' },
                tabBarShowLabel: false,
                headerStyle: {
                    height: windowHeight * 0.11,
                },
                headerTitle: "ORGY",
                headerTitleStyle:{
                    fontFamily: 'Monoton_400Regular',
                    fontSize: 40,
                    color: "white"
                },
                tabBarBackground: () => (
                    <LinearGradient colors={["#5DD1B5","#2958FF"]} style={{flex:1}} start={[1, 0]} end={[0, 0]}/>
                ),
                headerBackground: () => (
                    <LinearGradient colors={["#5DD1B5","#2958FF"]} style={{flex:1}} start={[1, 0]} end={[0, 0]}/>
                ),
                headerTintColor: '#fff',
            }}
            backBehavior={"history"}
        >
            <Tab.Screen name="Chat" component={BlankScreen} options={{
                tabBarIcon: ({focused}) => {
                    let iconSize;
                    iconSize = focused ? 45 : 30
                    return <MaterialIcons name="chat-bubble-outline" size={iconSize} color="white" />
                }
            }}/>
            <Tab.Screen name="Invitations" component={BlankScreen} options={{
                tabBarIcon: ({focused}) => {
                    let iconSize;
                    iconSize = focused ? 45 : 30
                    return <MaterialIcons name="mail-outline" size={iconSize} color="white" />
                }
            }}/>
            <Tab.Screen name="UserStack" component={UserStack} options={{
                headerShown: false,
                tabBarIcon: ({focused}) => {
                    let iconSize;
                    iconSize = focused ? 45 : 30
                    return <MaterialIcons name="search" size={iconSize} color="white" />
                }
            }}/>
            <Tab.Screen name="GroupStack" component={GroupStack} options={{
                headerShown: false,
                tabBarIcon: ({focused}) => {
                    let iconSize;
                    iconSize = focused ? 45 : 30
                    return <MaterialIcons name="people-outline" size={iconSize} color="white" />
                }
            }}/>
            <Tab.Screen name="ProfileStack" component={ProfileStack} options={{
                headerShown: false,
                tabBarIcon: ({focused}) => {
                    let iconSize;
                    iconSize = focused ? 45 : 30
                    return <MaterialIcons name="person-outline" size={iconSize} color="white" />
                }
            }}/>
        </Tab.Navigator>
    );
}

function UserStack(){
    return(
        <Stack.Navigator
            initialRouteName={"UserFeed"}
            screenOptions={{
                headerShown:true,
                headerStyle: {
                    height: windowHeight * 0.11,
                },
                headerTitle: "ORGY",
                headerTitleStyle:{
                    fontFamily: 'Monoton_400Regular',
                    fontSize: 40,
                    color: "white"
                },
                headerBackground: () => (
                    <LinearGradient colors={["#5DD1B5","#2958FF"]} style={{flex:1}} start={[1, 0]} end={[0, 0]}/>
                ),
                headerTintColor: '#fff',
            }}>
            <Stack.Screen name="UserFeed" component={UserFeedScreen} options={{
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 15 }}
                    >
                        <MaterialIcons name="search" size={40} color="white" />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        style={{ marginRight: 15 }}
                    >
                        <MaterialIcons name="filter-list" size={40} color="white"/>
                    </TouchableOpacity>
                )
            }}/>
            <Stack.Screen name="UserProfile" component={UserProfileScreen} options={({navigation})=>({
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 15 }}
                    >
                        <Ionicons name="ios-chevron-back-outline" size={40} color="white" />
                    </TouchableOpacity>
                )
            })} />
            <Stack.Screen name="FullSizeImage" component={FullSizeImage} options={({navigation})=>({
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 15 }}
                    >
                        <Ionicons name="ios-chevron-back-outline" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })} />
        </Stack.Navigator>
    );
}

function GroupStack(){
    return(
        <Stack.Navigator
            initialRouteName={"GroupFeedScreen"}
            screenOptions={{
                headerShown:true,
                headerStyle: {
                    height: windowHeight * 0.11,
                },
                headerTitle: "ORGY",
                headerTitleStyle:{
                    fontFamily: 'Monoton_400Regular',
                    fontSize: 40,
                    color: "white"
                },
                headerBackground: () => (
                    <LinearGradient colors={["#5DD1B5","#2958FF"]} style={{flex:1}} start={[1, 0]} end={[0, 0]}/>
                ),
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen name="GroupFeedScreen" component={GroupFeedScreen} options={{
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 15 }}
                    >
                        <MaterialIcons name="search" size={40} color="white" />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        style={{ marginRight: 15 }}
                    >
                        <MaterialIcons name="filter-list" size={40} color="white"/>
                    </TouchableOpacity>
                ),
                tabBarIcon: ({focused}) => (
                    <MaterialIcons name="people-outline" size={30} color="white" />
                ),
            }}/>
            <Stack.Screen name="GroupPublic" component={GroupPublicScreen} options={({navigation})=>({
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                        style={{ marginLeft: 15 }}
                    >
                        <Ionicons name="ios-chevron-back-outline" size={40} color="white" />
                    </TouchableOpacity>
                ),
                })} />
            <Stack.Screen name="FullSizeImage" component={FullSizeImage} options={({navigation})=>({
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 15 }}
                    >
                        <Ionicons name="ios-chevron-back-outline" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} options={({navigation})=>({
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 15 }}
                    >
                        <Ionicons name="ios-chevron-back-outline" size={40} color="white" />
                    </TouchableOpacity>
                )
            })} />
        </Stack.Navigator>
    );
}



function ProfileStack(){
    return(
        <Stack.Navigator
            initialRouteName={"UserFeed"}
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    height: windowHeight * 0.11,
                },
                headerTitle: "ORGY",
                headerTitleStyle: {
                    fontFamily: 'Monoton_400Regular',
                    fontSize: 40,
                    color: "white"
                },
                headerBackground: () => (
                    <LinearGradient colors={["#5DD1B5","#2958FF"]} style={{flex:1}} start={[1, 0]} end={[0, 0]}/>
                ),
                headerTintColor: '#fff',
            }}
        >
            <Tab.Screen name="Profile" component={MyProfileScreen} options={({navigation})=>({
                headerLeft: () => (
                    <></>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("UserSetting")}
                        style={{ marginRight: 15 }}
                    >
                        <MaterialIcons
                            name="settings"
                            size={40}
                            color="white"
                        />
                    </TouchableOpacity>
                )
            })}/>
            <Stack.Screen name="FullSizeImage" component={FullSizeImage} options={({navigation})=>({
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 15 }}
                    >
                        <Ionicons name="ios-chevron-back-outline" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })} />
            <Tab.Screen name="EditProfile" component={EditProfileScreen} options={({navigation})=>({
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 15 }}
                    >
                        <Ionicons name="ios-chevron-back-outline" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })}/>
            <Tab.Screen
                name="MyGroups"
                component={MyGroups}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginLeft: 15 }}
                        >
                            <Ionicons
                                name="ios-chevron-back-outline"
                                size={40}
                                color="white"
                            />
                        </TouchableOpacity>
                    )
                })}
            />
            <Tab.Screen
                name="GroupJoined"
                component={GroupJoined}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginLeft: 15 }}
                        >
                            <Ionicons
                                name="ios-chevron-back-outline"
                                size={40}
                                color="white"
                            />
                        </TouchableOpacity>
                    )
                })}
            />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} options={({navigation})=>({
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 15 }}
                    >
                        <Ionicons name="ios-chevron-back-outline" size={40} color="white" />
                    </TouchableOpacity>
                )
            })} />
        </Stack.Navigator>
    );
}
export default RootStack;