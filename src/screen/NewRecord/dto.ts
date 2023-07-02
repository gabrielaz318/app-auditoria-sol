interface IMarginTopDescription {
    marginTop?: string;
}

interface IStatusChecklist {
    sync: boolean;
}

interface IDepartmentSelected {
    id: number;
    department: string;
}

interface IButtonCreateRecord {
    loading: boolean;
}

export { IMarginTopDescription, IStatusChecklist, IButtonCreateRecord, IDepartmentSelected }