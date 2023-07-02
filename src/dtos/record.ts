import { IChecklist } from "../contexts/dto/checklist";

interface IRecord {
    id: number;
    id_banco: number;
    department: string;
    checklist: IChecklist;
}

export { IRecord }