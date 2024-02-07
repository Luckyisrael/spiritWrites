/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import {
    Pressable,
    StyleSheet,
    View,
    useWindowDimensions,
  } from 'react-native';
  import React from 'react';
  import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
  import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
  import TabIcons from './TabIcons';
  import {useSafeAreaInsets} from 'react-native-safe-area-context';
  import { colors } from '../constants/theme';
  import { Text } from '../lib';
  
  const CustomBottomTab = ({
    state,
    descriptors,
    navigation,
  }: BottomTabBarProps) => {
    // I'm using the inset from react-native-safe-area-context as the bottom value.
    // If you're not using react-native-safe-area-context, you can change it according to your needs.
    const insets = useSafeAreaInsets();
    const {width} = useWindowDimensions();
    const MARGIN = 20;
    const TAB_BAR_WIDTH = width - 2 * MARGIN;
    const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;
  
    const translateAnimation = useAnimatedStyle(() => {
      return {
        transform: [{translateX: withSpring(TAB_WIDTH * state.index)}],
      };
    });
  
    return (
      <View
        style={[
          styles.tabBarContainer,
          {width: TAB_BAR_WIDTH, bottom: insets.bottom},
        ]}>
        <Animated.View
          style={[
            styles.slidingTabContainer,
            {width: TAB_WIDTH},
            translateAnimation,
          ]}>
          <View style={styles.slidingTab} />
        </Animated.View>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate(route.name, {merge: true});
            }
          };
  
          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={{flex: 1}}>
              <View style={styles.contentContainer}>
                <TabIcons route={route.name} isFocused={isFocused} />
                <Text
                size={8}
                  style={{
                    color: isFocused ? '#000' : 'white',
                  }}>
                  {route.name}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    );
  };
  
  export default CustomBottomTab;
  
  const styles = StyleSheet.create({
    tabBarContainer: {
      flex: 1,
      flexDirection: 'row',
      height: 70,
      position: 'absolute',
      alignSelf: 'center',
      backgroundColor: colors.theme.primary,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    slidingTabContainer: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
    },
    slidingTab: {
      width: 50,
      height: 50,
      borderRadius: 100,
      backgroundColor: 'white',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
    },
  });