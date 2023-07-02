import { IGradesChecklist } from "../../dtos/gradesCHecklist";
import { IItemsChecklist } from "../../dtos/itemsChecklist";

interface IChecklist {
    checklist: {
        title: string;
        items: IItemsChecklist[];
    }[];
    grades: IGradesChecklist[];
    version: string;
}

export { IChecklist }