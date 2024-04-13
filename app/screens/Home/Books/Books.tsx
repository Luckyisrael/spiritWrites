/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Screen } from '~/app/lib'
import { Link, Stack } from 'expo-router';
import MasonryList from '~/app/component/MasonryList';
import Pin from '~/app/component/Pin';
import { book_10Uri, book_1Uri, book_2Uri, book_3Uri, book_4Uri, book_5Uri, book_6Uri, book_7Uri, book_8Uri, book_9Uri } from '~/assets/images/image';

const pins = [
  {
    id: "0",
    title: 'Surrounded By Idiots - Thomas Erikson',
    image: book_1Uri,
    desc: 'desc for Item 1',
  },
  {
    id: "1",
    title: 'Focus On What Matters -  Darius Foroux',
    image: book_2Uri,
    desc: 'desc for Item 2',
  },
  {
    id: "2",
    title: 'Across Time & Death - A mother research for her past life children',
    image: book_3Uri,
    desc: 'desc for Item 3',
  },
  {
    id: "3",
    title: '48 Laws of Power',
    image: book_4Uri,
    desc: 'desc for Item 4',
  },
  {
    id: "4",
    title: 'The Subtle Art of Nuot Giving a F*ck',
    image: book_6Uri,
    desc: 'desc for Item 5',
  },
  {
    id: "5",
    title: 'The Sacrament of Language',
    image: book_7Uri,
    desc: 'desc for Item 5',
  },
  {
    id: "6",
    title: 'Ritual and Religion in the Making of Humanity - Roy A. Rappaport',
    image: book_8Uri,
    desc: 'desc for Item 5',
  },
  {
    id: "7",
    title: 'The Religion of Humanity',
    image: book_9Uri,
    desc: 'desc for Item 5',
  },
  {
    id: "8",
    title: 'The Beginning and the End',
    image: book_10Uri,
    desc: 'desc for Item 5',
  },
  {
    id: "9",
    title: 'Sacred Earth Sacred Soul',
    image: book_5Uri,
    desc: 'desc for Item 5',
  },
];


const Books = () => {
  const [loading, setLoading] = useState(false);

  const fetchPins = async () => {};

  return (
    <Screen statusBarStyle='dark' safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <View style={styles.rows}>
       <MasonryList pins={pins} onRefresh={fetchPins} refreshing={loading} />
    
     </View>
      
    </Screen>
  )
}

export default Books

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rows: {
    flexDirection: 'row',
  }
})