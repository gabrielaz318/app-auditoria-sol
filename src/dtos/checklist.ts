import { IChecklist } from "../contexts/dto/checklist";
import { IGradesChecklist } from "./gradesCHecklist";

export interface IChecklistRoute {
    id: number;
    id_banco: number;
    checklist: IChecklist;
    grades: IGradesChecklist[];
}