import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { IColorStatus } from './dto';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    flex-direction: row;
    align-items: center;

    border-color: ${({ theme }) => theme.colors.primary};
    border-width: 1px;
    border-radius: 6px;
    overflow: hidden;

    margin-bottom: 12px;

    background-color: ${({ theme }) => theme.colors.whiteBackground};
`;

export const ColorStatus = styled.View<IColorStatus>`
    ${({ color }) => color && css`background-color: ${color};`};

    width: 6px;
    height: 100%;

    margin-right: 12px;
`;

export const InfoCard = styled.View`
    flex: 1;

    padding: 8px 0;
`;

export const Department = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({theme }) => theme.fonts.openSans_500};
`;

export const Creator = styled.Text`
    font-size: ${RFValue(13)}px;
    font-family: ${({theme }) => theme.fonts.openSans_400};
`;

export const IconWrapper = styled.View`
    padding: 4px 8px;
`;
