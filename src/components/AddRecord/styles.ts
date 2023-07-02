import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    position: absolute;
    bottom: ${RFPercentage(2.5)}px;
    right: ${RFPercentage(2.5)}px;
    background-color: ${({ theme }) => theme.colors.primary};

    padding: 10px;
    border-radius: 100px;
    overflow: hidden;
`;