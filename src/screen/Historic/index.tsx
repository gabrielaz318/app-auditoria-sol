import { format } from 'date-fns';
import { ActivityIndicator, Alert, FlatList, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import LottieView from 'lottie-react-native';
import { Picker } from '@react-native-picker/picker';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {
    Container,
    Content,
    PickerWrapper,
    DateInfoWrapper,
    OptionDescription,
    TextBold,
    ButtonClear,
    TextButton,
    ButtonConfirm,
    ContainerDelete,
    ButtonFindRecords,
    ButtonsDateTimePicker,
    TextButtonFindRecord,
    TextResults,
    DividerHorizotal,
    EmptyListWrapper,
    TextEmptyList,
    ButtonSelectedDepartment,
    TextSelectedDepartment,
    ContainerBackgroundLoading,
    LoadingWrapper,
} from './styles';

import { Header } from '../../components/Header';
import { AddRecord } from '../../components/AddRecord';
import { CardRecord } from '../../components/CardRecord';

import LottieAstronaut from '../../assets/animations/astronaut.json';
import { databaseContext } from '../../contexts/databaseContext';
import { useFocusEffect } from '@react-navigation/native';
import { ModalPicker } from '../../components/Modals/ModalPicker';

export function Historic() {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [modalPicker, setModalPicker] = useState(false);
    const [openModalDate, setOpenModalDate] = useState(false);
    const [selectDepartment, setSelectDepartment] = useState(0);
    const [dateTempIOS, setDateTempIOS] = useState<Date | null>(null);
    const [loadingFinishRecord, setLoadingFinishRecord] = useState(false);
    const { records, getAllRecords, getDepartments, getRecordsFiltered, departments, getAllItems, deleteRecord, getCurrentChecklist } = databaseContext();
    const [dateSelectedController, setDateSelectedController] = useState({ date: new Date(), active: false, ignoreDate: true });

    function handleSetDate(event: DateTimePickerEvent, date?: Date) {
        if(Platform.OS == 'ios') {
            setDateTempIOS(date || null);
            return
        }


        if(event.type == 'set' && date != undefined) {
            setDateSelectedController({ active: false, date: date, ignoreDate: false });
            return
        }
        
        if(event.type == 'neutralButtonPressed') {
            setDateSelectedController(oldState => ({ ...oldState, active: false, ignoreDate: true }));
            return
        }

        setDateSelectedController(oldState => ({ ...oldState, active: false }));
    }

    function handleOpenCalendar() {
        if(Platform.OS == 'ios') {
            setOpenModalDate(true);
            return
        }
        setDateSelectedController(oldState => ({ ...oldState, active: true }));
    }
    
    async function handleGetRecordsFiltered() {
        try {
            setIsLoading(true);
            await getRecordsFiltered({ 
                date: format(dateSelectedController.date, 'yyyy-MM-dd'), 
                department: selectDepartment, 
                ignoreDate: dateSelectedController.ignoreDate
            });
        } catch (error) {
            
        } finally {
            setIsLoading(false);
        }
    }

    async function getRecords() {
        try {
            setIsLoading(true);
            const query = `createdAt=${format(dateSelectedController.date, 'dd/MM/yyyy')}&department=${selectDepartment}&useCreatedAt=0&useDepartment=${selectDepartment}`;

            await getAllRecords(query);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    function execButtonsDateIOS(type: 'clear' | 'set') {
        if(type == 'clear') {
            setDateSelectedController(old => ({ ...old, ignoreDate: true }));
        } else {
            setDateSelectedController(old => ({ ...old, date: dateTempIOS || new Date(), ignoreDate: false }));
        }
        setOpenModalDate(false);

    }

    async function handleAskDeleteData(id: number, id_banco: number) {
        const items = await getAllItems(id);
        const itemsIds = items.map(item => item.id);
        const itemsSet = new Set(itemsIds);

        if(itemsIds.length > 0) {
            Alert.alert('Remover registro', `Este registro possui ocorrências, ao remover você também irá apagar estes dados.`,[
                {
                    text: "Cancelar"
                },
                {
                    text: "Apagar",
                    onPress: () => confirmRemoveRecord(id, id_banco, itemsSet)
                }
            ])
        } else {
            confirmRemoveRecord(id, id_banco, itemsSet)
        }
    }

    async function confirmRemoveRecord(id: number, id_banco: number, ids: Set<number>) {
        setLoadingFinishRecord(true);
        await deleteRecord(id, id_banco, ids);
        await handleGetRecordsFiltered();

        setLoadingFinishRecord(false);
    }

    useEffect(() => {
        getCurrentChecklist();
        getDepartments();
        getRecords();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            async function get() {
                getCurrentChecklist();
                getDepartments();
                getRecords();
            }
            get();
        }, [])
    );

    return (
        <Container>
            <Header exitButton={true}>Registros</Header>

            <ModalPicker ModalPickerIsOpen={modalPicker} closeModalPicker={() => setModalPicker(false)}>
                <Picker
                    selectedValue={selectDepartment}
                    onValueChange={setSelectDepartment}
                >
                    <Picker.Item label="Todos" key={0} value={0} />
                    {departments.map((item, index) => (
                        <Picker.Item label={item.department} key={item.id} value={item.id} />
                    ))}
                </Picker>
            </ModalPicker>

            <ModalPicker ModalPickerIsOpen={openModalDate} closeModalPicker={() => setOpenModalDate(false)}>
                <DateTimePicker
                    value={dateTempIOS || new Date()}
                    negativeButtonLabel=""
                    display='spinner'
                    neutralButtonLabel="Limpar data"
                    maximumDate={new Date()}
                    onChange={handleSetDate}
                />
                <ButtonsDateTimePicker>
                    <ButtonClear onPress={() => execButtonsDateIOS('clear')}>
                        <TextButton>Limpar data</TextButton>
                    </ButtonClear>
                    <ButtonConfirm onPress={() => execButtonsDateIOS('set')}>
                        <TextButton>Confirmar</TextButton>
                    </ButtonConfirm>
                </ButtonsDateTimePicker>
            </ModalPicker>

            {loadingFinishRecord && <ContainerBackgroundLoading>
                <LoadingWrapper>
                    <ActivityIndicator color={theme.colors.primary} size={'large'} />
                </LoadingWrapper>
            </ContainerBackgroundLoading>}

            <Content>
                <OptionDescription>Selecione uma data:</OptionDescription>
                <DateInfoWrapper onPress={handleOpenCalendar}>
                    <Feather
                        name="calendar"
                        color={theme.colors.black}
                        size={RFValue(15)}
                    />
                    <TextBold marginLeft="8px">{dateSelectedController.ignoreDate ? '--/--/----' : format(dateSelectedController.date, 'dd/MM/yyyy')}</TextBold>
                </DateInfoWrapper>
                {(Platform.OS == 'android' && dateSelectedController.active) && <DateTimePicker
                    value={dateSelectedController.date}
                    negativeButtonLabel=""
                    display='spinner'
                    neutralButtonLabel="Limpar data"
                    maximumDate={new Date()}
                    onChange={handleSetDate}
                />}

                {!!departments.length && <>
                    <OptionDescription marginTop="10px">Escolha um setor:</OptionDescription>
                    {Platform.OS == 'ios' ? 
                    <ButtonSelectedDepartment onPress={() => setModalPicker(true)}>
                        <TextSelectedDepartment>
                                {selectDepartment == 0 ? 'Todos' : departments.filter(item => item.id == selectDepartment)[0].department}
                        </TextSelectedDepartment>
                    </ButtonSelectedDepartment> :
                    <PickerWrapper> 
                        <Picker
                            selectedValue={selectDepartment}
                            onValueChange={setSelectDepartment}
                        >
                            <Picker.Item label="Todos" key={0} value={0} />
                            {departments.map((item, index) => (
                                <Picker.Item label={item.department} key={item.id} value={item.id} />
                            ))}
                        </Picker>
                    </PickerWrapper>
                    }
                </>}

                <ButtonFindRecords onPress={handleGetRecordsFiltered}>
                    <TextButtonFindRecord>Buscar</TextButtonFindRecord>
                </ButtonFindRecords>

                {records != null && 
                <>
                    <DividerHorizotal />
                    <TextResults>Resultados</TextResults>
                    {isLoading ?
                    <ActivityIndicator
                        style={{ marginTop: RFValue(28) }}
                        color={theme.colors.primary}
                        size={RFValue(28)}
                    /> :
                    <FlatList
                        data={records as any}
                        keyExtractor={item => String(item.id)}
                        overScrollMode='always'
                        renderItem={({ item }) => (
                            <Swipeable
                                renderLeftActions={() => (
                                    <ContainerDelete onPress={() => handleAskDeleteData(item.id, item.id_banco)}>
                                        <Feather
                                            name="trash-2"
                                            size={RFValue(20)}
                                            color={theme.colors.red}
                                        />
                                    </ContainerDelete>
                                )}

                            >
                                <CardRecord
                                    id={item.id}
                                    id_banco={item.id_banco}
                                    date={item.dateFormatted}
                                    color={item.color}
                                    checklist={item.checklist}
                                    creator={item.creator}
                                    department={item.department}
                                />
                            </Swipeable>
                        )}
                        contentContainerStyle={{ marginTop: 12, paddingBottom: 72 }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <EmptyListWrapper>
                                <LottieView
                                    autoPlay={true}
                                    loop={true}
                                    style={{
                                        width: RFValue(200),
                                        height: RFValue(200),
                                    }}
                                    source={LottieAstronaut}
                                />
                                <TextEmptyList>Nenhum registro encontrado</TextEmptyList>
                            </EmptyListWrapper>
                        )}
                    />}
                </>}

            </Content>

            <AddRecord hasDepartments={departments?.length > 0} />
        </Container>
    );
}
