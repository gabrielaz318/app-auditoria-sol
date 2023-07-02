import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;

    background-color: ${({ theme }) => theme.colors.background_black};
`;

export const Header = styled.View`
    align-items: flex-end;
`;

export const Footer = styled.View`
    margin: 12px;

    flex-direction: row;
    justify-content: space-between;

    align-items: center;
`;

export const ButtonCloseModal = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    background-color: ${({ theme }) => theme.colors.red};
    width: 32px;
    height: 32px;

    justify-content: center;
    align-items: center;

    border-radius: 16px;

    margin-top: 8px;
    margin-right: 8px;
`;

export const ButtonOpenLibrary = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    background-color: ${({ theme }) => theme.colors.background_black};
    justify-content: center;
    align-items: center;

    padding: 6px;
    border-radius: 6px;
`;

export const TextButtonOpenLibrary = styled.Text`

`;

export const ButtonTakePicture = styled.TouchableOpacity.attrs({
    activeOpacity: .85
})`
    width: ${RFPercentage(8)}px;
    height: ${RFPercentage(8)}px;

    border-radius: ${RFPercentage(8)/2}px;
    border-width: 4px;
    border-color: ${({ theme }) => theme.colors.background_black};

    background-color: ${({ theme }) => theme.colors.white};
`;

export const FakeButton = styled.View`
    background-color: ${({ theme }) => theme.colors.transparent};
    justify-content: center;
    align-items: center;

    padding: 6px;
    border-radius: 6px;
`;

export const CameraWrapper = styled.View`
    width: 95%;
    height: 85%;

    border-radius: 12px;
    overflow: hidden;
`;

export const ButtonBackCloseModal = styled.TouchableOpacity`
    flex: 1;

    width: 100%;
`;