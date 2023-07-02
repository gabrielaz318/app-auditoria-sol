import React, { useRef, useState } from 'react';
import { Alert, Keyboard, Modal, TextInput } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import {
    Title,
    Input,
    Spinner,
    Content,
    Container,
    ButtonClose,
    InputWrapper,
    ButtonRegister,
    InputDescription,
    TextLoadingWrapper,
    TextButtonRegister,
    ButtonBackCloseModal,
} from './styles';
import { IModalItem } from './dto';
import { databaseContext } from '../../../contexts/databaseContext';

export function ModalNewItem({ 
    closeNewItemModal, 
    newModalIsOpen,
    id_record,
    id_record_banco
}: IModalItem) {
    const theme = useTheme();
    const [comment, setComment] = useState('');
    const { createNewItemDB } = databaseContext();
    const refInputComment = useRef<TextInput>(null);
    const [modalNewItemIsLoading, setModalNewItemIsLoading] = useState(false);

    function handleCloseModal() {
        if(comment.trim().length != 0) {
            Alert.alert('Cancelar criação', 'Você preencheu o comentário deste item, caso cancele você perderá essa informação.', [
                {
                  text: 'Cancelar item',
                  onPress: () => closeModalAndEraseData(),
                },
                {
                  text: 'Continuar',
                  style: 'cancel',
                }
            ]);
            return
        }

        setComment('');
        closeNewItemModal();
    }

    function closeModalAndEraseData() {
        setComment('');
        closeNewItemModal();
    }

    async function handleCreateNewItem() {
        if(comment.trim().length == 0) {
            Alert.alert('Coemntário faltando', 'Preencha o campo antes de tentar adicionar o novo item.');
            return
        }

        Keyboard.dismiss();
        try {
            setModalNewItemIsLoading(true);

            await createNewItemDB({ id_record, id_record_banco, comment });

            setComment('');
            closeNewItemModal();
        } catch (error) {
            console.log(error)
        } finally {
            setModalNewItemIsLoading(false);
            return
        }
    }
    
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={newModalIsOpen}
            onRequestClose={handleCloseModal}
            style={{
                flex: 1
            }}
        >
            <Container>
                <ButtonBackCloseModal disabled={modalNewItemIsLoading} onPress={handleCloseModal} />
 
                <Content>
                    <ButtonClose disabled={modalNewItemIsLoading} onPress={handleCloseModal}>
                        <Feather
                            name="x"
                            color={theme.colors.white}
                            size={RFValue(18)}
                        />
                    </ButtonClose>

                    <Title>Cadastrar novo item</Title>
                    
                    <InputWrapper>
                        <InputDescription marginTop="8px">Comentário</InputDescription>
                        <Input
                            value={comment}
                            onChangeText={setComment}
                            ref={refInputComment}
                            isMultiline={true}
                            multiline={true}
                            placeholder="Ex: Falta de organização"
                            style={{
                                textAlignVertical: 'top'
                            }}
                        />
                        
                    </InputWrapper>

                    <ButtonRegister isLoading={modalNewItemIsLoading} onPress={handleCreateNewItem}>
                    {
                        modalNewItemIsLoading ?
                        <TextLoadingWrapper>
                            <TextButtonRegister>Adicionando</TextButtonRegister>
                            <Spinner />
                        </TextLoadingWrapper> :
                        <TextButtonRegister>Adicionar</TextButtonRegister>
                    }
                    </ButtonRegister>
                </Content>

                <ButtonBackCloseModal disabled={modalNewItemIsLoading} onPress={handleCloseModal} />
            </Container>
        </Modal>
    );
}