import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth } from '../screen/Auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoute() {

    return (
		<GestureHandlerRootView style={{ flex: 1, backgroundColor: '#DD6B20' }}>
            <Navigator screenOptions={{ headerShown: false}} initialRouteName='Home'>
                <Screen
                    name="Auth"
                    component={Auth}
                    />
            </Navigator>
        </GestureHandlerRootView>
    )
}