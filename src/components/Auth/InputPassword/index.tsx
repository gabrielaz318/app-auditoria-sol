import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';

import {
    ButtonViewPassword,
    Container,
    Input
} from './styles';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { IInput } from './dto';

export function InputPassword({ passwordInput, setPasswordInput, isLoading, onSubmitHandler }: IInput) {
    const theme = useTheme();
    const [secureEntry, setSecureEntry] = useState(true);

    function handleChangeSecureEntry() {
        setSecureEntry(oldState => !oldState);
    }

    return (
        <Container>
            <Feather
                name="lock"
                color={theme.colors.primary}
                size={RFValue(20)}
            />
            <Input
                placeholder="Senha"
                value={passwordInput}
                onChangeText={setPasswordInput}
                placeholderTextColor={theme.colors.whitePlaceholderInput}
                secureTextEntry={secureEntry}
                onSubmitEditing={onSubmitHandler}
            />
            <ButtonViewPassword onPress={handleChangeSecureEntry}>
                <Feather
                    name={secureEntry ? 'eye' : 'eye-off'}
                    color={theme.colors.white}
                    size={RFValue(18)}
                />
            </ButtonViewPassword>
        </Container>
    );
}