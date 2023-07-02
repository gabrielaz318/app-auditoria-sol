import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { IButtonRegister, IInput, IInputDescription } from './dto';

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

export const Content = styled.View`
    width: 90%;
    
    padding: 8px;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.white};
`;

export const ButtonClose = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    position: absolute;
    top: -11px;
    right: -11px;

    justify-content: center;
    align-items: center;

    border-radius: 15px;

    width: 30px;
    height: 30px;

    background-color: ${({ theme }) => theme.colors.red};
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.openSans_500};
    font-size: ${RFValue(14)}px;
`;

export const InputWrapper = styled.View`
    margin: 12px 0;
`;

export const InputDescription = styled.Text<IInputDescription>`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.openSans_500};
    font-size: ${RFValue(13)}px;

    ${({ marginTop }) => marginTop && css`margin-top: ${marginTop};`}
`;

export const Input = styled.TextInput<IInput>`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.openSans_400};
    font-size: ${RFValue(13)}px;

    ${({ isMultiline }) => isMultiline && css`
        min-height: ${RFValue(40)}px;
        max-height: ${RFValue(100)}px;
    `}

    padding-bottom: 0;

    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.colors.gray_700};
`;

export const ButtonRegister = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})<IButtonRegister>`
    background-color: ${({ theme }) => theme.colors.green};
    padding: 4px 8px;
    border-radius: 6px;

    align-self: center;

    ${({ isLoading }) => isLoading && css`opacity: .6;`}
`;

export const TextButtonRegister = styled.Text`
    font-size: ${RFValue(13)}px;
    font-family: ${({ theme }) => theme.fonts.openSans_500};
    color: ${({ theme }) => theme.colors.white};
`;

export const ButtonBackCloseModal = styled.TouchableOpacity`
    flex: 1;

    width: 100%;
`;

export const TextLoadingWrapper = styled.View`
    flex-direction: row;
`;

export const Spinner = styled.ActivityIndicator.attrs({
    color: '#FFF',
    size: RFValue(14)
})`
    margin-left: 4px;
`;
