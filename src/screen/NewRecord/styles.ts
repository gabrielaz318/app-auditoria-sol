import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { IMarginTopDescription, IStatusChecklist, IButtonCreateRecord } from './dto';
import { Platform } from 'react-native';

export const Container = styled.View`
    flex: 1;
    
    background-color: ${({ theme }) => theme.colors.whiteBackground};
`;

export const Content = styled.View`
    flex: 1;

    padding: 16px;
`;

export const PickerWrapper = styled.View`
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.black};
    border-radius: 6px;

    margin-top: 6px;
    margin-bottom: 10px;
`;

export const OptionDescription = styled.Text<IMarginTopDescription>`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.openSans_400};
    border-radius: 6px;

    ${({ marginTop }) => marginTop && css`margin-top: ${marginTop};`}
`;

export const TextBold = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.openSans_500};
`;

export const Checklist = styled.View`
    align-items: center;
    flex-direction: row;
`;

export const ChecklistDescription = styled.Text<IMarginTopDescription>`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.openSans_400};
    border-radius: 6px;

    ${({ marginTop }) => marginTop && css`margin-top: ${marginTop};`}
`;

export const StatusChecklist = styled.Text<IStatusChecklist>`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.openSans_700};

    color: ${({ theme, sync }) => sync ? theme.colors.green : theme.colors.red};
`;

export const Footer = styled.View`
    justify-content: center;
    align-items: center;

    ${Platform.OS == 'ios' ? css`padding-bottom: 24px;` : ''}
`;

export const ButtonCreateRecord = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})<IButtonCreateRecord>`
    flex-direction: row;
    justify-content: center;
    align-items: center;

    ${({ loading }) => loading && css`opacity: .7;`}
    background-color: ${({ theme }) => theme.colors.secondary};
    width: 60%;

    padding: 6px;

    border-radius: 6px;
    margin-bottom: 16px;
`;

export const ButtonSyncChecklist = styled(RectButton)`
    padding: 8px;
    margin-left: 6px;
    overflow: hidden;
    border-radius: ${RFValue(18)}px;
`;

export const TextCreateRecord = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.openSans_500};
    
    margin-right: 8px;
`;

export const ButtonSelectedDepartment = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    margin-bottom: 12px;
`;

export const TextSelectedDepartment = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.openSans_500};
`;