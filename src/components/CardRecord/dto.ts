interface ICardRecord {
    id: number;
    id_banco: number;
    color: string;
    checklist: string;
    creator: string;
    department: string;
    date: string;
}

interface IColorStatus {
    color: string;
}

export { ICardRecord, IColorStatus }