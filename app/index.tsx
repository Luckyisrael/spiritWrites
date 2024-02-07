/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

import { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Onboarding from "./screens/onboardingScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


const Page = () => {
	const [fontsLoaded] = useFonts({
		"SpaceGrotesk-Bold": require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
		"SpaceGrotesk-Light": require("../assets/fonts/SpaceGrotesk-Light.ttf"),
		"SpaceGrotesk-Medium": require("../assets/fonts/SpaceGrotesk-Medium.ttf"),
		"SpaceGrotesk-Regular": require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
		"SpaceGrotesk-SemiBold": require("../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
	  });

	  const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
		  await SplashScreen.hideAsync();
		}
		}, [fontsLoaded]);
	
		if (!fontsLoaded) {
			return null;
		}
	
	

	return (
		<View style={styles.container} onLayout={onLayoutRootView}>
			<Onboarding />
		</View>
		
	);
}

export default Page;

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 24,
		},
	});

