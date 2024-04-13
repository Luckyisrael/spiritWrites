/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, Platform, StyleSheet, View, Animated, TouchableOpacity } from 'react-native'
import { Screen, Button, Text} from '~/app/lib'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import { colors } from '~/app/constants/theme';

type renderCellProps = {
  index: any;
  symbol: any;
  isFocused: any
}

type animateCellProps = {
  hasValue: any;
  index: any;
  isFocused: any
}
const { width } = Dimensions.get('window');

const Size = 70;
const CELL_BORDER_RADIUS = 8;
const Default_Cell_Color = '#fff';
const Cell_Bg_Color = '#000';
const Active_Cell_Color = colors.theme.secondary;

const {Value, Text: AnimatedText} = Animated;

const Number_Of_Cells = 4;

const animationsColor = [...new Array(Number_Of_Cells)].map(() => new Value(0));
const animationsScale = [...new Array(Number_Of_Cells)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}: animateCellProps) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const VerifyOtp = () => {
    const [value, setValue] = useState('');
    
    const ref = useBlurOnFulfill({value, cellCount: Number_Of_Cells});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
  
    const renderCell = ({index, symbol, isFocused}: renderCellProps) => {
      const hasValue = Boolean(symbol);
      const animatedCellStyle = {
        backgroundColor: hasValue
          ? animationsScale[index].interpolate({
              inputRange: [0, 1],
              outputRange: [Cell_Bg_Color, Active_Cell_Color],
            })
          : animationsColor[index].interpolate({
              inputRange: [0, 1],
              outputRange: [Default_Cell_Color, Active_Cell_Color],
            }),
        borderRadius: animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [Size, CELL_BORDER_RADIUS],
        }),
        transform: [
          {
            scale: animationsScale[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0.2, 1],
            }),
          },
        ],
      };
  
      // Run animation on next event loop tik
      // Because we need first return new style prop and then animate this value
      setTimeout(() => {
        animateCell({hasValue, index, isFocused});
      }, 0);
  
      return (
        <AnimatedText
          key={index}
          style={[styles.cell, animatedCellStyle]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </AnimatedText>
      );
    };
  
    const submitOTP = () => {
        //verify OTP and navigate to home screen
        router.push('/screens/Home/Quotes/')
    }

    
  return (
    <Screen statusBarStyle='dark' safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
        <View style={styles.body}>
            <Text style={styles.verify}>Verify your Email </Text>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={Number_Of_Cells}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
            />
           <TouchableOpacity style={{alignSelf:'flex-end', marginHorizontal: 5, marginVertical: 15}}>
            <Text family='light' style={{fontStyle: 'italic', textDecorationLine: 'underline'}} size={10} color='blue'>Resend Otp</Text>
           </TouchableOpacity>
        </View>
      
      <View style={styles.footer}>
        <Button label="Submit OTP" onPress={submitOTP}/>
      </View>
    </Screen>
  )
}

export default VerifyOtp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    body: {
      margin: 20
    },
    verify: {
      fontSize: 20,
      color: '#4A4B57',
      fontWeight: "normal",
      fontFamily: 'SpaceGrotesk-Bold'
    },
    footer: {
        position: "absolute",
        bottom: Platform.OS === "android" ? 35 : 50,
        width: width,
        paddingHorizontal: 23,
        alignItems: "center",
        right: 0,
        left: 0,
    },
    codeFieldRoot: {
        height: Size,
        marginTop: 30,
        paddingHorizontal: 20,
        justifyContent: 'center',
      },
      cell: {
        marginHorizontal: 8,
        height: Size,
        width: Size,
        lineHeight: Size - 5,
        ...Platform.select({web: {lineHeight: 65}}),
        fontSize: 30,
        textAlign: 'center',
        borderRadius: CELL_BORDER_RADIUS,
        color: colors.theme.primary,
        backgroundColor:  colors.theme.secondary,
    
        // IOS
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    
        // Android
        elevation: 3,
      },
    
      // =======================
    
      root: {
        minHeight: 800,
        padding: 20,
      },

})