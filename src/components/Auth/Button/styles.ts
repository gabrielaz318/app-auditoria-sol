import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})<IContainer>`
    background-color: ${({ theme }) => theme.colors.secondary};
    ${({ isLoading }) => isLoading && css`opacity: .5;`}
    padding: 8px;
    
    width: 70%;
    border-radius: 6px;

    justify-content: center;
    align-items: center;
`;

export const Text = styled.Text`
    font-family: ${({ theme }) => theme.fonts.openSans_500};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${RFValue(18)}px;
`;