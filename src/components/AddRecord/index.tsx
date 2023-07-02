import React from 'react';
import { Feather } from '@expo/vector-icons';

import {
    Container,
} from './styles';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { IAddRecord } from './dto';
import { Alert } from 'react-native';

export function AddRecord({ hasDepartments }: IAddRecord) {
    const theme = useTheme();
    const navigation = useNavigation();

    function handleOpenScreenNewRecord() {
        if(!hasDepartments) {
            Alert.alert('Atenção', 'Nenhum departamento localizado, certifique-se que você possuí uma conexão com a internet para recuperar as informações cadastradas no site SOL.');
            return
        }
        navigation.navigate('NewRecord');
    }

    return (
        <Container onPress={handleOpenScreenNewRecord}>
            <Feather
                name="plus"
                color={theme.colors.white}
                size={RFValue(26)}
            />
        </Container>
    );
}