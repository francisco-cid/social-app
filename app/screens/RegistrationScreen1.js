import React, { useState } from "react";
import {
  ScrollView,
  Alert,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { registrationStyles } from "./RegistrationScreen";

const InfoBox = (props) => (
  <View>
    <Text style={registrationStyles.text}>{props.text}</Text>
  </View>
);

function RegistrationScreen1(props) {
  const { email, password, username, firstName, lastName, displayName } =
    props.route.params;
  const [profDesc, setProfDesc] = useState("");

  function onSubmit() {
    if (!profDesc.trim()) {
      Alert.alert("Please type out a description for your profile.");
    } else {
      props.navigation.navigate("Registration2", {
        email: email,
        password: password,
        username: username,
        firstName: firstName,
        lastName: lastName,
        displayName: displayName,
        profDesc: profDesc,
      });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["right", "left"]}>
      <ScrollView style={{ marginTop: 0 }}>
        <View style={registrationStyles.info}>
          <InfoBox text={"Profile description (tell others about yourself!)"} />
          <TextInput
            style={registrationStyles.input}
            maxLength={280}
            multiline={true}
            onChangeText={(text) => setProfDesc(text)}
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

export default RegistrationScreen1;
