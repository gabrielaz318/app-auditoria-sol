import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import {
    Container, Text,
} from './styles';

interface IButton {
    onPress: () => void;
    isLoading: boolean;
}

export function Button({ isLoading, onPress }: IButton) {
    const theme = useTheme();

    return (
        <Container isLoading={isLoading} disabled={isLoading} onPress={onPress}>
        {
            isLoading ?
                <ActivityIndicator size={RFValue(24)} color={theme.colors.white} /> :
               <Text>Acessar</Text>
        }
        </Container>
    );
}