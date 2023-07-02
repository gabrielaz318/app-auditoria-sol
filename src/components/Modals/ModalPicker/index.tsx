import React, { useRef, useState } from 'react';
import { Modal, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
    Content,
    Container,
    ButtonBackCloseModal,
    ButtonClose,
    ButtonContainer
} from './styles';
import { IModalPicker } from './dto';
import { RFValue } from 'react-native-responsive-fontsize';

export function ModalPicker({ closeModalPicker, ModalPickerIsOpen, children }: IModalPicker) {
    const theme = useTheme();
    const refInputComment = useRef<TextInput>(null);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ModalPickerIsOpen}
            onRequestClose={closeModalPicker}
            style={{
                flex: 1
            }}
        >
            <Container>
                <ButtonBackCloseModal onPress={closeModalPicker} />
 
                <Content>
                    <ButtonContainer>
                        <ButtonClose onPress={closeModalPicker}>
                            <Feather
                                name="x"
                                color={theme.colors.white}
                                size={RFValue(18)}
                            />
                        </ButtonClose>
                    </ButtonContainer>

                    {children}
                </Content>
            </Container>
        </Modal>
    );
}