import React from "react";
import { StyleSheet, View, Text, Dimensions, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const genders = {
  woman: "Women",
  man: "Men",
  transw: "Trans women",
  transm: "Trans men",
  nonbin: "Nonbinary",
};
const months = {
  "01": "Jan.",
  "02": "Feb.",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "Aug.",
  "09": "Sept.",
  10: "Oct.",
  11: "Nov.",
  12: "Dec.",
};
const bodyTypes = {
  thin: "Thin",
  avg: "Average",
  athletic: "Athletic",
  toned: "Toned",
  muscular: "Muscular",
  curvy: "Curvy",
  thick: "Thick",
  plus: "Plus-size",
};

function ProfileText(props) {
  const profile = props.profile;
  var socials = [];
  var body = [];
  var genderPref = [];

  Object.keys(profile.socials).forEach((key) =>
    socials.push(
      <View style={{ marginBottom: 5 }} key={key}>
        <Text style={[styles.boldText, styles.capitalizeText]}>{key}</Text>
        <Text style={styles.regularText}>{profile.socials[key]}</Text>
      </View>
    )
  );

  for (let i = 0; i < profile.body_type.length - 1; i++) {
    body.push(<Text key={i}>{bodyTypes[profile.body_type[i]]}, </Text>);
  }
  if (profile.body_type.length > 0) {
    body.push(
      <Text key={profile.body_type.length - 1}>
        {bodyTypes[profile.body_type[profile.body_type.length - 1]]}
      </Text>
    );
  }

  for (let i = 0; i < profile.gender_pref.length - 1; i++) {
    genderPref.push(<Text key={i}>{genders[profile.gender_pref[i]]}, </Text>);
  }
  if (profile.gender_pref.length > 0) {
    genderPref.push(
      <Text key={profile.gender_pref.length - 1}>
        {genders[profile.gender_pref[profile.gender_pref.length - 1]]}
      </Text>
    );
  }

  return (
    <View>
      <View style={{ margin: 10, flexDirection: "row" }}>
        <View>
          <Text>
            <Text
              style={{ fontFamily: "Montserrat_600SemiBold", fontSize: 36 }}
            >
              {profile.display_name + ", "}
            </Text>
            <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 36 }}>
              {profile.age}
            </Text>
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat_500Medium",
              fontSize: 18,
              color: "#2958FF",
              marginBottom: 3,
            }}
          >
            {/* { profile.city } TODO get location */}
            San Antonio, TX
          </Text>
          <Text style={styles.regularText}>@{profile.username}</Text>
        </View>
        <AntDesign
          name="hearto"
          size={24}
          color="black"
          style={{ position: "absolute", right: 0 }}
        />
      </View>

      <View style={styles.blueLine} />
      <View style={styles.blueLine} />
      <View style={styles.blueLine} />

      <View style={{ margin: 10 }}>
        <Text style={styles.regularText}>{profile.prof_desc.toString()}</Text>
        <View style={styles.grayLine} />
        <Text style={[styles.boldText, styles.capitalizeText]}>
          {profile.gender}
        </Text>
        {profile.pronouns && (
          <Text style={styles.regularText}>{profile.pronouns}</Text>
        )}
        <View style={styles.grayLine} />
        <Text style={styles.boldText}>Interested in</Text>
        <Text style={styles.regularText}>{genderPref}</Text>
        <View style={styles.grayLine} />
        {body.length > 0 && (
          <View>
            <Text style={styles.boldText}>Body type</Text>
            <Text style={styles.regularText}>{body}</Text>
            <View style={styles.grayLine} />
          </View>
        )}
        {profile.height && (
          <View>
            <Text style={styles.boldText}>Height</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.regularText}>
                {Math.floor(profile.height / 12) + " ft. "}
              </Text>
              {profile.height % 12 > 0 && (
                <Text style={styles.regularText}>
                  {(profile.height % 12) + " in. "}
                </Text>
              )}
            </View>
            <View style={styles.grayLine} />
          </View>
        )}
        {profile.weight && (
          <View>
            <Text style={styles.boldText}>Weight</Text>
            <Text style={styles.regularText}>{profile.weight + " lbs. "} </Text>
            <View style={styles.grayLine} />
          </View>
        )}
        {profile.have_std != null && (
          <View>
            <Text style={styles.boldText}>
              {profile.have_std == false ? "No STDs" : "Has STD(s)"}
            </Text>
            {profile.std_desc && (
              <View style={{ marginTop: 5 }}>
                <Text style={styles.regularText}>{profile.std_desc}</Text>
              </View>
            )}
            <View style={styles.grayLine} />
          </View>
        )}
        {profile.std_date && (
          <View>
            <Text style={styles.boldText}>Last test for STDs</Text>
            <Text style={styles.regularText}>
              {months[profile.std_date.substring(5, 7)]}{" "}
              {profile.std_date.substring(8, 10)},{" "}
              {profile.std_date.substring(0, 4)}
            </Text>
            <View style={styles.grayLine} />
          </View>
        )}
        {/* TODO not render socials if none? */}
        <View style={styles.socialsContainer}>{socials}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blueLine: {
    borderBottomColor: "#2958FF",
    borderBottomWidth: 1,
    marginBottom: 3,
  },
  grayLine: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    alignSelf: "stretch",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 9,
    width: windowWidth / 3,
    // Gets rid of shadow on Android
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    alignSelf: "center",
  },
  socialsContainer: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 10,
  },
  capitalizeText: {
    textTransform: "capitalize",
  },
  regularText: {
    fontFamily: "Montserrat_400Regular",
    color: "#727272",
    fontSize: 16,
  },
  boldText: {
    fontFamily: "Montserrat_600SemiBold",
    color: "#727272",
    fontSize: 16,
  },
});

export default ProfileText;
