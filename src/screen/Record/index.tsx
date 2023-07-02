import { ActivityIndicator, Alert, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

import { Header } from '../../components/Header';
import { CardItemRecord } from '../../components/CardItemRecord';
import { databaseContext } from '../../contexts/databaseContext';
import { ModalNewItem } from '../../components/Modals/ModalNewItem';
import { ModalEditItem } from '../../components/Modals/ModalEditItem';

import { IRecord } from '../../dtos/record';

import {
    Content,
    TextBold,
    Container,
    TextAddRecord,
    LoadingWrapper,
    ButtonAddRecord,
    OptionDescription,
    ButtonOpenChecklist,
    ContainerBackgroundLoading,
} from './styles';
import { useTheme } from 'styled-components';
import { IChecklist } from '../../contexts/dto/checklist';

export function Record() {
    const route = useRoute();
    const theme = useTheme();
    const navigation = useNavigation();
    const { id, id_banco, department } = route.params as IRecord;
    const [modalNewItemIsOpen, setModalNewItemIsOpen] = useState(false);
    const [loadingFinishRecord, setLoadingFinishRecord] = useState(false);
    const [checklist, setChecklist] = useState<IChecklist>({} as IChecklist);
    const { items, getAllItems, finishRecord, getRecordByID, setChecklistInRecord } = databaseContext();

    async function handleOpenChecklist() {
        let checklistIn = checklist;
        if(checklistIn?.version == undefined) {
            await setChecklistInRecord(id);

            const checklistDB = await getRecordByID(id);
            setChecklist(JSON.parse(checklistDB[0].checklist));

            if(JSON.parse(checklistDB[0].checklist) == undefined) {
                Alert.alert('Erro checklist', 'Nenhum checklist localizado para o registro atual, contate o T.I.');
                return
            }

            checklistIn = JSON.parse(checklistDB[0].checklist);
        }
        navigation.navigate('Checklist', { checklist: checklistIn, id, id_banco, grades: checklistIn.grades });
    }

    //* Modal novo item
    function closeModalNewItem() {
        setModalNewItemIsOpen(false);
    }
    function handleOpenNewModalItem() {
        setModalNewItemIsOpen(true);
    }
    //* ---------------

    async function handleGetItems() {
        try {
            await getAllItems(id);
        } catch (error) {
            
        }
    }

    function handleVerifyFinishRecord() {
        const pendingItems = items.filter(item => item.edited == 1 || item.online == 0).map(item => item.id);

        if(pendingItems.length > 0) {
            Alert.alert(
                pendingItems.length == 1 ? 'Ocorência pendente' : 'Ocorências pendentes', 
                `${pendingItems.length == 1 ? `Existe 1 ocorrência pendente` : `Existem ${pendingItems.length} ocorrências pendentes`}. Você precisa enviar ou apagar para poder finalizar o registro.\n\nTodo item que está pendente fica marcado com um circulo amarelo.`
            );
            return
        }

        Alert.alert('Finalizar registro?', 'Ao finalizar o registro não será possível inserir mais nenhuma ocorrência e todos os dados deste registro serão removidos do seu dispositivo.',[
            {
                text: 'Cancelar',
            },
            {
                text: 'Finalizar',
                onPress: () => acceptFinishRecord()
            }
        ])
    }

    async function acceptFinishRecord() {
        try {
            setLoadingFinishRecord(true);
            const idsItems = items.map(item => item.id);

            const idsItemsFormatted = new Set(idsItems);
            const retorno = await finishRecord(id_banco, idsItemsFormatted, JSON.stringify(checklist));

            if(retorno?.code == 1) {
                navigation.goBack();
                return
            }

            Alert.alert(retorno?.title ? retorno?.title : 'Houve um erro', retorno?.message ? retorno?.message : 'Não foi posível finalizar o registro. Entre em contato com o T.I.');
        } catch (error) {
            Alert.alert('Houve um erro', 'Não foi posível finalizar o registro. Entre em contato com o T.I.');
        } finally {
            setLoadingFinishRecord(false);
        }
    }

    useEffect(() => {
        handleGetItems();
    },[])
    
    useFocusEffect(
        React.useCallback(() => {
            async function get() {
                const checklistDB = await getRecordByID(id);
                setChecklist(JSON.parse(checklistDB[0].checklist));
            }
            get();
        }, [id])
    );
    
    return (
        <Container>
            <Header
                onPressRight={handleVerifyFinishRecord}
                finishButton={id_banco != 0 && id_banco != null}
                backButton
            >
                    Registro #{id_banco || id}
            </Header>

            {loadingFinishRecord && <ContainerBackgroundLoading>
                <LoadingWrapper>
                    <ActivityIndicator color={theme.colors.primary} size={'large'} />
                </LoadingWrapper>
            </ContainerBackgroundLoading>}

            <ModalNewItem
                id_record={id}
                id_record_banco={id_banco}
                newModalIsOpen={modalNewItemIsOpen} 
                closeNewItemModal={closeModalNewItem} 
            />

            <Content>
                <OptionDescription>Setor:</OptionDescription>
                <TextBold>{department}</TextBold>
            
                <ButtonOpenChecklist onPress={handleOpenChecklist}>
                    <TextAddRecord>Abrir checklist</TextAddRecord>
                </ButtonOpenChecklist>

                <FlatList
                    data={items}
                    keyExtractor={item => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <CardItemRecord
                            id={item.id}
                            edited={item.edited}
                            id_banco={item.id_banco}
                            online={item.online}
                            id_record={item.id_record}
                            comment={item.comment}
                            picture={item.picture}
                        />
                    )}
                    ListFooterComponent={() => (
                        <ButtonAddRecord onPress={handleOpenNewModalItem}>
                            <TextAddRecord>Adicionar item</TextAddRecord>
                        </ButtonAddRecord>
                    )}
                    contentContainerStyle={{
                        marginTop: 16,
                        paddingBottom: 16
                    }}
                />

            </Content>
        </Container>
    );
}