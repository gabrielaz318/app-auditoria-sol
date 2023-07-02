import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { IOptionDescription, ITextBold } from './dto';

export const Container = styled.View`
    flex: 1;
    
    background-color: ${({ theme }) => theme.colors.whiteBackground};
`;

export const Content = styled.View`
    flex: 1;

    padding: 16px;
`;

export const OptionDescription = styled.Text<IOptionDescription>`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.openSans_400};
    border-radius: 6px;

    ${({ marginTop }) => marginTop && css`margin-top: ${marginTop};`}
`;

export const TextBold = styled.Text<ITextBold>`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.openSans_500};

    ${({ marginLeft }) => marginLeft && css`margin-left: ${marginLeft};`}
`;

export const DateInfoWrapper = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    margin-top: 4px;

    flex-direction: row;
    align-items: center;
`;

export const ButtonFindRecords = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    background-color: ${({ theme }) => theme.colors.secondary};
    
    justify-content: center;
    align-items: center;
    align-self: center;

    width: 60%;
    padding: 6px;

    border-radius: 6px;

    margin-top: 8px;
`;

export const TextButtonFindRecord = styled.Text`
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.openSans_500};
`;

export const PickerWrapper = styled.View`
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.black};
    border-radius: 6px;

    margin-top: 6px;
    margin-bottom: 10px;
`;

export const DividerHorizotal = styled.View`
    background-color: ${({ theme }) => theme.colors.black};
    height: .7px;
    width: 40%;

    align-self: center;

    margin: 27px 0 16px 0;
`;

export const TextResults = styled.Text`
    font-size: ${RFValue(17)}px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.openSans_500};

    text-align: center;
`;

export const EmptyListWrapper = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const TextEmptyList = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.openSans_500};
`;

export const ContainerDelete = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    justify-content: center;
    align-items: center;

    padding-bottom: 16px;
    padding-left: 10px;
    padding-right: 20px;
`;

export const ContainerBackgroundLoading = styled.View`
    background-color: ${({ theme }) => theme.colors.background_black};

    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    justify-content: center;
    align-items: center;
`;

export const LoadingWrapper = styled.View`
    background-color: ${({ theme }) => theme.colors.white};

    padding: 10px;
    border-radius: 8px;

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

export const TextButton = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.openSans_500};
`;

export const ButtonClear = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    margin-right: 24px;
`;

export const ButtonConfirm = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
`;

export const ButtonsDateTimePicker = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    padding-bottom: 32px;
    margin: 0 12px;
`;