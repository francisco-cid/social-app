import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import MultiSelect from "react-native-multiple-select";
import axios from "axios";
import { PaddedDropdown } from "./Dropdown";
import RNPickerSelect from "react-native-picker-select";
import { registrationStyles } from "./RegistrationScreen";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
const inputDropdownWidth = 10;
const dim = Dimensions.get("window");
// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height;

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };
  return [isShowing, toggle];
};

const items = [
  { id: "man", name: "Man" },
  { id: "transm", name: "Transgender Man" },
  { id: "transw", name: "Transgender Woman" },
  { id: "woman", name: "Woman " },
  { id: "nonbin", name: "Nonbinary" },
];
const bodyType = [
  { id: "thin", name: "Thin/Slim" },
  { id: "athletic", name: "Athletic" },
  { id: "toned", name: "Toned" },
  { id: "muscular", name: "Muscular/built" },
  { id: "thick", name: "Thick/Stocky " },
  { id: "avg", name: "Average " },
  { id: "curvy", name: "Curvy " },
  { id: "plus", name: "Plus-Sized " },
];

function useCalendar() {
  const [date, setDate] = useState(
    new Date(
      new Date().getFullYear() - 21,
      new Date().getMonth(),
      new Date().getDay()
    )
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === "ios");
    if (mode == "date") {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
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

function multipleDropdown() {
  const [interestedSelectedItems, setInterestedSelectedItems] = useState([]);
  const [bodySelectedItems, setbodyselectedItems] = useState([]);

  const onSelectedInterestItemsChange = (interestedSelectedItems) => {
    // Set Selected Items
    setInterestedSelectedItems(interestedSelectedItems);
  };
  const onSelectedBodyTypeChange = (bodySelectedItems) => {
    // Set Selected Items
    setbodyselectedItems(bodySelectedItems);
  };

  return {
    interestedSelectedItems,
    bodySelectedItems,
    onSelectedInterestItemsChange,
    onSelectedBodyTypeChange,
  };
}

function RegistrationScreen2(props) {
  const navigation = useNavigation();
  const [metric, setState] = useState("in");
  const {
    email,
    password,
    username,
    firstName,
    lastName,
    displayName,
    profDesc,
  } = props.route.params;
  const dropDown = multipleDropdown();
  const [gender, setGender] = useState(null);
  const [std, setSTD] = useState(null);
  const [stdDesc, setSTDDesc] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [pronoun, setPronoun] = useState(null);
  const [sexPost, setSexPost] = useState(null);
  const birthdayCalendar = useCalendar();
  const testCalendar = useCalendar();
  const birthdateDisplay = `${
    birthdayCalendar.date.getMonth() + 1
  }-${birthdayCalendar.date.getDate()}-${birthdayCalendar.date.getFullYear()}`;
  const testedDateDisplay = `${testCalendar.date.getDate()}/${
    testCalendar.date.getMonth() + 1
  }/${testCalendar.date.getFullYear()}`;
  const metricDict = { ft: "in", m: "cm" };
  const metricOptions = ["ft", "m"];

  function onSubmit({ navigation }) {
    const birthdate = `${birthdayCalendar.date.getFullYear()}-${(
      birthdayCalendar.date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${birthdayCalendar.date
      .getDate()
      .toString()
      .padStart(2, "0")}`;
    const testdate = `${testCalendar.date.getFullYear()}
      /${(testCalendar.date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${testCalendar.date
      .getDate()
      .toString()
      .padStart(2, "0")}`;

    if (!gender.trim()) {
      Alert.alert("Please indicate which gender you are.");
    } else if (dropDown.interestedSelectedItems.length < 1) {
      Alert.alert("Please indicate which gender(s) you're interested in.");
    } else {
      axios
        .post("/api/users", {
          email: email,
          password: password,
          username: username,
          first_name: firstName,
          last_name: lastName,
          display_name: displayName,
          pronouns: pronoun,
          gender: gender,
          birth_date: birthdate,
          gender_pref: dropDown.interestedSelectedItems,
          body_type: dropDown.bodySelectedItems,
          have_std: std,
          std_date: testdate,
          std_desc: stdDesc,
          height: height,
          weight: weight,
          sex_position: sexPost,
          prof_desc: profDesc,
          avatar_photo: "https://i.ytimg.com/vi/JilHZ_DdBYg/maxresdefault.jpg",
          photos: {
            public: [
              "https://cdn.britannica.com/54/128454-050-6442E633/Hillary-Rodham-Clinton-2009.jpg",
              "https://www.washingtonian.com/wp-content/uploads/2020/05/Hillary_Clinton_healthcare_presentation_53520u_cropped1.jpg",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGthlZkZsChrTOHvpRXRk8Y9_msYI72YDtw&usqp=CAU",
              "https://media.glamour.com/photos/582514aff3a4c6895754b464/6:7/w_552,h_644,c_limit/hillary-clinton-woods-hiking.jpg",
            ],
            private: [
              "https://whyy.org/wp-content/uploads/2020/07/Hillary_Clinton_30648676192.jpg",
              "https://s-media-cache-ak0.pinimg.com/564x/f9/95/d7/f995d7b1c09e8227364c8b1a190ee43c.jpg",
              "https://s7d2.scene7.com/is/image/TWCNews/hillary_clinton_2016jpg",
            ],
          },
          socials: { twitter: "@sampletwitter", instagram: "@sampleinstagram" },
        })
        .catch((error) => console.log(error.message))
        .then((response) => console.log(response));
      navigation.navigate("Main");
    }
  }

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <SafeAreaView edges={["right", "left"]}>
        <ScrollView>
          <View style={registrationStyles.info}>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ fontFamily: "Montserrat_400Regular", fontSize: 14 }}
              >
                *Required
              </Text>
              <TouchableOpacity onPress={birthdayCalendar.showDatepicker}>
                <Text style={registrationStyles.text}>Birthdate*</Text>
                <Text style={registrationStyles.input}>Tap To Select</Text>
              </TouchableOpacity>
            </View>
            {birthdayCalendar.show && (
              <DateTimePicker
                testID="dateTimePicker1"
                value={birthdayCalendar.date}
                mode={birthdayCalendar.mode}
                display="spinner"
                maximumDate={
                  new Date(
                    new Date().getFullYear() - 21,
                    new Date().getMonth(),
                    new Date().getDay()
                  )
                }
                onChange={birthdayCalendar.onChange}
              />
            )}

            <Text style={registrationStyles.text}>Pronouns</Text>
            <TextInput
              style={registrationStyles.input}
              onChangeText={(text) => setPronoun(text)}
            />

            <Text style={registrationStyles.text}>Gender*</Text>
            <View style={styles.dropDown}>
              <RNPickerSelect
                placeholder={{
                  label: "Tap to select your gender …",
                  value: null,
                }}
                onValueChange={(gender) => setGender(gender)}
                style={{
                  inputAndroid: registrationStyles.input,
                  inputIOS: registrationStyles.input,
                  placeholder: registrationStyles.input,
                }}
                items={[
                  { label: "Man", value: "Man" },
                  { label: "Transgender Man", value: "Transgender Man" },
                  { label: "Woman", value: "Woman" },
                  { label: "Transgender Woman", value: "Transgender Woman" },
                  { label: "Nonbinary", value: "Nonbinary" },
                ]}
              />
            </View>

            <Text style={registrationStyles.text}>
              Who are you interested in?*
            </Text>
            <ScrollView horizontal={true} alwaysBounceHorizontal={false}>
              <View style={{ marginTop: 5, width: dim.width - 30 }}>
                <MultiSelect
                  items={items}
                  uniqueKey="id"
                  onSelectedItemsChange={dropDown.onSelectedInterestItemsChange}
                  selectedItems={dropDown.interestedSelectedItems}
                  selectText="Pick Items"
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={(text) => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  displayKey="name"
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
            </ScrollView>

            <Text style={registrationStyles.text}>Sexual Position</Text>
            <View style={styles.dropDown}>
              <RNPickerSelect
                placeholder={{ label: "Tap to select a position …" }}
                onValueChange={(sexPost) => setSexPost(sexPost)}
                style={{
                  inputAndroid: registrationStyles.input,
                  inputIOS: registrationStyles.input,
                  placeholder: registrationStyles.input,
                }}
                items={[
                  { label: "Top", value: "top" },
                  { label: "Bottom", value: "bottom" },
                  { label: "Vers", value: "vers" },
                ]}
              />
            </View>

            <Text style={registrationStyles.text}>Body Type</Text>
            <ScrollView horizontal={true} alwaysBounceHorizontal={false}>
              <View style={{ marginTop: 5, width: dim.width - 30 }}>
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
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  displayKey="name"
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
            </ScrollView>

            <Text style={registrationStyles.text}>Do you have any STDs?</Text>
            <View style={styles.dropDown}>
              <RNPickerSelect
                placeholder={{ label: "Tap to answer." }}
                onValueChange={(std) => setSTD(std)}
                style={{
                  inputAndroid: registrationStyles.input,
                  inputIOS: registrationStyles.input,
                  placeholder: registrationStyles.input,
                }}
                items={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
              />
            </View>

            <Text style={registrationStyles.text}>
              If yes, please describe your STD(s).
            </Text>
            <TextInput
              style={registrationStyles.input}
              onChangeText={(text) => setSTDDesc(text)}
            />

            <View>
              <TouchableOpacity onPress={testCalendar.showDatepicker}>
                <Text style={registrationStyles.text}>
                  When was the last time you were tested?
                </Text>
                <Text style={registrationStyles.input}>Tap to select</Text>
              </TouchableOpacity>
            </View>
            {testCalendar.show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={testCalendar.date}
                mode={testCalendar.mode}
                is24Hour={true}
                display="spinner"
                maximumDate={new Date()}
                onChange={testCalendar.onChange}
              />
            )}

            {/* Height - double input (ft, in / m, cm) */}
            <Text style={registrationStyles.text}>Height</Text>
            <View style={[registrationStyles.row, { marginRight: 130 }]}>
              <View
                style={{
                  width: dim.width * 0.2,
                  marginRight: inputDropdownWidth,
                }}
              >
                <TextInput
                  style={registrationStyles.input}
                  keyboardType="numeric"
                  onChangeText={(feet) => setHeight(feet * 12)}
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
                  onChangeText={(inches) => setHeight(height + Number(inches))}
                />
              </View>

              {/* above dropdown will affect the text below too */}
              <Text style={styles.eText}>{metric}</Text>
            </View>

            {/* Weight - single input only (lb/kg) */}
            <Text style={registrationStyles.text}>Weight</Text>
            <View style={[registrationStyles.row, { marginRight: 230 }]}>
              <View
                style={{
                  width: dim.width * 0.25,
                  marginRight: inputDropdownWidth,
                }}
              >
                <TextInput
                  style={registrationStyles.input}
                  keyboardType="numeric"
                  onChangeText={(weight) => setWeight(weight)}
                />
              </View>
              <PaddedDropdown
                textStyle={styles.eText}
                defaultValue={"lbs"}
                options={["lbs", "kg"]}
              />
            </View>

            <TouchableOpacity onPress={() => onSubmit({ navigation })}>
              <View style={registrationStyles.row}>
                <Text style={registrationStyles.next}>Continue</Text>
                <FontAwesome5
                  name="arrow-right"
                  size={25}
                  color="#2958FF"
                  style={{ marginHorizontal: 5 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  dropDown: {
    marginTop: 5,
  },
  eText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 23,
    color: "black",
    opacity: 0.35,
  },
});

export default RegistrationScreen2;
