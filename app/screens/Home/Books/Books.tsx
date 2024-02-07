import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Screen } from '~/app/lib'

const Books = () => {
  return (
    <Screen statusBarStyle='dark' safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <View>
      <Text>Books</Text>
    </View>
    </Screen>
  )
}

export default Books

const styles = StyleSheet.create({
  container: {}
})