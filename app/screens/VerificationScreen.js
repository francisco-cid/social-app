import React, {useState} from 'react';
import {SafeAreaView, Text, View,StyleSheet,TouchableOpacity, Alert, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
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

const CELL_COUNT = 4;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


function VerificationScreen(props) {
    const [state, setState] = useState(0);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
            <View style={{flex:1}}>

                <LinearGradient colors={["#5DD1B5","#2958FF"]} style={{flex:1}}>

    <SafeAreaView style={styles.root}>
      <Text style={styles.subTitle}>
        Please verify your account by {'\n'}
        entering the code sent to the email address
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View 
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
          <View style={{marginLeft: "10%", //40
                            marginRight: "10%", //40 
                            }}>
      <TouchableOpacity
       style={styles.nextButton}
        onPress={() => Alert.alert('Submit')}
      >
        <Text style={styles.nextButtonText}>CONFIRM</Text>
      </TouchableOpacity>    
        </View>
  
      <View >
      <TouchableOpacity
       style={styles.resendButton}
        onPress={() => Alert.alert('Submit')}
      >
        <Text style={styles.resendButtonText}>Resend Code</Text>
      </TouchableOpacity>    
        </View>
      </SafeAreaView>
  </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
    root: {padding: 40, minHeight: 300},

 codeFiledRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: '10%',
    marginRight: '10%',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    paddingTop:200,
    marginLeft:width*0.005,
    borderBottomWidth: 1,

  },
  cellText: {
    color: 'black',
    marginTop:-(height*0.05),
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },

  subTitle: {
    marginLeft:width*0.05,
    paddingTop: height*0.1,
    color: 'white',
    textAlign: 'center',
    fontSize:18,
    fontFamily:'Montserrat_500Medium',
  },
  resendButton: {
    borderRadius: 30,
    height: 30,
    justifyContent: 'center',
    minWidth: 300,
    marginTop: -60,
    marginBottom: 200,
  },
  nextButton: {
    marginTop: height*0.1,
    height: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    minWidth: 200,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: 'center',
    fontFamily:'Montserrat_700Bold',
    fontSize: 20,
    color: '#0090ff',
  },
   resendButtonText: {
    textAlign: 'center',
    fontFamily:'Montserrat_500Medium', 
    fontSize: 16,
    color: '#ffff',
  },

});
    export default VerificationScreen;