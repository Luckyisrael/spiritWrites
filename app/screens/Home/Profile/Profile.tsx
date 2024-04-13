import { Entypo, Foundation } from '@expo/vector-icons';
import { CloseSquare, LogoutCurve, NotificationBing, Personalcard } from 'iconsax-react-native';
import React, { useState } from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native';
import { BottomSheet } from 'react-native-btr';

import ProfileComponent from '~/app/component/ProfileComponent';
import ReminderComponent from '~/app/component/ReminderComponent';
import { colors } from '~/app/constants/theme';
import { Button, Input, Screen, Text } from '~/app/lib';
import { logo } from '~/assets/images/image';

const Profile = () => {
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible((visible) => !visible);
  }

  return (
    <Screen
      statusBarStyle="dark"
      safeAreaEdges={['top', 'bottom']}
      contentContainerStyle={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image source={logo} resizeMode="contain" style={styles.headerImage} />
          </View>
        </View>
        <View style={styles.userDetails}>
          <View style={styles.nameContainer}>
            <Entypo name="twitter-with-circle" size={24} color="blue" />
            <Text family="semi-bold" size={13} style={styles.spacing}>
              @iLuckyisrael
            </Text>
          </View>
          <View style={styles.emailContainer}>
            <Entypo name="email" size={24} color="black" />
            <Text family="semi-bold" size={13} style={styles.spacing}>
              Luckyisrael4real@gmail.com
            </Text>
          </View>
        </View>
        <View style={styles.profileSection}>
          <ProfileComponent
            icon={<Personalcard size={32} variant="Bold" color="#FF8A65" />}
            name="Edit Profile"
            onPress={toggle}
          />
          <ReminderComponent />
          <ProfileComponent
            icon={<Foundation name="web" size={32} color="#FF8A65" />}
            name="Official Website"
          />
          <ProfileComponent
            icon={<LogoutCurve size={32} color="red" variant="Bold" />}
            name="Logout"
          />
        </View>
      </ScrollView>

      <View style={styles.bottomsheetContainer}>
        <BottomSheet visible={visible} onBackButtonPress={toggle} onBackdropPress={toggle}>
          <View style={styles.card}>
            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', margin: 15 }}>
              <CloseSquare size="32" color="#000000" onPress={toggle}/>
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <Text family="bold" size={14} style={{ marginVertical: 10 }}>
                Edit your profile information
              </Text>
              <Text family="semi-bold" size={12} style={{ marginBottom: 5 }}>
                X Username
              </Text>
              <Input placeholder="X Username" keyName='x_username' />
              <Text family="semi-bold" size={12} style={{ marginBottom: 5 }}>
                Email
              </Text>
              <Input placeholder='@email' keyName='email'/>
            
                <Button label="Save" style={{ marginVertical: 90}}/>
              
            </View>
          </View>
        </BottomSheet>
      </View>
    </Screen>
  );
};

export default Profile;

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Adjust as needed
  },
  header: {
    width: '100%',
    backgroundColor: 'white',
    height: width * 0.4, // Make header responsive
    borderBottomRightRadius: width * 0.5,
    borderBottomLeftRadius: width * 0.5,
    marginBottom: 50,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: width * 0.2,
  },
  headerImage: {
    width: width * 0.3, // Make image responsive
    height: width * 0.3, // Make image responsive
    borderRadius: width * 0.15,
  },
  userDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderRadius: 4,
    marginBottom: 5,
  },
  spacing: {
    marginLeft: 10,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderRadius: 4,
  },
  profileSection: {
    marginTop: 50,
    paddingHorizontal: 10,
  },
  bottomsheetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    height: 450,
    borderRadius: 20,
    margin: 10,
    marginBottom: 40,
  },
});
