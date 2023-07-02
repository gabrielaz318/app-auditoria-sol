import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { ICreateNewItemDB, ICreateNewRecord, ICreateNewRecordReturn, IDepartments, IGetRecordsFiltered, IRecords, IReturnFinishRecord, Items } from "./dto/databaseContext";

import { format } from "date-fns";
import { Alert } from "react-native";
import ItemsDB from '../database/Items';
import { api } from "../services/axios";
import RecordsDB from '../database/Records';
import { authContext } from './authContext';
import { IChecklist } from "./dto/checklist";
import ChecklistDB from '../database/Checklist';
import DepartmentsDB from '../database/Departments';
import { verifyInternet } from "../services/verifyInternet";

const DatabaseContext = createContext({} as DatabaseContextDataProps);

interface DatabaseProviderProps {
    children: ReactNode;
}

interface DatabaseContextDataProps {
    items: Items[];
    records: IRecords[];
    checklist: IChecklist;
    departments: IDepartments[];
    getDepartments: () => Promise<void>;
    saveItem: (id: number) => Promise<void>;
    getCurrentChecklist: () => Promise<void>;
    publishItem: (id: number) => Promise<void>;
    getRecordByID: (id: number) => Promise<any>;
    getAllItems: (id: number) => Promise<Items[]>;
    getAllRecords: (query: string) => Promise<void>;
    setChecklistInRecord: (id: number) => Promise<any>;
    createNewItemDB: ({}: ICreateNewItemDB) => Promise<void>;
    getRecordsFiltered: ({}: IGetRecordsFiltered) => Promise<void>;
    editChecklist: (id: number, checklist: string) => Promise<void>;
    createNewRecord: ({}: ICreateNewRecord) => Promise<ICreateNewRecordReturn>;
    deleteRecord: (id: number, id_banco: number, ids: Set<number>) => Promise<void>;
    deleteOneItem: (id: number, id_record: number, id_banco: number) => Promise<void>;
    verifyVersionChecklist: (id: number, currentVersion: string, goBack: any) => Promise<void>;
    editItem: (id_record: number, id: number, comment: string, id_banco: number) => Promise<any>;
    finishRecord: (id: number, ids: Set<number> , checklist: string) => Promise<IReturnFinishRecord>;
    updatePictureImage: (picture: string, id: number, id_record: number, id_banco: number) => Promise<void>;
}

