import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Screen } from '~/app/lib'

const Profile = () => {
  return (
    <Screen statusBarStyle='dark' safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <View>
      <Text>Profile</Text>
    </View>
    </Screen>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    
  }
})