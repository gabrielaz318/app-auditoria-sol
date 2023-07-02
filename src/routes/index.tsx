import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, OpenSans_400Regular, OpenSans_500Medium, OpenSans_700Bold } from '@expo-google-fonts/open-sans';

import theme from '../styles/theme';
import { AuthRoute } from './auth.routes';
import { authContext } from '../contexts/authContext';
import { StackRoutes } from './stack.routes';
import { DatabaseProviderContext } from '../contexts/databaseContext';
import { View } from 'react-native';

export function Routes() {
	const { user, userLoaded } = authContext();

	const [fontsLoaded] = useFonts({
		OpenSans_400Regular,
		OpenSans_500Medium,
		OpenSans_700Bold
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded && userLoaded) {
		  await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, userLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<ThemeProvider theme={theme}>
				<DatabaseProviderContext>
					<StatusBar style="light"/>
					<NavigationContainer>
						{!user?.id ? <AuthRoute/> : <StackRoutes/>}
					</NavigationContainer>
				</DatabaseProviderContext>
			</ThemeProvider>
		</View>
	);
}