import React, {useState} from 'react';
import Axios from 'axios';
import {Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
function WelcomeScreen({navigation}) {
    // const [loginValue, setLogin] = useState('');
    // const [passwordValue, setPassword] = useState('');
    const [credentials, setCredentials] = useState({"login":"", "password":""});
    const inputLoginChangeHandler = (inputName, inputValue) => {
        setCredentials((prevState)=> ({
            ...prevState,
            [inputName] : inputValue
        }));
    }
    function onSuccess(){
        console.log('login success')
        navigation.navigate('Main')
    }

    function onFailure(error){
        if (error.response.status == 404){
            console.log('user not found 404')
            Alert.alert("User Not Found",
                "The login information entered did not match any registered user." +
                "Please sign up as a new user.")
        }
        else if (error.response.status == 401){
            console.log('login and password did not match 401')
            Alert.alert("Incorrect Credentials",
                "Login credentials did not match. Please try again or reset your password.")
        }
        else {
            console.log('unexpected error')
            Alert.alert("Oops!",
                "Something went wrong. Tell the developers to fix it.")
        }
    }
    function onPress(){
        // Axios.post('/api/verify',{
        //     login:loginValue,
        //     password:passwordValue
        // }).then(onSuccess).catch(error=> onFailure(error))
        Axios.post('/api/verify',
            credentials
        ).then(onSuccess).catch(error=> onFailure(error))
    }
    return (
        <View style={{flex:1}}>
            <LinearGradient colors={["#5DD1B5","#2958FF"]} style={{flex:1}}>
                {/*------------------------------------------------------------------------------*/}
                {/*LOGO*/}
                {/*-----------------------------------------------------------------------------*/}
                <SafeAreaView style={{ flex: 1 }} edges={["right","left"]}>
                    <View style={{
                        height: "40%", //300
                        paddingTop: "18%", //100
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            fontFamily: 'Monoton_400Regular',
                            fontSize: 100,
                            color: "white"
                        }}>
                            ORGY
                        </Text>
                    </View>
                    {/*------------------------------------------------------------------------------*/}
                    {/*USERNAME TEXT INPUT*/}
                    {/*-----------------------------------------------------------------------------*/}
                    <View style={{
                        height: "5%", //40
                        marginTop: "8%", //40
                        marginLeft: "10%", //40
                        justifyContent: "center"
                    }}>
                        <TextInput
                            style={{
                                fontSize: 20,
                                fontFamily: 'Montserrat_400Regular',
                                color: 'white'
                            }}
                            placeholder="Username or email"
                            placeholderTextColor='rgba(255,255,255,0.6)'
                            autoCapitalize='none'
                            autoCorrect={false}
                            // onChangeText={text => setLogin(text)}
                            onChangeText={text => inputLoginChangeHandler('login',text)}
                        />
                    </View>
                    <View
                        style={{
                            marginLeft: "10%", //40
                            marginRight: "10%", //40
                            borderBottomColor: '#ffffff',
                            borderBottomWidth: 1,
                        }}
                    />
                    {/*------------------------------------------------------------------------------*/}
                    {/*PASSWORD TEXT INPUT*/}
                    {/*-----------------------------------------------------------------------------*/}
                    <View style={{
                        height: "5%", //40
                        marginTop: "8%", //40
                        marginLeft: "10%", //40
                        justifyContent: "center"
                    }}>
                        <TextInput
                            style={{
                                fontSize: 20,
                                fontFamily: 'Montserrat_400Regular',
                                color: 'white'
                            }}
                            placeholder="Password"
                            placeholderTextColor='rgba(255,255,255,0.6)'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            // onChangeText={(text)=>setPassword(text)}
                            onChangeText={text => inputLoginChangeHandler('password',text)}
                        />
                    </View>
                    <View
                        style={{
                            marginLeft: "10%", //40
                            marginRight: "10%", //40
                            borderBottomColor: '#ffffff',
                            borderBottomWidth: 1,
                        }}
                    />
                    {/*------------------------------------------------------------------------------*/}
                    {/*LOG IN*/}
                    {/*-----------------------------------------------------------------------------*/}
                    <View style={{
                        marginLeft: "10%", //40
                        marginRight: "10%", //40
                        marginTop: "15%" //75
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: "#ffffff",
                            padding: "2.5%", //10
                            // opacity: (!Boolean(loginValue && passwordValue)) ? 0.5:1
                            opacity: (!Boolean(credentials.login && credentials.password)) ? 0.5:1
                        // }} onPress={onPress} disabled={!Boolean(loginValue && passwordValue)}>
                        }} onPress={onPress} disabled={!Boolean(credentials.login && credentials.password)}>
                            <Text style={{
                                fontFamily: "Montserrat_700Bold",
                                textAlign:"center",
                                fontSize: 25,
                                color: '#0090ff'}}>
                                Log In
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/*------------------------------------------------------------------------------*/}
                    {/*SIGN UP AND FORGOT PASSWORD*/}
                    {/*-----------------------------------------------------------------------------*/}
                    <View style={{
                        marginTop:"50%", //180
                        flexDirection: 'row'}}>
                        <TouchableOpacity style={{paddingLeft:"10.5%"}} onPress={() => navigation.navigate('Registration')}>
                            <Text style={{
                                fontFamily: 'Montserrat_400Regular',
                                fontSize: 16,
                                color: "white"
                            }}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{paddingLeft:"31%"}}>
                            <Text style={{
                                fontFamily: 'Montserrat_400Regular',
                                fontSize: 16,
                                color: "white"
                            }}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
}

export default WelcomeScreen;