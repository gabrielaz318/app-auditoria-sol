import React, { useEffect, useRef, useState } from 'react';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Header } from '../../components/Header';

import {
    Container,
    Content,
    ButtonOpenChecklist,
    TextChecklist,
    TitleResume,
    DividerResume,
    ContainerTable,
    ContentItem,
    ColumnChecklist,
    TitleItem,
    ButtonGrade,
    GradesContainer,
    Bold,
    Grade,
    ContainerItemTitle,
    ContentChecklist,
    DescriptionItem,
    ColumnResult,
    NameColumnChecklist,
    NameColumnResult
} from './styles';
import { CustomBackdrop } from './CustomBackdrop';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IChecklistRoute } from '../../dtos/checklist';
import { IItemsChecklist } from '../../dtos/itemsChecklist';
import { IChecklist } from '../../contexts/dto/checklist';
import { databaseContext } from '../../contexts/databaseContext';

export interface ICurrentChecklist {
    title: string;
    items: IItemsChecklist[];
}

export function Checklist() {
    const route = useRoute();
    const navigation = useNavigation();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { editChecklist, verifyVersionChecklist } = databaseContext();
    const [checklist, setChecklist] = useState<IChecklist>({} as IChecklist);
    const { checklist: checklistParam, id, id_banco, grades } = route.params as IChecklistRoute;
    const [currentChecklist, setCurrentChecklist] = useState<ICurrentChecklist>({} as ICurrentChecklist);

    function closeModal(index: number) {
        if(index == 0) {
            bottomSheetRef?.current?.close()
        }
    }  

    // async function handleToggleModal() {
    //     if(modalVisible) {
    //         bottomSheetRef?.current?.dismiss();
    //         setModalVisible(false);
    //         return
    //     }
    //     bottomSheetRef?.current?.present();
    //     setModalVisible(true);
    // }

    function changeCurrentChecklist(title: string, items: IItemsChecklist[]) {
        setCurrentChecklist({ items, title });

        bottomSheetRef.current?.snapToIndex(1);
        // handleToggleModal();
    }

    async function editChecklistDB(items: IItemsChecklist[], title: string) {
        const checklistFiltered = checklist?.checklist?.filter(item => {
            if(item.title != title) {
                return item
            }
            return false;
        });
        const newChecklist = {
            ...checklist,
            checklist: [
                ...checklistFiltered,
                {
                    title,
                    items
                }
            ]
        }
        setChecklist({ ...newChecklist });
        editChecklist(id, JSON.stringify(newChecklist));
    }

    async function verifyVersion() {
        if(id == undefined || checklist.version == undefined) return;
        verifyVersionChecklist(id as number, checklist.version as string, navigation.goBack);
    }

    function calcAverageAllItems(items: IItemsChecklist[][]) {
        if(items == undefined) return
        let allGrades = 0;
        let qtdItems = 0;
        
        for (const item of items) {
            const currentGrade = item.filter(item2 => item2.grade != -1).reduce((acc, item2) => acc + item2.grade, 0);
            
            if(item.filter(item2 => item2.grade != -1).length > 0) {
                allGrades += currentGrade/item.filter(item2 => item2.grade != -1).length;
                qtdItems += 1;
            }
        }
        
        return formatterNumberDoubleOrInt(Number((allGrades / qtdItems).toFixed(1)));
    }

    function formatterNumberDoubleOrInt(number: number) {
        const numbersList = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0];
        if(numbersList.includes(number)) {
            return Math.round(number);
        }

        return number;
    }

    function changeItems(grade: number, item: string) {
        const currentItem = currentChecklist?.items.find(item2 => item2.item == item);
        let newGrade = grade;

        if(grade == currentItem!.grade) {
            newGrade = -1;
        }

        const newList = currentChecklist?.items.map((item2) => {
            if(item2.item == item) {
                return {
                    ...item2,
                    grade: newGrade
                }
            } else {
                return item2
            }
        });
        setCurrentChecklist(old => ({ ...old, items: newList }));
        editChecklistDB(newList, currentChecklist?.title);
    }

    useEffect(() => {
        if(checklist?.version == undefined) {
            setChecklist(checklistParam);
        }
    },[checklistParam]);

    return (
        <Container>
            <Header
                backButton
                updateChecklistButton
                onPressRight={verifyVersion}
            >
                Checklist - v{checklist.version}
            </Header>

            <Content>
                {checklist?.checklist?.sort((a, b) => {
                    if(a?.title < b?.title) return 1;
                    if(a?.title > b?.title) return -1;
                    return 0;
                })?.map((item) => (
                    <ButtonOpenChecklist onPress={() => changeCurrentChecklist(item?.title, item?.items)} key={item?.title}>
                        <TextChecklist>{item?.title}</TextChecklist>
                    </ButtonOpenChecklist>
                ))}

                <TitleResume>Resumo</TitleResume>
                <DividerResume />
                
                {checklist?.checklist?.sort((a, b) => {
                    if(a?.title < b?.title) return 1;
                    if(a?.title > b?.title) return -1;
                    return 0;
                })?.map((item) => (
                    <ContainerTable key={item.title}>
                        <ColumnChecklist>
                            <NameColumnChecklist>{item.title}</NameColumnChecklist>
                        </ColumnChecklist>
                        <ColumnResult>
                            <NameColumnResult>{item?.items?.filter(item2 => item2.grade != -1).length == 0 ? 0 : formatterNumberDoubleOrInt(Number((item?.items?.filter(item2 => item2.grade != -1).reduce((acc, item) => acc + item.grade, 0) / item.items.filter(item2 => item2.grade != -1).length).toFixed(1)))}</NameColumnResult>
                        </ColumnResult>
                    </ContainerTable>
                ))}

                <ContainerTable>
                    <ColumnChecklist>
                        <NameColumnChecklist>MÉDIA FINAL</NameColumnChecklist>
                    </ColumnChecklist>
                    <ColumnResult>
                        <NameColumnResult>{calcAverageAllItems(checklist?.checklist?.map(item => item.items))}</NameColumnResult>
                    </ColumnResult>
                </ContainerTable>
            </Content>

            {/* <BottomSheetChecklist
                grades={grades}
                ref={bottomSheetRef}
                closeModal={closeModal} 
                data={currentChecklist}
                editChecklistDB={editChecklistDB}
            /> */}

            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={['1%', '90%']}
                backdropComponent={(e) => <CustomBackdrop {...e} />}
                onChange={closeModal}
            >
                <ContentChecklist>
                    {/* <Title>Checklist - {data?.title}</Title> */}
                    
                    {currentChecklist?.items?.length != 0 && <BottomSheetFlatList
                        data={currentChecklist?.items}
                        keyExtractor={e => e?.item}
                        renderItem={({ item }) => (
                            <ContentItem>
                                <ContainerItemTitle>
                                    <TitleItem>{item.item}</TitleItem>
                                </ContainerItemTitle>
                                <DescriptionItem><Bold>Critérios: </Bold>{item.desc}</DescriptionItem>

                                <GradesContainer>
                                    {grades.map(item2 => (
                                        <ButtonGrade onPress={() => changeItems(item2.grade, item.item)} active={item.grade == item2.grade} key={item2.grade} color={item2.color}>
                                            <Grade active={item.grade == item2.grade} color={item2.color}>{item2.grade}</Grade>
                                        </ButtonGrade>
                                    ))}
                                </GradesContainer>
                            </ContentItem>
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 80
                        }}
                    />}
                    
                </ContentChecklist>
            </BottomSheet>
        </Container>
    );
}