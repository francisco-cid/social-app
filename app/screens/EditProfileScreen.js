import React, {useEffect, useState,useLayoutEffect} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Dimensions,
    Text,
    TextInput,
    FlatList,
    ImageBackground,
    ScrollView, TouchableOpacity
} from 'react-native';
import {Image} from "react-native";
import Axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import {registrationStyles} from "./RegistrationScreen";
import DateTimePicker from "@react-native-community/datetimepicker";
import MultiSelect from "react-native-multiple-select";
import {PaddedDropdown} from "./Dropdown";
import Carousel from "../components/Carousel";
const dim = Dimensions.get("window");
const inputDropdownWidth = 10;
const metricDict = { ft: "in", m: "cm" };
const metricOptions = ["ft", "m"];

/**
 * Addition of save button at bottom (efficiency purposes?)
 * Maybe change order of header gradient or add double gradient?
 */
const interestedItems = [
    {id: "man", name: "Man"},
    {id: "transm", name: "Transgender Man"},
    {id: "transw", name: "Transgender Woman"},
    {id: "woman", name: "Woman "},
    {id: "nonbin", name: "Nonbinary"},
];
const bodyType = [
    {id: "thin", name: "Thin/Slim"},
    {id: "athletic", name: "Athletic"},
    {id: "toned", name: "Toned"},
    {id: "muscular", name: "Muscular/built"},
    {id: "thick", name: "Thick/Stocky "},
    {id: "avg", name: "Average "},
    {id: "curvy", name: "Curvy "},
    {id: "plus", name: "Plus-Sized "},
];

