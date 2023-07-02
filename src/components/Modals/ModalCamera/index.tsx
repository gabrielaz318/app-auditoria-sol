import React, { useEffect, useRef } from 'react';
import { Alert, Modal, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import {
    Container,
    Header,
    Footer,
    FakeButton,
    CameraWrapper,
    ButtonCloseModal,
    ButtonOpenLibrary,
    ButtonTakePicture,
    ButtonBackCloseModal,
} from './styles';

import { IModalCamera } from './dto';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { databaseContext } from '../../../contexts/databaseContext';

export function ModalCamera({ modalCameraIsOpen, closeModalCamera, id_banco, id, id_record }: IModalCamera) {
    const theme = useTheme();
    const cameraRef = useRef<any>(null);
    const { updatePictureImage } = databaseContext();
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [statusMediaLibrary, requestPermissionMediaLibrary] = MediaLibrary.usePermissions();

    async function askPermissionCamera() {
        const returnPermission = await requestPermission();
        if(!returnPermission?.granted && returnPermission?.canAskAgain) {
            Alert.alert('Permissão de câmera', 'Para tirar uma foto você precisa permitir que o app SOL utilize sua câmera.', [
                {
                    text: 'Cancelar',
                    onPress: () => askPermissionCamera()
                },
                {
                    text: 'Permitir acesso',
                    onPress: () => askPermissionCamera()
                }
            ],{
                cancelable: true
            });
        } else if(!returnPermission?.granted && !returnPermission?.canAskAgain) {
            Alert.alert('Permissão de câmera', 'Para tirar uma foto você precisa permitir que o app SOL utilize sua câmera. Para isso acesse as configurações do app para conceder a permissão.', [
                {
                    text: 'Voltar'
                },
            ],{
                cancelable: true,
            });
        }
    }

    async function askPermissionMediaLibrary() {
        const returnPermission = await requestPermissionMediaLibrary();
        
        if(!returnPermission?.granted && returnPermission?.canAskAgain) {
            Alert.alert('Permissão da galeria de imagens', 'Para escolher um foto da sua galeria de imagens é necessário conceder uma permissão para o app SOL.', [
                {
                    text: 'Cancelar',
                    onPress: () => askPermissionCamera()
                },
                {
                    text: 'Permitir acesso',
                    onPress: () => askPermissionCamera()
                }
            ],{
                cancelable: true
            });
            return
        } else if(!returnPermission?.granted && !returnPermission?.canAskAgain) {
            Alert.alert('Permissão da galeria de imagens', 'Para escolher um foto da sua galeria de imagens é necessário conceder uma permissão para o app SOL. Para isso acesse as configurações do app e conceda a permissão.', [
                {
                    text: 'Voltar'
                },
            ],{
                cancelable: true,
            });
            return
        }

        const chosenImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [9, 16],
            quality: .6,
            base64: true
        });

        if (chosenImage.cancelled) return

        const imageUri = `data:image/jpg;base64,${chosenImage.base64}`;
        saveImageAndCloseModal(imageUri);
    }

    async function takePicture() {
        const camera = await cameraRef?.current.takePictureAsync({
            quality: .6,
            base64: true
        });

        const imageUri = `data:image/jpg;base64,${camera.base64}`;
        saveImageAndCloseModal(imageUri);
    }

    async function saveImageAndCloseModal(image: string) {
        try {
            await updatePictureImage(image, id, id_record, id_banco);

            closeModalCamera();
        } catch (error) {
            return
        }
    }

    useEffect(() => {
        askPermissionCamera();
    },[])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalCameraIsOpen}
            onRequestClose={closeModalCamera}
            style={{
                flex: 1
            }}
        >
            <Container>
                <ButtonBackCloseModal onPress={closeModalCamera} />
                <CameraWrapper>
                    <Camera 
                        pictureSize={Platform.OS == 'ios' ? '1280x720' : '1280x720'} 
                        ref={cameraRef} 
                        ratio='16:9' 
                        style={{
                            flex: 1, 
                            justifyContent: 'space-between'
                        }}
                    >
                        <Header>
                            <ButtonCloseModal onPress={closeModalCamera}>
                                <Feather 
                                    name='x'
                                    color={theme.colors.white}
                                    size={RFValue(22)}
                                />
                            </ButtonCloseModal>
                        </Header>

                        <Footer>
                            <ButtonOpenLibrary onPress={askPermissionMediaLibrary}>
                                <MaterialIcons
                                    name="photo-library"
                                    size={RFValue(32)}
                                    color={theme.colors.white}
                                />
                            </ButtonOpenLibrary>
                            <ButtonTakePicture onPress={takePicture}>

                            </ButtonTakePicture>
                            <FakeButton disabled={true}>
                                <MaterialIcons
                                    name="photo-library"
                                    size={RFValue(32)}
                                    color={theme.colors.transparent}
                                />
                            </FakeButton>
                        </Footer>
                    </Camera>
                </CameraWrapper>
                <ButtonBackCloseModal onPress={closeModalCamera} />
            </Container>
        </Modal>
    );
}