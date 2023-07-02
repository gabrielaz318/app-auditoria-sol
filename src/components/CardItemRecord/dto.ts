interface IButtonUpload {
    isLoading: boolean;
}

interface IButtonDelete {
    isLoading: boolean;
}

interface ICardItemRecord {
    id: number;
    id_record: number;
    id_banco: number;
    comment: string;
    picture: string;
    edited: number;
    online: number;
}

export { IButtonUpload, IButtonDelete, ICardItemRecord }