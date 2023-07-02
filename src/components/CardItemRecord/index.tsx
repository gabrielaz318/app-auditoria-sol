import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import {
    Container,
    InfoCard,
    Picture,
    Info,
    Comment,
    ButtonUpload,
    TextButtonUpload,
    TextBold,
    ButtonsWrapper,
    ButtonDelete,
    TextButtonDelete,
    PictureImage,
    PictureInfoWrapper,
    ButtonEdit,
    Pending,
} from './styles';
import { ActivityIndicator } from 'react-native';
import { ICardItemRecord } from './dto';
import { databaseContext } from '../../contexts/databaseContext';
import { ModalCamera } from '../Modals/ModalCamera';
import { ModalEditItem } from '../Modals/ModalEditItem';

export function CardItemRecord({ comment, picture, id_banco, id, id_record, online, edited }: ICardItemRecord) {
    const theme = useTheme();
    const { deleteOneItem, publishItem, saveItem } = databaseContext();
    const [modalCameraIsOpen, setModalCameraIsOpen] = useState(false);
    const [modalEditItemIsOpen, setModalEdititemIsOpen] = useState(false);
    const [loadingButtons, setLoadingButtons] = useState({ remove: false, upload: false, save: false });

    function handleDeleteItem() {
        setLoadingButtons(oldState => ({ ...oldState, remove: true }))
        deleteOneItem(id, id_record, id_banco);
    }


    function handleOpenModalCamera() {
        setModalCameraIsOpen(true);
    }
    function closeModalCamera() {
        setModalCameraIsOpen(false);
    }


    function closeModalEditItem() {
        setModalEdititemIsOpen(false);
    }
    function handleOpenModalEditItem() {
        setModalEdititemIsOpen(true);
    }


    async function handleSaveItem() {
        setLoadingButtons(oldState => ({ ...oldState, save: true }));
        await saveItem(id);
        setLoadingButtons(oldState => ({ ...oldState, save: false }));
    }
    async function handleUploadItem() {
        setLoadingButtons(oldState => ({ ...oldState, upload: true }));
        await publishItem(id);
        setLoadingButtons(oldState => ({ ...oldState, upload: false }));
    }
    
    return (
        <Container>
            <ModalCamera
                id={id}
                id_banco={id_banco}
                id_record={id_record}
                closeModalCamera={closeModalCamera}
                modalCameraIsOpen={modalCameraIsOpen}
            />

            <ModalEditItem
                infoEdit={{ id, id_banco, id_record, comment }}
                modalEditItemIsOpen={modalEditItemIsOpen}
                closeModalEditItem={closeModalEditItem}
            />

            {edited == 1 && (id_banco <= 0 || id_banco != null) && <Pending />}

            <InfoCard>
                <PictureInfoWrapper>
                    <Picture onPress={handleOpenModalCamera}>
                    {
                        picture ?
                        <PictureImage source={{ uri: picture }} /> :
                        <Feather
                            name="plus"
                            color={theme.colors.primary}
                            size={RFValue(24)}
                        />
                    }
                    </Picture>
                </PictureInfoWrapper>
                <Info onPress={handleOpenModalEditItem}>
                    <Comment><TextBold>Comentário:</TextBold> {comment}</Comment>
                </Info>
            </InfoCard>
            <ButtonsWrapper>
                <ButtonDelete onPress={handleDeleteItem} disabled={loadingButtons.remove} isLoading={loadingButtons.remove}>
                {
                    loadingButtons.remove ?
                    <>
                        <TextButtonDelete>Apagando</TextButtonDelete>
                        <ActivityIndicator color={theme.colors.white} size={RFValue(13)} />
                    </> :
                    <>
                        <TextButtonDelete>Apagar</TextButtonDelete>
                        <Feather
                            name="trash-2"
                            color={theme.colors.white}
                            size={RFValue(16)}
                        /> 
                    </>
                }
                </ButtonDelete>
                {picture && (id_banco == null || id_banco <= 0)  && <ButtonUpload onPress={handleUploadItem} disabled={loadingButtons.upload} isLoading={loadingButtons.upload}>
                {
                    loadingButtons.upload ?
                    <>
                        <TextButtonUpload>Publicando</TextButtonUpload>
                        <ActivityIndicator color={theme.colors.white} size={RFValue(13)} />
                    </> :
                    <>
                        <TextButtonUpload>Publicar</TextButtonUpload>
                        <Feather
                            name="upload-cloud"
                            color={theme.colors.white}
                            size={RFValue(16)}
                        /> 
                    </>
                }
                </ButtonUpload>}

                {picture && id_banco > 0 && <ButtonEdit onPress={handleSaveItem} disabled={loadingButtons.upload} isLoading={loadingButtons.save}>
                {
                    loadingButtons.save ?
                    <>
                        <TextButtonUpload>Salvando</TextButtonUpload>
                        <ActivityIndicator color={theme.colors.white} size={RFValue(13)} />
                    </> :
                    <>
                        <TextButtonUpload>Salvar</TextButtonUpload>
                        <Feather
                            name="upload-cloud"
                            color={theme.colors.white}
                            size={RFValue(16)}
                        /> 
                    </>
                }
                </ButtonEdit>}
            </ButtonsWrapper>
        </Container>
    );
}