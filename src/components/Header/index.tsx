import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { IHeader } from './dto';
import {
    Title,
    UserInfo,
    Container,
    ExitButton,
    ButtonGoBack,
    FinishButton,
    FinishWrapper,
    UserInfoWrapper,
    UserInfoAndExitWrapper,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { authContext } from '../../contexts/authContext';
import { useNavigation } from '@react-navigation/native';
import { databaseContext } from '../../contexts/databaseContext';

export function Header({ 
    children,
    exitButton = false,
    backButton = false,
    finishButton = false,
    onPressRight = () => {},
    updateChecklistButton = false,
}: IHeader) {
    const theme = useTheme();
    const navigation = useNavigation();
    const { user, signOut } = authContext();
    
    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <Container backButton={backButton}>
            {backButton &&
            <ButtonGoBack onPress={handleGoBack}>
                <Feather
                    name="chevron-left"
                    color={theme.colors.white}
                    size={RFValue(18)}
                />
            </ButtonGoBack>}

            <Title>{children}</Title>

            {exitButton && <UserInfoAndExitWrapper>
                <UserInfoWrapper>
                    <Feather
                        name="user"
                        color={theme.colors.white_65}
                        size={RFValue(17)}
                    />
                    <UserInfo>{user.user}</UserInfo>
                </UserInfoWrapper>
                <ExitButton onPress={signOut}>
                    <Feather
                        name="log-out"
                        color={theme.colors.white}
                        size={RFValue(18)}
                    />
                </ExitButton>
            </UserInfoAndExitWrapper>}

            {finishButton && <FinishWrapper>
                <FinishButton onPress={onPressRight}>
                        <Feather
                            name="check"
                            color={theme.colors.white}
                            size={RFValue(19)}
                        />
                </FinishButton>
            </FinishWrapper>}

            {updateChecklistButton && <FinishWrapper>
                <FinishButton onPress={onPressRight}>
                        <Feather
                            name="refresh-cw"
                            color={theme.colors.white}
                            size={RFValue(19)}
                        />
                </FinishButton>
            </FinishWrapper>}
        </Container>
    );
}