function DatabaseProviderContext({ children }: DatabaseProviderProps) {
    const { signOut } = authContext();
    const [items, setItems] = useState<Items[]>([] as Items[]);
    const [records, setRecords] = useState<IRecords[]>([] as IRecords[]);
    const [checklist, setChecklist] = useState<IChecklist>({} as IChecklist);
    const [departments, setDepartments] = useState<IDepartments[]>([] as IDepartments[]);

    //* Funções records
    async function createNewRecord({ creator, department, id_creator, id_department }: ICreateNewRecord) {
        try {
            const hasInternet = await verifyInternet();
            const created_at = String(new Date());

            await getCurrentChecklist();

            if(checklist?.version == undefined) {
                return {
                    code: 3,
                    message: 'Não foi localizado o checklist, verifique sua conexão com a internet e caso não funcione contate o departamento de T.I.'
                }
            }

            let id_banco = 0;
            if(hasInternet) {
                let { data } = await api.post('/app/records', {
                    created_at: created_at,
                    creator: id_creator,
                    department: id_department
                });

                id_banco = data.id;
            }

            const insertId = await RecordsDB.create({ 
                id_banco: id_banco,
                id_creator: id_creator,
                creator: creator,
                checklist: JSON.stringify(checklist),
                id_department: id_department,
                department: department,
                created_at: created_at
            });

            return {
                code: 1,
                id: insertId,
                id_banco
            }
        } catch(error: any) {
            if(error?.response) {
                const { data, status } = error.response;

                if(status == 401 && (data.code == 124587 || data.code == 45697859)) {
                    signOut();
                    Alert.alert(data.title,data.message);
                } else if(status == 401) {
                    signOut();
                }
            }
            
            return {
                code: 2,
                message: 'Houve um erro ao tentar criar o registro, contate o departamento de T.I.'
            }
        }
    }
    async function getAllRecords(query: string) {
        try {

            const hasInternet = await verifyInternet();
            let newRecords, data = [];
            let returnRecords = [] as IRecords[];

            if(hasInternet) {
                await getCurrentChecklist();
                const { data: dataRecords } = await api.get('/app/records?'+query);
                data = dataRecords;
                returnRecords = await RecordsDB.findAll();

                const offlineRecords = returnRecords.filter((item: IRecords) => item.id_banco == 0);

                if(offlineRecords.length != 0) {
                    for (const item of offlineRecords) {
                        let { data } = await api.post('/app/records', {
                            created_at: item.created_at,
                            creator: item.id_creator,
                            department: item.id_department
                        });
                        
                        await RecordsDB.updateIdRecord({ id: item.id, id_banco: data.id });
                    }
                    returnRecords = await RecordsDB.findAll();
                }

                newRecords = data.filter((item: IRecords) => !returnRecords.map((item: IRecords)=>item.id_banco).includes(item.id))

                if(newRecords.length != 0) {
                    for (const item of newRecords) {
                        await RecordsDB.create({ 
                            id_banco: item.id,
                            id_creator: item.id_creator,
                            creator: item.creator,
                            id_department: item.id_department,
                            department: item.department,
                            created_at: item.created_at
                        });
                    }
                }
            }

            returnRecords = await RecordsDB.findAll();
            const recordsFormatted = returnRecords.map((item: IRecords) => ({ ...item, dateFormatted: format(new Date(item.created_at), 'dd/MM/yyyy') }));
            setRecords(recordsFormatted);
            return
        } catch(error: any) {
            if(error?.response) {
                const { data, status } = error.response;

                if(status == 401 && (data.code == 124587 || data.code == 45697859)) {
                    signOut();
                    Alert.alert(data.title,data.message);
                } else if(status == 401) {
                    signOut();
                }
            }
            return
        }
    }
    async function getRecordsFiltered({ department, date, ignoreDate }: IGetRecordsFiltered) {
        try {
            const query = `createdAt=${format(new Date(date), 'dd/MM/yyyy') })}&department=${department}&useCreatedAt=0&useDepartment=${department}`;
            await getAllRecords(query);
            const returnRecordsBare = await RecordsDB.findAll();
            const recordsFormatted = returnRecordsBare.map((item: IRecords) => ({ ...item, dateFormatted: format(new Date(item.created_at), 'yyyy-MM-dd') }));
            
            let recordsFiltered = recordsFormatted;
            if(!ignoreDate) {
                recordsFiltered = recordsFiltered.filter((item: IRecords) => item.dateFormatted == date);
            }
            if(department != 0) {
                recordsFiltered = recordsFiltered.filter((item: IRecords) => item.id_department == department);
            }

            recordsFiltered = recordsFiltered.map((item: IRecords) => ({ ...item, dateFormatted: format(new Date(item.created_at), 'dd/MM/yyyy') }));

            setRecords(recordsFiltered);
        } catch (error: any) {

        }
    }
    async function getRecordByID(id: number) {
        try {
            const recordId = await RecordsDB.find({ id });
            return recordId;
        } catch (error) {
            console.log(error);
        }
    }
    //*----------------


    //* Funções Items
    async function getAllItems(id: number, eraseOldData = true) {
        try {
            if(eraseOldData) {
                setItems([]);
            }
            const retorno = await ItemsDB.findAll({ id });

            setItems(retorno);
            return retorno;
        } catch(error) {

        }
    }
    async function deleteOneItem(id: number, id_record: number, id_banco: number) {
        try {
            if(id_banco <= 0 || id_banco == null) {
                await ItemsDB.remove({ id });
                getAllItems(id_record, false);
                return
            }

            const hasInternet = await verifyInternet();

            if(hasInternet) {
                await api.delete('/app/items?id='+id_banco);
                await ItemsDB.remove({ id });
                getAllItems(id_record, false);
            }

            return
        } catch(error: any) {
            if(error?.response) {
                const { data, status } = error.response;

                if(status == 401 && (data.code == 124587 || data.code == 45697859)) {
                    signOut();
                    Alert.alert(data.title,data.message);
                } else if(status == 401) {
                    signOut();
                }
            }
        }
    }
    async function createNewItemDB({ id_record, id_record_banco, comment }: ICreateNewItemDB) {
        try {
            let id_banco;
            const created_at = String(new Date());

            await ItemsDB.create({ id_banco, id_record, comment, created_at });

            getAllItems(id_record, false);
            return
        } catch (error) {
            console.log(error)
            return
        }
    }
    async function updatePictureImage(picture: string, id: number, id_record: number, id_banco: number) {
        try {
            await ItemsDB.updateImage({ picture, id });

            getAllItems(id_record, false);
            return
        } catch (error) {
            console.log(error)
            return
        }
    }
    async function editItem(id_record: number, id: number, comment: string, id_banco: number) {
        try {

            await ItemsDB.updateGradeAndComment({ id, comment});

            await getAllItems(id_record, false);
            return
        } catch (error) {
            return
        }
    }
    async function publishItem(id: number) {
        try {
            const hasInternet = await verifyInternet();
            let id_banco;

            if(hasInternet) {
                const [currentItem] = await ItemsDB.findOne({ id });
                const [correspondingRecord] = await RecordsDB.find({ id: currentItem.id_record });
                
                if(correspondingRecord.id_banco == 0 || correspondingRecord.id_banco == null) {
                    console.log('sem dados')
                    return
                }
                const { data: dataItem } = await api.post('/app/items', {
                    createdAt: currentItem.created_at,
                    comment: currentItem.comment,
                    picture: currentItem.picture,
                    recordId: correspondingRecord.id_banco
                });
                
                await ItemsDB.updateId({ id_banco: dataItem.id, id });

                await getAllItems(currentItem.id_record, false);
            } else {
                Alert.alert("Sem conexão", "Verifique sua conexão com a internet para publicar este item.");
            }

            return
        } catch(error: any) {
            if(error?.response) {
                const { data, status } = error.response;

                if(status == 401 && (data.code == 124587 || data.code == 45697859)) {
                    signOut();
                    return
                } else if(status == 401) {
                    signOut();
                    return
                } else if(data?.message != undefined) {
                    Alert.alert('Erro', data.message);
                }
            }
            return
        }
    }
    async function saveItem(id: number) {
        try {
            const hasInternet = await verifyInternet();

            if(hasInternet) {
                const [currentItem] = await ItemsDB.findOne({ id });
                const [correspondingRecord] = await RecordsDB.find({ id: currentItem.id_record });
                
                if(correspondingRecord.id_banco == 0 || correspondingRecord.id_banco == null) {
                    console.log('sem dados')
                    return
                }
                await api.patch('/app/items', {
                    createdAt: currentItem.created_at,
                    comment: currentItem.comment,
                    picture: currentItem.picture,
                    itemId: currentItem.id_banco
                });

                await ItemsDB.updateEdited({ id });
                await getAllItems(currentItem.id_record, false);
            } else {
                Alert.alert("Sem conexão", "Verifique sua conexão com a internet para salvar este item.");
            }

            return
        } catch(error: any) {
            if(error?.response) {
                const { data, status } = error.response;

                if(status == 401 && (data.code == 124587 || data.code == 45697859)) {
                    signOut();
                    Alert.alert(data.title,data.message);
                } else if(status == 401) {
                    signOut();
                } else if(data?.message != undefined) {
                    Alert.alert('Erro', data.message);
                }
            }
            return
        }
    }
    //*----------------



    //* Funções departments
    async function getDepartments() {
        try {
            const hasInternet = await verifyInternet();

            if(hasInternet) {
                const { data } = await api.get('/app/departments');
    
                // await DepartmentsDB.removeAll();
    
                if(data.length > 0) {
                    for (const item of data) {
                        await DepartmentsDB.create({ id: item.id, department: item.department, active: item.active })
                    }
                }
                setDepartments(data);
                return
            } else {
                const departmentsDb = await DepartmentsDB.findAll();
                
                const departmentsFormatted = departmentsDb.map((item: IDepartments) => ({
                    id: item.id,
                    department: item.department
                }));
                
                setDepartments(departmentsFormatted);
                return
            }

        } catch(error: any) {
            if(error?.response) {
                const { data, status } = error.response;

                if(status == 401 && (data.code == 124587 || data.code == 45697859)) {
                    signOut();
                    Alert.alert(data.title,data.message);
                } else if(status == 401) {
                    signOut();
                }
            }
        }
    }
    //*----------------



    //* Função finalizar record
    async function finishRecord(id: number, ids: Set<number>, checklist: string) {
        try {
            const hasInternet = await verifyInternet();
            
            if(!hasInternet) {
                console.log('sem internet')
                return {
                    code: 3,
                    title: 'Sem conexão',
                    message: 'Conecte-se a internet para finalizar o registro.'
                }
            }

            await api.patch('/app/records', { id, checklist });

            for (const item of ids) {
                await ItemsDB.remove({ item });
            }
            await RecordsDB.remove({ id });

            const query = `createdAt=22/08/2022&department=0&useCreatedAt=0&useDepartment=0`;
            await getAllRecords(query);
            return {
                code: 1,
            }
        } catch(error: any) {
            if(error?.response) {
                const { data, status } = error.response;

                if(status == 401 && (data.code == 124587 || data.code == 45697859)) {
                    signOut();
                    Alert.alert(data.title,data.message);
                } else if(status == 401) {
                    signOut();
                }
            }
            return {
                code: 2,
            }
        }
    }
    //*----------------



    //* Função apagar record
    async function deleteRecord(id: number, id_banco: number, ids: Set<number>) {
        try {
            if(id_banco > 0 && id_banco != null && id_banco != undefined) {
                const hasInternet = await verifyInternet();

                if(!hasInternet) {
                    Alert.alert('Sem conexão', 'Esse registro já foi sincronizado com o servidor, e para apagar você precisa se conectar a internet.');
                    return
                }

                await api.delete('/app/records?id='+id_banco);
            }

            if(ids.size > 0) {
                for (const item of ids) {
                    await ItemsDB.remove({ item });
                }
            }
            await RecordsDB.removeId({ id });

            return
        } catch(error: any) {
            if(error?.response) {
                const { data, status } = error.response;

                if(status == 401 && (data.code == 124587 || data.code == 45697859)) {
                    signOut();
                    Alert.alert(data.title,data.message);
                } else if(status == 401) {
                    signOut();
                }
            }
            return 
        }
    }
    //*----------------




    //* Funções Checklist
    async function getCurrentChecklist() {
        try {
            const hasInternet = await verifyInternet();

            if(hasInternet) {
                const { data: dataChecklist } = await api.get<IChecklist>('/app/checklist');
                setChecklist(dataChecklist);

                await ChecklistDB.removeAll();
                await ChecklistDB.create({ id: 1, checklist: JSON.stringify(dataChecklist) });
            } else {
                const checklistInDB = await ChecklistDB.findAll();
                setChecklist(JSON.parse(checklistInDB[0].checklist));
            }
        } catch (error) {
            console.log(error);
        } finally {
            return;
        }
    }
    async function editChecklist(id: number, checklist: string) {
        try {
            await RecordsDB.updateIdChecklist({ id, checklist});
            return
        } catch (error) {
            return
        }
    }
    async function verifyVersionChecklist(id: number, currentVersion: string, goBack: any) {
        try {
            const hasInternet = await verifyInternet();

            if(!hasInternet) {
                Alert.alert('Sem internet!', 'Certifique-se de que sua conexão com a internet está funcionando corretamente.');
                return;
            }

            const { data: dataChecklist } = await api.get<IChecklist>('/app/checklist');

            if(dataChecklist.version == currentVersion) {
                Alert.alert('Atualizado!', 'Você já está utilizando a versão mais recente do checklist.');
                return;
            }

            if(dataChecklist.version != currentVersion) {
                Alert.alert(
                    'Nova versão!',
                    'Este registro está utilizando um versão inferior a versão atual do checklist, você pode optar por atualizar a versão atual desse registro, porém ao fazer isso você perderá as notas já marcadas.\n\nEscolha uma das opções para atualizar:',
                    [
                        {
                            text: 'Cancelar'
                        },
                        {
                            text: 'Apenas checklist offline',
                            onPress: () => updateChecklist(false, dataChecklist, goBack)
                        },
                        {
                            text: 'Checklist atual e offline',
                            onPress: () => updateChecklist(id, dataChecklist, goBack)
                        },
                    ]
                );
                return;
            }

            
        } catch (error) {
            console.log(error);
        }
    }
    async function updateChecklist(id: number | false, checklist: IChecklist, goBack: any) {
        try {
            await ChecklistDB.removeAll();
            await ChecklistDB.create({ id: 1, checklist: JSON.stringify(checklist) });
            Alert.alert(
                'Atualizado!',
                'Os proxímos checklists utilizaram esta nova versão.'
            );
        } catch (error) {
            console.log(error);
        }

        if(id !== false) {
            try {
                await RecordsDB.updateIdChecklist({ id, checklist: JSON.stringify(checklist) });
                Alert.alert(
                    'Atualizado!',
                    'Acesse novamente a tela de checklist deste registro para visualizar as mudanças.',
                    [
                        {
                            text: 'Concluir',
                            onPress: () => goBack()
                        }
                    ]
                );
            } catch (error) {
                console.log(error);
            }
        }

        setChecklist(checklist);
    }
    async function setChecklistInRecord(id: number) {
        try {
            await getCurrentChecklist();
            await RecordsDB.updateIdChecklist({ id, checklist: JSON.stringify(checklist) });
        } catch (error) {
            console.log(error);
        } finally {
            return
        }
    }
    //*----------------

    return (
        <DatabaseContext.Provider value={{
            verifyVersionChecklist,
            setChecklistInRecord,
            getCurrentChecklist,
            updatePictureImage,
            getRecordsFiltered,
            createNewRecord,
            createNewItemDB,
            getDepartments,
            getAllRecords,
            editChecklist,
            deleteOneItem,
            getRecordByID,
            finishRecord,
            deleteRecord,
            departments,
            publishItem,
            getAllItems,
            checklist,
            editItem,
            saveItem,
            records,
            items,
        }}>
            { children }
        </DatabaseContext.Provider>
    )
}

function databaseContext() {
    const context = useContext(DatabaseContext)

    return context
}

export { DatabaseProviderContext, databaseContext }