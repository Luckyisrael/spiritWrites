import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from '../lib';

interface ProfileProps {
  name: string;
  icon: any;
  onPress?: () => void;
}
const ProfileComponent = ({ name, icon, onPress }: ProfileProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View>{icon}</View>
      <Text family="semi-bold" size={13} style={styles.spacing}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
  },
  spacing: {
    marginLeft: 10,
  },
});
