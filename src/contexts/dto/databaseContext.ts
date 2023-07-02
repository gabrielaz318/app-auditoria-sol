interface ICreateNewRecord {
    id_creator: number;
    creator: string;
    id_department: number;
    department: string;
}

interface ICreateNewRecordReturn {
    code: number;
    id?: number;
    message?: string;
    id_banco?: number;
}

interface IRecords {
    id: number;
    id_banco: number | string | null;
    creator: string;
    id_creator: number;
    checklist: string;
    id_department: number;
    department: string;
    created_at: string;
    dateFormatted?: string;
}

interface Items {
    id: number;
    id_record: number;
    id_banco: number;
    grade: string;
    comment: string;
    picture: string;
    online: number;
    edited: number;
}

interface ICreateNewItemDB {
    id_record: number;
    id_record_banco: number;
    comment: string;
}

interface IGetRecordsFiltered {
    date: string;
    department: number;
    ignoreDate: boolean;
}

interface IDepartments {
    id: number;
    department: string;
}

interface IReturnFinishRecord {
    code: number;
    title?: string;
    message?: string;
}

export { 
    Items,
    IRecords,
    IDepartments,
    ICreateNewItemDB,
    ICreateNewRecord,
    IGetRecordsFiltered,
    IReturnFinishRecord,
    ICreateNewRecordReturn,
}