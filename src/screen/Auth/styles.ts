import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import BackgroundLogin from '../../assets/background-login.png';
import LogoSOL from '../../assets/logo-sol.png';
import { Platform } from 'react-native';

export const Container = styled.ImageBackground.attrs({
    source: BackgroundLogin
})`
    flex: 1;
`;

export const Content = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Footer = styled.View`
    width: 100%;

    align-items: center;

    margin-bottom: ${Platform.OS == 'ios' ? 28 : 16}px;
`;

export const Version = styled.Text`
    color: ${({ theme }) => theme.colors.white_65};

    margin-top: 8px;

    font-size: ${RFValue(13)}px;
    font-family: ${({ theme }) => theme.fonts.openSans_500};
`;

export const FakeBox = styled.View`
    width: 100%;

    align-items: center;

    margin-bottom: 28px;
`;

export const ImageLogoSOL = styled.Image.attrs({
    source: LogoSOL
})`
    width: 70%;
    height: 150px;
`;

export const Grettings = styled.Text`
    font-size: ${RFValue(24)}px;
    font-family: ${({ theme }) => theme.fonts.openSans_700};
    text-shadow: 1px 1px 2px #00000044;
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
`;

export const GreetingsSmall = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.openSans_700};
    text-shadow: 1px 1px 2px #00000044;
    color: ${({ theme }) => theme.colors.white};
    text-align: center;

    margin-bottom: 25px;
`;

export const Instructions = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.openSans_400};
    text-shadow: 1px 1px 2px #00000044;
    color: ${({ theme }) => theme.colors.white};
    text-align: center;

    margin-bottom: 12px;
`;
