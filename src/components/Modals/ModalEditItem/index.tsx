import React, { useEffect, useRef, useState } from 'react';
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
import { IModalEditItem } from './dto';
import { databaseContext } from '../../../contexts/databaseContext';

export function ModalEditItem({ closeModalEditItem, infoEdit, modalEditItemIsOpen }: IModalEditItem) {
    const theme = useTheme();
    const { editItem } = databaseContext();
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const refInputComment = useRef<TextInput>(null);

    function handleCloseModal() {
        if(comment.trim() != infoEdit.comment) {
            Alert.alert('Cancelar edição', 'Se você cancelar a edição irá perder os dados editados e nenhuma ação será feita.', [
                {
                  text: 'Cancelar edição',
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
        closeModalEditItem();
    }

    function closeModalAndEraseData() {
        setComment('');
        closeModalEditItem();
    }

    async function handleEditItem() {
        if(comment.trim().length == 0) {
            Alert.alert('Comentário faltando', 'Preencha o campo antes de tentar editar o item.');
            return
        }
        setLoading(true);
        
        Keyboard.dismiss();
        await editItem(infoEdit.id_record ,infoEdit.id, comment, infoEdit.id_banco);
        
        setLoading(false);
        setComment('');
        closeModalEditItem();
    }

    useEffect(() => {
        if(modalEditItemIsOpen) {
            setComment(infoEdit.comment);
        }
    },[modalEditItemIsOpen])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalEditItemIsOpen}
            onRequestClose={handleCloseModal}
            style={{
                flex: 1
            }}
        >
            <Container>
                <ButtonBackCloseModal disabled={loading} onPress={handleCloseModal} />
 
                <Content>
                    <ButtonClose disabled={loading} onPress={handleCloseModal}>
                        <Feather
                            name="x"
                            color={theme.colors.white}
                            size={RFValue(18)}
                        />
                    </ButtonClose>

                    <Title>Editar item</Title>
                    
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

                    <ButtonRegister isLoading={loading} onPress={handleEditItem}>
                    {
                        loading ?
                        <TextLoadingWrapper>
                            <TextButtonRegister>Atualizando</TextButtonRegister>
                            <Spinner />
                        </TextLoadingWrapper> :
                        <TextButtonRegister>Atualizar</TextButtonRegister>
                    }
                    </ButtonRegister>
                </Content>

                <ButtonBackCloseModal disabled={loading} onPress={handleCloseModal} />
            </Container>
        </Modal>
    );
}