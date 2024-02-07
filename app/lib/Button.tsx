/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { TouchableOpacity, View, StyleSheet, Keyboard, StyleProp, ViewStyle } from 'react-native';
import { Text } from './Text';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  length?: 'half' | 'full' | number;
  color?: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textColor?: string;
  borderColor?: string;
  fontFamily?:
    | 'bold'
    | 'medium'
    | 'light'
    | 'semi-bold'
    | 'regular';
  onPress?: () => void;
  textSize?: number;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  variant,
  color,
  label,
  leftIcon,
  length,
  rightIcon,
  textColor,
  borderColor,
  fontFamily,
  textSize,
  onPress,
  disabled,
  style,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      onPress={() => {
        Keyboard.dismiss();
        if (onPress) onPress();
      }}
      style={[styles.buttonContainer({ variant, length, color, leftIcon, rightIcon, borderColor, disabled }), style]}
    >
      {leftIcon}
      <View>
        <Text
          size={textSize}
          color={
            textColor ? textColor : variant === 'secondary' ? '#050505' : '#FFF'
          }
        >
          {label}
        </Text>
      </View>
      {rightIcon}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  variant: 'primary',
  length: 'full',
  color: '',
  label: '',
  leftIcon: null,
  rightIcon: null,
  onPress: () => {},
  textColor: '',
  borderColor: '',
  textSize: 14,
  disabled: false,
  fontFamily: 'medium',
};

const styles = StyleSheet.create({
  buttonContainer: ({
    variant,
    length,
    color,
    leftIcon,
    rightIcon,
    borderColor,
    disabled,
  }: ButtonProps) => ({
    flexDirection: 'row',
    height: 52,
    backgroundColor: color
      ? color
      : disabled
      ? 'gray'
      : variant === 'primary'
      ? '#FF725E'
      : variant === 'danger'
      ? '#FFDDE3'
      : 'transparent',
    borderColor: borderColor
      ? borderColor
      : variant === 'secondary'
      ? '#0A8008'
      : 'transparent',
    width: length === 'full' ? '100%' : length === 'half' ? '50%' : length,
    alignItems: 'center',
    justifyContent:
      leftIcon !== null || rightIcon !== null ? 'space-between' : 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  }),
});

export { Button };
