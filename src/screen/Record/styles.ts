import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.whiteBackground};
`;

export const Content = styled.View`
    flex: 1;

    padding: 16px 16px 0 16px;
`;

export const ItensWrapper = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false
})`
    margin-top: 12px;
`;

export const OptionDescription = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.openSans_400};
    border-radius: 6px;
`;

export const TextBold = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.openSans_500};
`;

export const ButtonAddRecord = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    justify-content: center;
    align-items: center;
    align-self: center;

    background-color: ${({ theme }) => theme.colors.secondary};
    width: 75%;

    margin-top: 18px;
    padding: 6px;

    border-radius: 6px;
    margin-bottom: 16px;
`;

export const ButtonOpenChecklist = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    justify-content: center;
    align-items: center;
    align-self: center;

    background-color: ${({ theme }) => theme.colors.secondary};
    width: 75%;

    margin-top: 18px;
    padding: 6px;

    border-radius: 6px;
    margin-bottom: 16px;
`;

export const TextAddRecord = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.openSans_500};
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