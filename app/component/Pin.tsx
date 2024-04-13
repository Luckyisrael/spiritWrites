import { AntDesign } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import { DocumentDownload } from 'iconsax-react-native';
import { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';

import { Text } from '../lib';

import { book_1Uri } from '~/assets/images/image';
//import RemoteImage from "./RemoteImage";

const Pin = ({ pin }: { pin: any }) => {
  const { id, image, title } = pin;
  const [ratio, setRatio] = useState();
  const navigation = useRouter();

  const onLike = () => {};

  // const goToPinPage = () => {
  // /  router.push("Pin", { param {id} });
  // };

  useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => {
        const imageRatio = width / height; // Calculating the aspect ratio
        setRatio(imageRatio); // Updating the 'ratio' state with the calculated aspect ratio
      });
    }
  }, [image]);

  return (
    <Pressable style={styles.pin}>
      <View>
        {/** */}
        <Image
          source={{ uri: image }}
          resizeMode="contain"
          style={[styles.image, { aspectRatio: ratio }]}
        />

        <Pressable onPress={onLike} style={styles.heartBtn}>
          <DocumentDownload size="16" color="#000" variant="Outline" />
        </Pressable>
      </View>

      <Text family="bold" size={12} color="grey" numberOfLines={2}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pin: {
    width: '100%',
    padding: 4,
  },

  heartBtn: {
    backgroundColor: '#D3CFD4',
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
  },
  image: {
    width: '100%',
    borderRadius: 20,
  },
});

export default Pin;
