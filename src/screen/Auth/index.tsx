import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../components/Auth/Button';
import { Input } from '../../components/Auth/Input';
import { InputPassword } from '../../components/Auth/InputPassword';
import { authContext } from '../../contexts/authContext';
import { info } from '../../utils/version';

import {
    Container,
    Content,
    FakeBox,
    Footer,
    ImageLogoSOL,
    Grettings,
    GreetingsSmall,
    Instructions,
    Version,
} from './styles';

export function Auth() {
    const { signIn } = authContext();
    const [userInput, setUserInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [loadingSignIn, setLoadingSignIn] = useState(false);

    function closeKeyboard() {
        Keyboard.dismiss();
    }

    async function handleSignIn() {
        try {
            setLoadingSignIn(true);
            Keyboard.dismiss();
            const { code, message, title } = await signIn({ user: userInput, password: passwordInput });

            if (code != 2 && title !== undefined) {
                Alert.alert(title, message);
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoadingSignIn(false);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={closeKeyboard}>
            <Container>
                <FakeBox></FakeBox>

                <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
                    <TouchableWithoutFeedback onPress={closeKeyboard}>
                        <Content>
                            <ImageLogoSOL />
                            <Grettings>Bem-Vindo ao SOL!</Grettings>
                            <GreetingsSmall>Segurança - Organização - Limpeza</GreetingsSmall>
                            <Instructions>Digite suas credenciais para acessar</Instructions>
                            <Input
                                setUserInput={setUserInput}
                            />
                            <InputPassword
                                isLoading={loadingSignIn}
                                passwordInput={passwordInput}
                                setPasswordInput={setPasswordInput}
                                onSubmitHandler={handleSignIn}
                            />
                            <Button
                                onPress={handleSignIn}
                                isLoading={loadingSignIn}
                            />
                            <Version>v{info.version}</Version>
                        </Content>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>

                <Footer>
                    
                </Footer>
            </Container>
        </TouchableWithoutFeedback>
    );
}