import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Picker } from '@react-native-picker/picker';

import {
    Container,
    Content,
    PickerWrapper,
    OptionDescription,
    TextBold,
    Footer,
    ButtonCreateRecord,
    TextCreateRecord,
    StatusChecklist,
    ChecklistDescription,
    Checklist,
    ButtonSyncChecklist,
    ButtonSelectedDepartment,
    TextSelectedDepartment
} from './styles';
import { Alert, Platform } from 'react-native';
import { IDepartmentSelected } from './dto';
import { Feather } from '@expo/vector-icons';
import { authContext } from '../../contexts/authContext';
import { RectButton } from 'react-native-gesture-handler';
import { databaseContext } from '../../contexts/databaseContext';
import { Spinner } from '../../components/Modals/ModalEditItem/styles';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { ModalPicker } from '../../components/Modals/ModalPicker';

export function NewRecord() {
    const theme = useTheme();
    const { user } = authContext();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [modalPicker, setModalPicker] = useState(false);
    const { createNewRecord, departments, checklist, getCurrentChecklist } = databaseContext();
    const [selectDepartment, setSelectDepartment] = useState<number>(departments[0].id);

    async function handleCreateNewRecord() {
        try {
            setLoading(true);
            console.log(selectDepartment)
            const currentDepartment = departments.filter(item => item.id == selectDepartment)[0];
            const retorno = await createNewRecord({
                id_creator: user.id,
                creator: user.user,
                id_department: currentDepartment.id,
                department: currentDepartment.department,
            });

            if(retorno.code != 1) {
                Alert.alert('Atenção', retorno.message);
                setLoading(false);
                return
            }
            setLoading(false);

            let dataRoute = {};
            if(retorno.id_banco == 0) {
                dataRoute = {
                    id: retorno.id,
                    department: currentDepartment.department
                }
            } else {
                dataRoute = {
                    id: retorno.id,
                    department: currentDepartment.department,
                    id_banco: retorno.id_banco
                }
            }

            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        {
                            name: 'Historic'
                        },
                        {
                            name: 'Record',
                            params: dataRoute
                        },
                    ]
                })
            );
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }
    
    return (
        <Container>
            <Header backButton={true}>Novo registro</Header>

            <ModalPicker ModalPickerIsOpen={modalPicker} closeModalPicker={() => setModalPicker(false)}>
                <Picker
                    selectedValue={selectDepartment}
                    onValueChange={setSelectDepartment}
                >
                    {departments.map((item) => (
                        <Picker.Item label={item.department} key={item.id} value={item.id} />
                    ))}
                </Picker>
            </ModalPicker>

            <Content>
                <OptionDescription>Usuário:</OptionDescription>
                <TextBold>{user?.user}</TextBold>

                <OptionDescription marginTop="10px">Escolha um setor:</OptionDescription>
                {Platform.OS == 'android' ?
                <PickerWrapper>
                    <Picker
                        selectedValue={selectDepartment}
                        onValueChange={setSelectDepartment}
                    >
                        {departments.map((item) => (
                            <Picker.Item label={item.department} key={item.id} value={item.id} />
                        ))}
                    </Picker>
                </PickerWrapper> :
                <ButtonSelectedDepartment onPress={() => setModalPicker(true)}>
                    <TextSelectedDepartment>
                        {departments.filter(item => item.id == selectDepartment)[0].department}
                    </TextSelectedDepartment>
                </ButtonSelectedDepartment>}
                

                <ChecklistDescription marginTop="10px">Status Checklist</ChecklistDescription>
                <Checklist>
                    <StatusChecklist sync={!!checklist?.version}>{!!checklist?.version ? 'Checklist sincronizado' : 'Checklist não sincronizado'}</StatusChecklist>
                    {!checklist?.version && <ButtonSyncChecklist onPress={getCurrentChecklist}>
                        <Feather
                            size={RFValue(13)}
                            name="refresh-ccw"
                            color={theme.colors.text}
                        />
                    </ButtonSyncChecklist>}
                </Checklist>
            </Content>

            <Footer>
                <ButtonCreateRecord disabled={loading} loading={loading} onPress={handleCreateNewRecord}>
                    <TextCreateRecord>Criar registro</TextCreateRecord>
                    { loading && <Spinner /> }
                </ButtonCreateRecord>
            </Footer>
        </Container>
    );
}