/* eslint-disable prettier/prettier */
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Screen } from '~/app/lib'

const Quote = () => {
  return (
    <Screen statusBarStyle='dark' safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <View>
      <Text>Quote</Text>
    </View>
    </Screen>
  )
}

export default Quote

const styles = StyleSheet.create({
  container: {}
})