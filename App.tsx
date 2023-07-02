import 'react-native-gesture-handler';

import React from 'react';

import { Routes } from './src/routes';
import { AuthProviderContext } from './src/contexts/authContext';

export default function App() {
	
	return (
		<AuthProviderContext>
			<Routes />
		</AuthProviderContext>
	);
}
