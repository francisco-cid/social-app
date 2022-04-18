import React, { useState } from "react";
import {
  ScrollView,
  Alert,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  TextInput,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const InfoBox = (props) => (
  <View>
    <Text style={registrationStyles.text}>{props.text}</Text>
  </View>
);

function RegistrationScreen(props) {
  const [emailValue, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [passwordValue, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  function onSubmit() {
    if (!emailValue.trim()) {
      Alert.alert("Please enter an email.");
    } else if (!userName.trim()) {
      Alert.alert("Please enter a username.");
    } else if (!firstName.trim()) {
      Alert.alert("Please enter your first name.");
    } else if (!lastName.trim()) {
      Alert.alert("Please confirm your last name.");
    } else if (!displayName.trim()) {
      setDisplayName(firstName);
    } else if (!passwordValue.trim()) {
      Alert.alert("Please enter a password.");
    } else if (!passwordAgain.trim()) {
      Alert.alert("Please confirm your password.");
    } else if (passwordValue !== passwordAgain) {
      Alert.alert("Password values do not match!");
    } else {
      props.navigation.navigate("Registration1", {
        email: emailValue.trim(),
        password: passwordValue.trim(),
        username: userName.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        displayName: displayName.trim(),
      });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["right", "left"]}>
      <ScrollView style={{ marginTop: 0 }}>
        <View style={registrationStyles.info}>
          <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 14 }}>
            *Required
          </Text>
          <InfoBox text={"Email*"} />
          <TextInput
            style={registrationStyles.input}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setEmail(text)}
          />
          <InfoBox text={"Username*"} />
          <TextInput
            style={registrationStyles.input}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setUserName(text)}
          />
          <InfoBox text={"First name*"} />
          <TextInput
            style={registrationStyles.input}
            autoCorrect={false}
            onChangeText={(text) => setFirstName(text)}
          />
          <InfoBox text={"Last name*"} />
          <TextInput
            style={registrationStyles.input}
            autoCorrect={false}
            onChangeText={(text) => setLastName(text)}
          />
          <InfoBox text={"Display name (if different from first name)"} />
          <TextInput
            style={registrationStyles.input}
            autoCorrect={false}
            onChangeText={(text) => setDisplayName(text)}
          />
          <InfoBox text={"Password*"} />
          <TextInput
            style={registrationStyles.input}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <InfoBox text={"Enter password again*"} />
          <TextInput
            style={registrationStyles.input}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(text) => setPasswordAgain(text)}
          />
        </View>

        <TouchableOpacity onPress={onSubmit}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

export const registrationStyles = StyleSheet.create({
  next: {
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
    fontSize: 22,
    color: "#2958FF",
  },
  label: {
    color: "white",
    margin: 20,
    marginLeft: 0,
  },
  info: {
    marginHorizontal: 15,
  },
  text: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: "black",
    marginTop: height * 0.03,
  },
  row: {
    marginVertical: 36,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  input: {
    fontSize: 24,
    opacity: 0.35,
    fontFamily: "Montserrat_400Regular",
    color: "black",
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    marginVertical: 3,
    padding: 2,
  },
});

export default RegistrationScreen;