export default function EditProfileScreen(props) {
    const navigation = props.navigation;
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={onPress}
                    style={{ marginRight: 15 }}
                >
                    <Text style={{
                        fontFamily: 'Montserrat_500Medium',
                        fontSize: 20,
                        color: "white",
                        // paddingTop: height * 0.03,
                    }}>
                        Done
                    </Text>
                </TouchableOpacity>
            ),
        });
    })
    const [userInfo, setUserInfo] = useState({
        "display_name": null,
        "prof_desc": null, "gender": null, "pronouns": null, "have_std": null, "sex_position": null, "gender_pref":null,
        "std_desc":null, "height":null, "weight":null
    });
    const reqBody = {};
    const profile = props.route.params.profile;
    if (profile.have_std == null) {
        profile.have_std = "";
    }
    if (profile.sex_position == null) {
        profile.sex_position = "";
    }
    const currentFeet = Math.floor(profile.height / 12)
    const currentInches = profile.height - (12 * Math.floor(profile.height / 12))
    let currentWeight = "";
    if (profile.weight !== null){
        currentWeight = profile.weight.toString();
    }
    const [interestedSelectedItems, setInterestedSelectedItems] = useState(profile.gender_pref);
    const [bodySelectedItems, setbodyselectedItems] = useState(profile.body_type);
    const inputChangeHandler = (inputName, inputValue) => {
        setUserInfo((prevState) => ({
            ...prevState,
            [inputName]: inputValue
        }));
    }

    function onSuccess() {
        console.log('edit profile success')
        props.navigation.goBack()
    }

    function onPress() {
        for (const key of Object.keys(userInfo)) {
            if (userInfo[key] != null) {
                reqBody[key] = userInfo[key];
            }
        }
        console.log(reqBody)
        Axios.put('/api/users/edit',
            reqBody
        ).then(onSuccess)
    }

    const genderValueLabel = {
        "man": "Man", "woman": "Woman", "transm": "Transgender Man",
        "transw": "Transgender Woman", "nonbin": "Non-binary"
    }
    const stdValueLabel = {true: "Yes", false: "No", "": "Prefer not to say"}
    const sexpValueLabel = {"top": "Top", "bottom": "Bottom", "vers": "Vers", "": "Not applicable/Prefer not to say"}
    const [date, setDate] = useState(new Date(profile.std_date));
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [metric, setState] = useState("in");
    function createGenderItems() {
        const options = [];
        for (const key of Object.keys(genderValueLabel)) {
            if (key !== profile.gender) {
                options.push(key);
            }
        }
        return options.map(x => ({label: genderValueLabel[x], value: x}));
    }

    function createSexpItems() {
        const options = [];
        for (const key of Object.keys(sexpValueLabel)) {
            if (key !== profile.sex_position) {
                options.push(key);
            }
        }
        return options.map(x => ({label: sexpValueLabel[x], value: x}));
    }

    function createSTDItems() {
        const options = [];
        for (const key of Object.keys(stdValueLabel)) {
            if (key !== profile.have_std.toString()) {
                if (key === "true") {
                    options.push(true);
                } else if (key === "false") {
                    options.push(false)
                } else {
                    options.push(key)
                }
            }
        }
        return options.map(x => ({label: stdValueLabel[x], value: x}));
    }
    function multipleDropdown() {
        const onSelectedInterestItemsChange = (interestedSelectedItems) => {
            // Set Selected Items
            setInterestedSelectedItems(interestedSelectedItems);
            setUserInfo((prevState) => ({
                ...prevState,
                "gender_pref": interestedSelectedItems
            }));
        };
        const onSelectedBodyTypeChange = (bodySelectedItems) => {
            setbodyselectedItems(bodySelectedItems)
            setUserInfo((prevState) => ({
                ...prevState,
                "body_type": bodySelectedItems
            }));
        }
        return {
            interestedSelectedItems,
            bodySelectedItems,
            onSelectedInterestItemsChange,
            onSelectedBodyTypeChange,
        };
    }
    function useCalendar(){
        const onChange = (event, selectedValue) => {
            setShow(Platform.OS === "ios");
            if (mode == "date") {
                const currentDate = selectedValue;
                setDate(currentDate);
                setUserInfo((prevState) => ({
                    ...prevState,
                    "std_date": date
                }));
            } else {
                const selectedTime = selectedValue || new Date();
                setShow(Platform.OS === "ios");
                setMode("date");
            }
        };

        const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);
        };

        const showDatepicker = () => {
            showMode("date");
        };

        return {
            date,
            showDatepicker,
            show,
            mode,
            onChange,
        };
    }
    const dropDown = multipleDropdown();
    const testCalendar = useCalendar();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{marginTop: 5}}>
                <View style={styles.centering}>
                    <Image source={{uri: profile.avatar_photo}}
                           style={{width: imgDim, height: imgDim, borderRadius: imgDim / 2}}/>
                </View>
                <View style={[styles.centering, {paddingTop: height * 0.02}]}>
                    <Text style={styles.profText}>Change profile picture</Text>
                </View>
                <View style={styles.info}>
                    {/*DISPLAY NAME*/}
                    <View>
                        <Text style={styles.text}>Display name</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={profile.display_name}
                            onChangeText={text => inputChangeHandler('display_name', text)}
                        />
                    </View>
                    {/*PROFILE DESCRIPTION*/}
                    <View>
                        <Text style={styles.text}>Description (400 characters max)</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={profile.prof_desc}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={text => inputChangeHandler('prof_desc', text)}
                        />
                    </View>
                    {/*BODY TYPE*/}
                    <View>
                        <Text style={styles.text}>Body type</Text>
                        <View style={styles.dropDown}>
                            <MultiSelect
                                items={bodyType}
                                uniqueKey="id"
                                onSelectedItemsChange={dropDown.onSelectedBodyTypeChange}
                                selectedItems={dropDown.bodySelectedItems}
                                selectText="Pick Items"
                                onChangeInput={(text) => console.log(text)}
                                tagRemoveIconColor="#CCC"
                                tagBorderColor="#CCC"
                                tagTextColor="#CCC"
                                selectedItemTextColor="#B0B0B0"
                                selectedItemIconColor="#B0B0B0"
                                itemTextColor="#000"
                                displayKey="name"
                                styleTextDropdown="Montserrat_400Regular"
                                searchInputStyle={{ color: "#CCC" }}
                                submitButtonColor="#2958FF"
                                submitButtonText="Submit"
                                altFontFamily="Montserrat_400Regular"
                                fontFamily="Montserrat_400Regular"
                                fontSize={18}
                                itemFontFamily="Montserrat_400Regular"
                                selectedItemFontFamily="Montserrat_400Regular"
                            />
                        </View>
                    </View>
                    {/*GENDER*/}
                    <View style={styles.dropDown}>
                        <Text style={styles.text}>Gender</Text>
                        <RNPickerSelect
                            placeholder={{
                                label: genderValueLabel[profile.gender],
                                value: null,
                            }}
                            onValueChange={(gender) => inputChangeHandler('gender', gender)}
                            style={{
                                inputAndroid: registrationStyles.input,
                                inputIOS: registrationStyles.input,
                                placeholder: registrationStyles.input,
                            }}
                            items={createGenderItems()}
                        />
                    </View>
                    {/*PRONOUNS*/}
                    <View>
                        <Text style={styles.text}>Pronouns</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={profile.pronouns}
                            onChangeText={text => inputChangeHandler('pronouns', text)}
                        />
                    </View>
                    {/*SEXUAL ORIENTATION*/}
                    <View>
                        <Text style={styles.text}>Who are you interested in?</Text>
                        <View style={styles.dropDown}>
                            <MultiSelect
                                items={interestedItems}
                                uniqueKey="id"
                                onSelectedItemsChange={dropDown.onSelectedInterestItemsChange}
                                selectedItems={dropDown.interestedSelectedItems}
                                selectText="Pick Items"
                                searchInputPlaceholderText="Search Items..."
                                onChangeInput={(text) => console.log(text)}
                                tagRemoveIconColor="#CCC"
                                tagBorderColor="#CCC"
                                tagTextColor="#CCC"
                                selectedItemTextColor="#B0B0B0"
                                selectedItemIconColor="#B0B0B0"
                                itemTextColor="#000"
                                displayKey="name"
                                styleTextDropdown="Montserrat_400Regular"
                                searchInputStyle={{color: "#CCC"}}
                                submitButtonColor="#2958FF"
                                submitButtonText="Submit"
                                altFontFamily="Montserrat_400Regular"
                                fontFamily="Montserrat_400Regular"
                                fontSize={18}
                                itemFontFamily="Montserrat_400Regular"
                                selectedItemFontFamily="Montserrat_400Regular"
                            />
                        </View>
                    </View>
                    {/*SEXUAL POSITION*/}
                    <View>
                        <Text style={styles.text}>Sexual position</Text>
                        <RNPickerSelect
                            placeholder={{
                                label: sexpValueLabel[profile.sex_position],
                                value: null,
                            }}
                            onValueChange={(sexPost) => inputChangeHandler('sex_position', sexPost)}
                            style={{
                                inputAndroid: registrationStyles.input,
                                inputIOS: registrationStyles.input,
                                placeholder: registrationStyles.input,
                            }}
                            items={createSexpItems()}
                        />
                    </View>
                    {/*HAVE STD*/}
                    <View>
                        <Text style={styles.text}>Do you have an STD?</Text>
                        <RNPickerSelect
                            placeholder={{
                                label: stdValueLabel[profile.have_std],
                                value: null,
                            }}
                            onValueChange={(std) => inputChangeHandler('have_std', std)}
                            style={{
                                inputAndroid: registrationStyles.input,
                                inputIOS: registrationStyles.input,
                                placeholder: registrationStyles.input,
                            }}
                            items={createSTDItems()}
                        />
                    </View>
                    {/*STD Description*/}
                    <View>
                        <Text style={styles.text}>If yes, please describe your STD(s)</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={profile.std_desc}
                            onChangeText={text => inputChangeHandler('std_desc', text)}
                        />
                    </View>
                    {/*STD DATE*/}
                    <View>
                        <TouchableOpacity onPress={testCalendar.showDatepicker}>
                            <Text style={styles.text}>
                                When were you last tested?
                            </Text>
                            <Text style={registrationStyles.input}>
                                {testCalendar.date.getMonth() + 1}/{testCalendar.date.getDate()}/{testCalendar.date.getFullYear()}
                            </Text>
                        </TouchableOpacity>
                        {testCalendar.show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={testCalendar.date}
                                // value={profile.std_date}
                                mode={testCalendar.mode}
                                is24Hour={true}
                                display="spinner"
                                maximumDate={new Date()}
                                onChange={testCalendar.onChange}
                            />
                        )}
                    </View>
                    {/*HEIGHT*/}
                    <View>
                        <Text style={styles.text}>Height</Text>
                        <View style={[styles.row, { marginRight: 130 }]}>
                            <View
                                style={{
                                    width: dim.width * 0.2,
                                    marginRight: inputDropdownWidth,
                                }}
                            >
                                <TextInput
                                    style={registrationStyles.input}
                                    keyboardType="numeric"
                                    defaultValue={currentFeet.toString()}
                                    onChangeText={(feet) => inputChangeHandler("height",feet * 12)}
                                />
                            </View>

                            <View style={{ marginRight: 20 }}>
                                <PaddedDropdown
                                    textStyle={styles.eText}
                                    onSelect={(val) => setState(metricDict[metricOptions[val]])}
                                    defaultValue={"ft"}
                                    options={metricOptions}
                                />
                            </View>

                            <View
                                style={{
                                    width: dim.width * 0.2,
                                    marginRight: inputDropdownWidth,
                                }}
                            >
                                <TextInput
                                    style={registrationStyles.input}
                                    keyboardType="numeric"
                                    defaultValue={currentInches.toString()}
                                    onChangeText={(inches) => inputChangeHandler("height",userInfo.height + Number(inches))}
                                />
                            </View>

                            {/* above dropdown will affect the text below too */}
                            <Text style={styles.eText}>{metric}</Text>
                        </View>
                    </View>
                    {/*WEIGHT*/}
                    <View>
                        <Text style={styles.text}>Weight</Text>
                        <View style={[styles.row, { marginRight: 230 }]}>
                            <View
                                style={{
                                    width: dim.width * 0.25,
                                    marginRight: inputDropdownWidth,
                                }}
                            >
                                <TextInput
                                    style={registrationStyles.input}
                                    keyboardType="numeric"
                                    defaultValue={currentWeight}
                                    onChangeText={(weight) => inputChangeHandler("weight",weight)}
                                />
                            </View>
                            <PaddedDropdown
                                textStyle={styles.eText}
                                defaultValue={"lbs"}
                                options={["lbs", "kg"]}
                            />
                        </View>
                    </View>
                    <View style={[styles.row, {paddingTop: height * 0.08}]}>
                        <Text style={styles.pText}>Your Photos</Text>
                        <Text style={styles.eText}>Edit</Text>
                    </View>

                </View>
                <View style={{ height: 570 }}>
                    <View style={{ height: 500 }}>
                        <Carousel photosList={profile.photos}/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function renderPhoto(obj) {
    return (
        <View style={{padding: profilePad}}>
            <ImageBackground source={{uri: obj.item}}
                             style={{width: imgwidth, height: imgHeight}}>
            </ImageBackground>
        </View>
    );
}


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const imgDim = width * 0.4;
const profilePad = 1;
const imgwidth = (width - 4 * profilePad) / 2;
const imgHeight = height * 0.2;


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
        paddingTop: height * 0.03,
    },

    centering: {
        justifyContent: "center",
        alignItems: "center"
    },

    info: {
        paddingTop: height * 0.05,
        marginLeft: width * 0.05,
    },

    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start"
    },

    pText: {
        // fontFamily: 'Montserrat_500Medium',
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 23,
        color: "blue",
        paddingRight: width * 0.04
    },

    eText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 23,
        color: "gray",
        opacity: 0.35,
    },

    profText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 18,
        color: "black",
    },
    dropDown: {
        marginTop: 5,
    },

});