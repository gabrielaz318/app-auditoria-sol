import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.whiteBackgroundInput};

    padding: 4px 8px;
    width: 70%;
    margin-bottom: 8px;
    border-radius: 6px;

    flex-direction: row;
    align-items: center;
`;

export const Input = styled.TextInput`
    font-family: ${({ theme }) => theme.fonts.openSans_500};
    font-size: ${RFValue(16)}px;
    text-shadow: 1px 1px 2px #00000044;
    color: ${({ theme }) => theme.colors.white};

    width: 100%;

    margin-left: 4px;
    padding: 4px 0;
`;