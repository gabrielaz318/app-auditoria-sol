import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IButtonGrade {
    active: boolean;
    color: string;
}

interface IGrade {
    active: boolean;
    color: string;
}

export const Content = styled.View`
    flex: 1;
    padding: 0 20px 0 20px;
`;

export const Title = styled.Text`
    margin-bottom: 24px;

    font-size: ${RFValue(15.4)}px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.openSans_700};
`;

export const ContentItem = styled.View`
    margin-bottom: 24px;

    border-radius: 14px;
    overflow: hidden;

    border-width: 2px;
    border-color: ${({ theme }) => theme.colors.primary};
`;

export const ContainerItemTitle = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const TitleItem = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.openSans_700};
    color: ${({ theme }) => theme.colors.white};

    margin: 2px 12px;
`;

export const Bold = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.openSans_700};
    color: ${({ theme }) => theme.colors.black};
`;

export const DescriptionItem = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.openSans_500};
    color: ${({ theme }) => theme.colors.black};
    padding: 4px 8px 0 8px;
`;

export const GradesContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    padding: 16px 8px 8px 8px;
`;

export const ButtonGrade = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})<IButtonGrade>`
    justify-content: center;
    align-items: center;
    align-self: center;

    ${({ color, active }) => active && css`background-color: ${color};`}

    ${({ color, active }) => !active && css`
        border-width: 2px;
        border-color: ${color};
    `}

    width: ${RFValue(40)}px;
    height: ${RFValue(40)}px;

    border-radius: 6px;
`;

export const Grade = styled.Text<IGrade>`
    font-size: ${RFValue(16)}px;
    color: ${({ theme, active, color }) => active ? theme.colors.white : color};
    font-family: ${({ theme }) => theme.fonts.openSans_700};
`;

