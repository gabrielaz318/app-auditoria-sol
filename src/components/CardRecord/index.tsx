import React from 'react';
import { Feather } from '@expo/vector-icons';

import { ICardRecord } from './dto';

import {
    Container,
    ColorStatus,
    InfoCard,
    Department,
    Creator,
    IconWrapper,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';

export function CardRecord({ id, id_banco, creator, department, color, date, checklist }: ICardRecord) {
    const navigation = useNavigation();

    function hanldeOpenRecord() {
        navigation.navigate('Record', { id, id_banco, department, checklist: JSON.parse(checklist) });
    }

    return (
        <Container onPress={hanldeOpenRecord}>
            <ColorStatus color={color} />
            <InfoCard>
                <Department>{(id_banco != 0 && id_banco != null) ? `#${id_banco}` : `?${id}`} - {department}</Department>
                <Creator>Criador: {creator?.split(' ')[0]} | Criado em: {date}</Creator>
            </InfoCard>
            <IconWrapper>
                <Feather
                    name="chevrons-right"
                    color={theme.colors.black}
                    size={RFValue(19)}
                />
            </IconWrapper>
        </Container>
    );
}