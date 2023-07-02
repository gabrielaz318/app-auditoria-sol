// import React from 'react';
// import { Feather } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import { HistoricRoutes } from './historic.routes';
// import { NewOccurrenceRoutes } from './newOccurrence.routes';
// import { useTheme } from 'styled-components';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { Platform, StyleSheet, Text, View } from 'react-native';

// const { Navigator, Screen } = createBottomTabNavigator();

// export function TabRoutes() {
//     const theme = useTheme();

//     return (
//         <Navigator
//             initialRouteName='Home'
//             screenOptions={{
//                 headerShown: false,
//                 tabBarShowLabel: false,
//                 tabBarStyle: {
//                     backgroundColor: theme.colors.primary,
//                     paddingVertical: 6,
//                     height: RFValue(Platform.OS == 'ios' ? 75 : 50),
//                 },
//                 tabBarLabelStyle: {
//                     fontFamily: theme.fonts.openSans_500,
//                     marginBottom: 8
//                 }
//             }}
//         >
//             <Screen
//                 name="NewOccurrenceRoutes"
//                 component={NewOccurrenceRoutes}
//                 options={{
//                     tabBarIcon: ({ focused }) => ( 
//                         <View style={styles.containerIcon}>
//                             <Feather
//                                 name="file-plus"
//                                 color={focused ? theme.colors.white : theme.colors.secondary}
//                                 size={RFValue(18)}
//                             />
//                             <Text 
//                                 style={{
//                                     ...styles.textIcon,
//                                     color: focused ? theme.colors.white : theme.colors.secondary,
//                                     fontFamily: theme.fonts.openSans_500
//                                 }}
//                             >
//                                 Nova Ocorrência
//                             </Text>
//                         </View>
//                     )
//                 }}
//             />
//             <Screen
//                 name="HistoricRoutes"
//                 component={HistoricRoutes}
//                 options={{
//                     tabBarIcon: ({ focused }) => ( 
//                         <View style={styles.containerIcon}>
//                             <Feather
//                                 name="archive"
//                                 color={focused ? theme.colors.white : theme.colors.secondary}
//                                 size={RFValue(18)}
//                             />
//                             <Text 
//                                 style={{
//                                     ...styles.textIcon,
//                                     color: focused ? theme.colors.white : theme.colors.secondary,
//                                     fontFamily: theme.fonts.openSans_500
//                                 }}
//                             >
//                                 Histórico
//                             </Text>
//                         </View>
//                     )
//                 }}
//             />
//         </Navigator>
//     )
// }

// const styles = StyleSheet.create({
//     containerIcon: {
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     textIcon: {
//         fontSize: RFValue(12)
//     },
// })