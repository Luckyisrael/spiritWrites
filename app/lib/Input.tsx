/* eslint-disable import/order */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Motion} from '@legendapp/motion';
import {TextInputProps} from 'react-native';

type errorProps = {
  key?: string;
  message?: string;
  status?: boolean;
};

type validationObjProps = {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  pattern?: any;
};

export interface InputProps extends TextInputProps {
  //   placeholder: string | null;
  rightIcon: any;
  borderColor: string;
  fontSize: number;
  width: string | number;
  //   isFocus: boolean;
  keyName: string;
  error: errorProps | null;
  value: string | any | undefined;
  onChangeText: any;
  validation: validationObjProps;
  keyboardType:
    | 'number-pad'
    | 'email-address'
    | 'twitter'
    | 'default'
    | 'url'
    | 'phone-pad';
}

const Input = ({
  placeholder,
  rightIcon,
  borderColor,
  fontSize,
  width,
  error,
  keyName,
  validation,
  keyboardType,
  value,
  ...props
}: InputProps) => {
  const [compError, setCompError] = useState<errorProps>({
    key: '',
    message: '',
    status: false,
  });
  const placeholderAnime = useSharedValue(0);
  const placeholderFont = useSharedValue(14);
  const borderWidthAnime = useSharedValue(0);

  useEffect(() => {
    if (error) {
      setCompError(error);
    }
  }, [error]);

  useEffect(() => {
    if (value?.length > 0) {
      placeholderAnime.value = -25;
      placeholderFont.value = 12;
      borderWidthAnime.value = 1;
    }
  }, [value]);

  //todo: have a validate callback function that tells if the field is validated

  const validateField = () => {
    if (validation?.required) {
      if (!value)
        return setCompError({
          key: keyName,
          message: 'This field is required',
          status: true,
        });
      setCompError({
        key: '',
        message: '',
        status: false,
      });
    }
    if (validation?.minLength) {
      if (value == undefined || value?.length < validation.minLength)
        return setCompError({
          key: keyName,
          message:
            'This field must be at least ' +
            validation.minLength +
            ' characters',
          status: true,
        });
      setCompError({
        key: '',
        message: '',
        status: false,
      });
    }
    if (validation?.maxLength) {
      if (value?.length > validation.maxLength)
        return setCompError({
          key: keyName,
          message:
            'This field must be at most ' +
            validation.maxLength +
            ' characters',
          status: true,
        });
      setCompError({
        key: '',
        message: '',
        status: false,
      });
    }
    if (validation?.pattern) {
      if (!new RegExp(validation.pattern).test(value))
        return setCompError({
          key: keyName,
          message: 'This field is not valid',
          status: true,
        });
      setCompError({
        key: '',
        message: '',
        status: false,
      });
      return;
    }
  };

  const placeholderAnimeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(placeholderAnime.value, {
            duration: 100,
          }),
        },
      ],
      fontSize: withTiming(placeholderFont.value, {
        duration: 50,
      }),
    };
  });

  const inputContainerAnimeStyle = useAnimatedStyle(() => {
    return {
      borderWidth: withTiming(borderWidthAnime.value, {
        duration: 20,
      }),
      borderColor: withTiming('#FFFFFF', {
        duration: 20,
      }),
    };
  });

  return (
    <>
      <Motion.View style={styles.inputContainer({borderColor, width})}>
        <View style={{alignItems: 'flex-start'}}>
          <Animated.View style={[styles.placeHolder, inputContainerAnimeStyle]}>
            <View>
              <Animated.Text style={[placeholderAnimeStyle, styles.text]}>
                {placeholder}
              </Animated.Text>
            </View>
          </Animated.View>

          <TextInput
            {...props}
            style={[styles.input, {fontSize: fontSize ? fontSize : 16}]}
            value={value}
            onFocus={() => {
              placeholderAnime.value = -25;
              placeholderFont.value = 12;
              borderWidthAnime.value = 1;
            }}
            onBlur={() => {
              validateField();
              if (value?.length === 0 || value == undefined) {
                placeholderAnime.value = 0;
                placeholderFont.value = 14;
                borderWidthAnime.value = 0;
              } else {
                borderWidthAnime.value = 0;
              }
            }}
            keyboardType={keyboardType}
          />
          {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
        </View>
      </Motion.View>
      {compError?.status && compError.key === keyName && (
        <View style={{marginTop: 4}}>
          <Text
            style={{
              fontFamily: 'SpaceGrotesk-Light',
              color: '#ED1F34',
              fontSize: 13,
            }}>
            {compError.message}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    width: '100%',
  },
  inputContainer: ({width}: InputProps) => ({
    borderColor: '#7D7D7D',
    borderWidth: 1.5,
    height: 54,
    width: width || '100%',
    borderRadius: 4,
  }),
  input: {
    position: 'absolute',
    height: 54,
    width: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    zIndex: 2,
    borderRadius: 10,
    // color: '#FFF',
    fontFamily: 'SpaceGrotesk-Medium',
  },
  iconContainer: {
    height: '100%',
    position: 'absolute',
    right: 10,
    top: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    minWidth: 50,
    zIndex: 10,
  },
  placeHolder: {
    height: '100%',
    padding: 17,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#7D7D7D',
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
});

Input.defaultProps = {
  placeholder: null,
  rightIcon: null,
  borderColor: null,
  fontSize: null,
  width: '100%',
  keyName: '',
  error: null,
  value: '',
  required: false,
  onChangeText: () => {},
  validation: undefined,
  keyboardType: 'default',
};

export {Input};
