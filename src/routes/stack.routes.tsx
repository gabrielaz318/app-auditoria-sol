import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Historic } from '../screen/Historic';
import { Checklist } from '../screen/Checklist';
import { Record } from '../screen/Record';
import { NewRecord } from '../screen/NewRecord';

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {

    return (
		<GestureHandlerRootView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Navigator screenOptions={{ headerShown: false}} initialRouteName='Home'>
                <Screen
                    name="Historic"
                    component={Historic}
                />
                <Screen
                    name="NewRecord"
                    component={NewRecord}
                />
                <Screen
                    name="Record"
                    component={Record}
                />
                <Screen
                    name="Checklist"
                    component={Checklist}
                />
            </Navigator>
        </GestureHandlerRootView>
    )
}