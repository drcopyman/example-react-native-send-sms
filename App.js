import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import SendSMS from 'react-native-sms';

const App = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [bodySMS, setBodySMS] = useState(
    '',
  );

  const initiateSMS = () => {
    if (mobileNumber.length != 10) {
      alert('คุณใส่หมายเลขไม่ครบ 10 หลัก');
      return;
    }

    SendSMS.send(
      {
        body: bodySMS,
        recipients: [mobileNumber],
        successTypes: ['sent', 'queued'],
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log('ส่ง sms แล้ว');
        } else if (cancelled) {
          console.log('ยกเลิกการส่ง sms');
        } else if (error) {
          console.log('Error');
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          ทดสอบการส่ง sms
        </Text>
        <Text style={styles.titleTextsmall}>ใส่หมายเลขโทรศัพท์</Text>
        <TextInput
          value={mobileNumber}
          onChangeText={(mobileNumber) => setMobileNumber(mobileNumber)}
          placeholder={'ใส่หมายเลขโทรศัพท์'}
          keyboardType="numeric"
          style={styles.textInput}
        />
        <Text style={styles.titleTextsmall}>ข้อความ</Text>
        <TextInput
          value={bodySMS}
          onChangeText={(bodySMS) => setBodySMS(bodySMS)}
          placeholder={'ใส่ข้อความ'}
          keyboardType="numeric"
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={initiateSMS}>
          <Text style={styles.buttonTextStyle}>ส่ง</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleTextsmall: {
    marginVertical: 8,
    fontSize: 16,
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});