/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Dimensions, Platform, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Screen, Text } from '~/app/lib'
import { Link, router } from 'expo-router';


const { width } = Dimensions.get('window');

const UserDetails = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')

  const verifyOtp = () => {
    router.push('/screens/Auth/VerifyOtp')
  }

  return (
    <Screen statusBarStyle='dark' safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <View style={styles.body}>
        <View style={styles.userName}>
          <Text family='light' size={14} style={styles.text}>What should we call you ?</Text>
          <Input 
            placeholder='Name'
            keyName='userName'
            keyboardType='default'
            value={userName}
            onChangeText={setUserName}
          />
        </View>

        <View style={styles.emailAddress}>
          <Text family='light' size={14} style={styles.text}>Enter your email</Text>
          <Input
            placeholder='Email Address'
            keyName='email'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
            

          />
        </View>
      </View>
      
      <View style={styles.footer}>
          <Button label="Next" onPress={verifyOtp} //disabled={!userName || !email}
          />
      </View>
    </Screen>
  )
}

export default UserDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    margin: 20
  },
  userName: {},
  emailAddress: {},
  text: {
    marginVertical: 15
  },
  footer: {
    position: "absolute",
    bottom: Platform.OS === "android" ? 35 : 50,
    width: width,
    paddingHorizontal: 23,
    alignItems: "center",
    right: 0,
    left: 0,
}
})