/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { DashDotPagination, OnboardFlow } from 'react-native-onboard';
import { router } from 'expo-router';
import { onboardOneUri, onboardTwoUri, onboardThreeUri } from '../../assets/images/image';
import { colors } from '../constants/theme';
import { typography } from '../constants';

const Onboarding = () => {
	const homeScreen = () => {
		router.replace('/screens/Auth/')
	}
  return (
    <OnboardFlow
      pages={[
        {
          title: 'Calm Reflection',
          subtitle: 'Find Your Inner Peace Through Meditation',
          imageUri: onboardOneUri
        },
        {
          title: 'Inspiring Reads',
          subtitle: 'Feed Your Mind with Knowledge and Inspiration',
         imageUri: onboardTwoUri,
        },
		{
			title: 'Ignite Your Passion',
			subtitle: 'Turn Motivation into Action and Achieve Greatness',
		   imageUri: onboardThreeUri,
		},
      ]}
      type="fullscreen"
	  pageStyle={styles.container}
	  paginationSelectedColor={colors.theme.primary}
	  PaginationComponent={DashDotPagination}
	  onDone={homeScreen}
	  primaryButtonStyle={styles.button}
      titleStyle={styles.textStyle}

    />
  );
};

export default Onboarding;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.theme.secondary,
		borderTopEndRadius: 50,
		borderBottomStartRadius: 50
	},	
	button: {
		backgroundColor: colors.theme.primary
	},
    textStyle: {
        fontFamily: typography.code?.normal
    }
});
