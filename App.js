import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

export default function App() {
  let textInput = useRef(null);
  let clockCell = null;
  const defaultCountdown = 30;
  const [internalVal, setInternalVal] = useState("");
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);

  const lengthInput = 4;

  // start focus to input text
  useEffect(() => {
    textInput.focus();
  }, []);

  useEffect(() => {
    clockCell = setInterval(() => {
      decrementClock();
    }, 1000)
    return () => {
      clearInterval(clockCell)
    }
  })

  const onChangeText = (val) => {
    setInternalVal(val)
    // if change number button will click then it will work as onBackPress
    if (val.length === lengthInput) {
      // navigation.navigate('home')
    }
  }

  const onChangeNumber = () => {

    // if change number button will click then it will work as onBackPress
    if (val.length === lengthInput) {
      // navigation.navigate('home')
    }
  }

  const onResendOTP = () => {
    if (enableResend) {
      setCountdown(defaultCountdown)
      setEnableResend(false)
      clearInterval(clockCell)
      clockCell = setInterval(() => {
        decrementClock(0);
      }, 1000)
    }
  }

  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true)
      setCountdown(0)
      clearInterval(clockCell)
    } else {
      setCountdown(countdown - 1)
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        // keyboardVerticalOffset={50}
        // behavior={'padding'}
        style={styles.containerAvodingView}>
        <Text style={styles.titleStyle}>{'Input you otp code send via sms'}</Text>
        <View>
          <TextInput
            ref={(input) => textInput = input}
            onChangeText={onChangeText}
            style={{ width: 0, height: 0 }}
            value={internalVal}
            maxLength={lengthInput}
            returnKeyType='done'
            keyboardType='numeric'
          />

          <View style={styles.containerInput}>
            {
              Array(lengthInput).fill().map((data, index) => (
                <View
                  key={index}
                  style={[
                    styles.cellView, {
                      borderBottomColor: index === internalVal.length ? '#FB6C6A' : '#234DB7'
                    }]
                  }>
                  <Text
                    onPress={() => textInput.focus()}
                    style={[
                      styles.cellText, {
                        color: enableResend ? '#234DB7' : 'grey'
                      }]
                    }>
                    {internalVal && internalVal.length > 0 ? internalVal[index] : ""}
                  </Text>
                </View>
              ))
            }

          </View>
        </View>

        <View style={styles.bottomView}>
          <TouchableOpacity onPress={onChangeNumber} >
            <View style={styles.btnChangeNumber}>
              <Text style={styles.textChange}>Change number</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onResendOTP}>
            <View style={styles.btnResend}>
              <Text
                style={[styles.textResend,
                {
                  color: enableResend ? '#234DB7' : 'gray'
                }]}
              >
                Resend OTP ({countdown})
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </View >
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  containerAvodingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  titleStyle: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 16
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16
  },
  bottomView: {
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  textChange: {
    color: '#234DB7',
    alignItems: 'center'
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  textResend: {
    alignItems: 'center',
    fontSize: 15
  }
});
