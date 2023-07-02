import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { IButtonUpload, IButtonDelete } from './dto';

export const Container = styled.View`
    border-color: ${({ theme }) => theme.colors.gray_700};
    border-width: 1px;
    border-radius: 8px;

    padding: 8px;

    margin-bottom: 12px;
`;

export const InfoCard = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Picture = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    width: ${RFPercentage(12)}px;
    height: ${RFPercentage(17)}px;

    border-color: ${({ theme }) => theme.colors.gray_400};
    border-width: 1px;
    border-radius: 8px;

    align-items: center;
    justify-content: center;

    margin-right: 12px;

    overflow: hidden;
`;

export const Info = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    flex: 1;
`;

export const TextBold = styled.Text`
    font-family: ${({ theme }) => theme.fonts.openSans_700};
`;

export const Comment = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.openSans_500};
`;

export const ButtonsWrapper = styled.View`
    flex-direction: row;

    align-self: flex-end;

    margin-top: 12px;
`;

export const ButtonUpload = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})<IButtonUpload>`
    flex-direction: row;

    padding: 4px 6px;
    margin-left: 8px;

    border-radius: 6px;

    background-color: ${({ theme }) => theme.colors.green};

    ${({ isLoading }) => isLoading && css`opacity: .6;`}
`;
export const ButtonEdit = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})<IButtonUpload>`
    flex-direction: row;

    padding: 4px 6px;
    margin-left: 8px;

    border-radius: 6px;

    background-color: ${({ theme }) => theme.colors.green};

    ${({ isLoading }) => isLoading && css`opacity: .6;`}
`;

export const TextButtonUpload = styled.Text`
    margin-right: 8px;

    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.openSans_400};
`;

export const ButtonDelete = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})<IButtonDelete>`
    flex-direction: row;
    align-self: flex-end;

    padding: 4px 6px;

    border-radius: 6px;

    background-color: ${({ theme }) => theme.colors.red};

    ${({ isLoading }) => isLoading && css`opacity: .6;`}
`;

export const TextButtonDelete = styled.Text`
    margin-right: 8px;

    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.openSans_400};
`;

export const PictureImage = styled.Image`
    width: 100%;
    height: 100%;
`;

export const PictureInfoWrapper = styled.View`

`;

export const Pending = styled.View`
    width: ${RFValue(16)}px;
    height: ${RFValue(16)}px;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: ${RFValue(8)}px;

    position: absolute;
    top: 6px;
    right: 6px;
`;
