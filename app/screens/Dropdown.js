import React from "react";
import { 
    StyleSheet, 
    View, 
    Dimensions, 
} from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';


export default function Dropdown(props) {    
  return (
    <View style={styles.container}>
      <ModalDropdown options={props.options} 
      textStyle={props.textStyle} 
      defaultValue={props.defaultValue}
      onSelect={props.onSelect}
      dropdownTextStyle={styles.menuContent} />
    </View>
  );
}

export function PaddedDropdown(props) {
  return (
    <View style={{marginBottom: -ddSize}}>
      <ModalDropdown options={props.options} 
      textStyle={props.textStyle} 
      defaultValue={props.defaultValue}
      onSelect={props.onSelect}
      dropdownTextStyle={styles.menuContent} />
    </View>
  );
}

const dim = Dimensions.get('window');
const ddSize = 50;
const styles = StyleSheet.create({
container: {
  height: 80,
  width: 200,
},

menuContent: {
    color: "#000",
    fontWeight: "bold",
    padding: 2,
    fontSize: 20
},

text: {
  fontFamily: 'Montserrat_500Medium',
  fontSize: 20,
  color: "black",
  paddingTop: dim.height * 0.03,
},

select: {
  fontSize: 20,
  opacity: 0.5,
  fontFamily: 'Montserrat_400Regular',
  color: 'gray',
  borderBottomColor: 'black',
  borderBottomWidth: StyleSheet.hairlineWidth,
  alignSelf: 'stretch'
},
});