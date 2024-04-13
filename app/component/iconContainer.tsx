/* eslint-disable prettier/prettier */
import { Menu, ChartCircle, Shuffle, Share, SaveAdd } from 'iconsax-react-native';
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';


interface IconContainerProps {
    onSave: () => void;
    onShare: () => void;
  }
  

const IconContainer = ({ onSave, onShare }: IconContainerProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={[styles.icons, { marginRight: 10 }]} onPress={onSave}>
      <SaveAdd size="25" color="#FF8A65" variant="Outline"/>
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.icons} onPress={onShare}>
      <Share  size="25" color="#FF8A65" variant="Outline"/>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  icons: {
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white'
  },
};

export default IconContainer;
