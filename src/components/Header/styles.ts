import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { IContainer } from './dto';

export const Container = styled.View<IContainer>`
    padding: 16px;
    padding-top: ${getStatusBarHeight()+16}px;
    background-color: ${({ theme }) => theme.colors.primary};

    justify-content: ${({ backButton }) => backButton ? 'flex-start' : 'space-between'};
    align-items: center;
    flex-direction: row;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.openSans_500};
    font-size: ${RFValue(15)}px;
`;

export const UserInfoAndExitWrapper = styled.View`
    flex-direction: row;
`;

export const UserInfoWrapper = styled.View`
    align-items: center;
    flex-direction: row;

    margin-right: 6px;

    border-right-width: 1px;
    border-color: ${({ theme }) => theme.colors.white_65};
`;

export const UserInfo = styled.Text`
    color: ${({ theme }) => theme.colors.white_65};
    font-family: ${({ theme }) => theme.fonts.openSans_500};
    font-size: ${RFValue(13)}px;

    margin-right: 8px;
    margin-left: 4px;
`;

export const ExitButton = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    padding: 4px;
`;

export const FinishButton = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    padding: 4px;
`;

export const FinishWrapper = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const ButtonGoBack = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    padding: 4px;
    margin-right: 6px;
`;

