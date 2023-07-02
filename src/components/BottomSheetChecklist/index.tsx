import React, { useCallback, useEffect, useState } from 'react';
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { useTheme } from 'styled-components';
import { 
    Bold,
    ButtonGrade,
    ContainerItemTitle,
    Content,
    ContentItem,
    DescriptionItem,
    Grade,
    GradesContainer,
    Title,
    TitleItem
} from './styles';
import { IGradesChecklist } from '../../dtos/gradesCHecklist';
import { ICurrentChecklist } from '../../screen/Checklist';
import { IItemsChecklist } from '../../dtos/itemsChecklist';
import { IChecklist } from '../../contexts/dto/checklist';


interface BottomSheetChecklistProps {
    closeModal: () => void;
    data: ICurrentChecklist;
    grades: IGradesChecklist[];
    editChecklistDB: (items: IItemsChecklist[], title: string) => Promise<void>;
}

export const BottomSheetChecklist = React.forwardRef(({ closeModal, data, grades, editChecklistDB }: BottomSheetChecklistProps, ref: any) => {
    const theme = useTheme();
    const [itemData, setItemData] = useState<IItemsChecklist[]>([] as IItemsChecklist[]);

    const renderBackdrop = useCallback(
        (props: any) => (
          <BottomSheetBackdrop
            {...props}
            opacity={.5}
            animatedIndex={{
              value: 1,
            }}
          />
        ),
        []
    );

    function changeItems(grade: number, item: string) {
        const currentItem = itemData.find(item2 => item2.item == item);
        let newGrade = grade;

        if(grade == currentItem!.grade) {
            newGrade = -1;
        }

        const newList = itemData.map((item2) => {
            if(item2.item == item) {
                return {
                    ...item2,
                    grade: newGrade
                }
            } else {
                return item2
            }
        });
        setItemData([...newList]);
        editChecklistDB(newList, data.title);
    }

    useEffect(() => {
        if(data?.title != undefined) {
            setItemData([...data.items]);
        }
    },[data]);

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={ref}
                index={1}
                style={{flex: 1}}
                onDismiss={closeModal}
                snapPoints={['90%', '90%']}
                backdropComponent={renderBackdrop}
                backgroundStyle={{ backgroundColor: theme.colors.whiteBackground }}
            >
                <Content>
                    {/* <Title>Checklist - {data?.title}</Title> */}
                    
                    {itemData.length != 0 && <BottomSheetFlatList
                        data={itemData}
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
                    
                </Content>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    )

})