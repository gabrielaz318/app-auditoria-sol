import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Content = styled.ScrollView`
    flex: 1;

    padding: 16px 16px 0 16px;
`;

export const ButtonOpenChecklist = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    justify-content: center;
    align-items: center;
    align-self: center;

    background-color: ${({ theme }) => theme.colors.secondary};
    width: 75%;

    padding: 6px;
    margin-top: 18px;

    border-radius: 6px;
    margin-bottom: 16px;
`;

export const TextChecklist = styled.Text`
    text-transform: uppercase;
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.openSans_500};
`;

export const TitleResume = styled.Text`
    margin-top: 14px;
    text-align: center;
    font-size: ${RFValue(17)}px;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.openSans_700};
`;

export const DividerResume = styled.View`
    height: 1px;
    margin: 0 32px;
    margin-top: 6px;
    margin-bottom: 12px;
    background-color: ${({ theme }) => theme.colors.text};
`;

export const ContainerTable = styled.View`
    flex-direction: row;
    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.colors.primary};
`;

export const ColumnChecklist = styled.View`
    flex: 5;
    margin-top: 6px;
    margin-bottom: 6px;
`;

export const NameColumnChecklist = styled.Text`
    padding: 12px 0;
    margin-left: 8px;
    text-transform: uppercase;
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.openSans_700};
`;

export const ColumnResult = styled.View`
    flex: 1;
    margin-top: 6px;
    padding-left: 10px;
    padding-right: 6px;
    margin-bottom: 6px;
    align-items: center;
    border-left-width: 1px;
    border-color: ${({ theme }) => theme.colors.primary};
`;

export const NameColumnResult = styled.Text`
    padding: 12px 0;
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.openSans_700};
`;




interface IButtonGrade {
    active: boolean;
    color: string;
}

interface IGrade {
    active: boolean;
    color: string;
}


export const ContentChecklist = styled.View`
    flex: 1;
    padding: 0 20px 0 20px;
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
