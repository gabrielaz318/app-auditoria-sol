import React from 'react';
import { Feather } from '@expo/vector-icons';

import {
    Container,
    Input as InputComponent
} from './styles';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

import { IInput } from './dto';

export function Input({ setUserInput }: IInput) {
    const theme = useTheme();

    return (
        <Container>
            <Feather
                name="user"
                color={theme.colors.primary}
                size={RFValue(20)}
            />
            <InputComponent
                onChangeText={setUserInput}
                placeholderTextColor={theme.colors.whitePlaceholderInput}
                placeholder="Usuário"
            />
        </Container>
    );
}