import LottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Skottie } from 'react-native-skottie';

const AnimationScreen = () => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const animation = useRef(null);
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        loop
        colorFilters={[
          {
            keypath: 'button',
            color: '#000000',
          },
          {
            keypath: 'Sending Loader',
            color: '#000000',
          },
        ]}
        style={{ width: 100, height: 100 }}
        source={require('../../assets/animation/loadingAnim.json')}
      />
      
    </View>
  );
};

export default AnimationScreen;

const styles = StyleSheet.create({
  animationContainer: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  animation: {
    flex: 1,
  },
});
