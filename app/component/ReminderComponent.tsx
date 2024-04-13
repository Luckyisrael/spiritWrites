import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import { NotificationBing } from 'iconsax-react-native';
import React, { useState } from 'react';
import { View, Button, Alert, Platform, Switch, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import { Text } from '../lib';

const ReminderComponent = () => {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isDailyReminderSet, setIsDailyReminderSet] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  
  const toggleSwitch = () => {
    setIsEnabled(previousState => {
      if (!previousState) {
        setShowTimePicker(true);
      }
      return !previousState;
    });
  };

  const handleSetDailyReminder = () => {
    setIsDailyReminderSet(!isDailyReminderSet);
    setShowTimePicker(true);
  };

  const handleTimeChange = ({event, selectedTime}: any) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setSelectedTime(selectedTime);
      console.log('Daily reminder set for:', selectedTime);
    }
  };

  const handleSaveDailyReminder = () => {
    // Here you would implement your reminder logic
    // For simplicity, we're just logging the details
    console.log('Daily reminder set for:', selectedTime);
    setIsDailyReminderSet(true);
    setShowTimePicker(false);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSetDailyReminder}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <NotificationBing size={32} color="#FF8A65" variant="Bold" />
        </View>
        <Text family="semi-bold" size={13} style={styles.spacing}>
          Remind Me
        </Text>
      </View>
      <View>
        <Switch
          trackColor={{ false: '#767577', true: '#F1DCD8' }}
          thumbColor={isEnabled ? '#FF725E' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        {showTimePicker && (
        <View>
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour
            display="default"
            onChange={handleTimeChange}
          />
        </View>
      )}
      </View>
      
    </TouchableOpacity>
  );
};

export default ReminderComponent;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 0.02 * Dimensions.get('window').width,
    padding: 0.02 * Dimensions.get('window').width,
    borderRadius: 0.02 * Dimensions.get('window').width,
    marginBottom: 2,
  },
  spacing: {
    marginLeft: 0.025 * Dimensions.get('window').width,
  },
});
