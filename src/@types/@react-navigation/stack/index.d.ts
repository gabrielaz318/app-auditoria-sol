import { IRecord } from "../../../dtos/record";

declare namespace ReactNavigation {
    export interface RootParamList {
        Auth: unknown;
        Record: IRecord;
        NewRecord: unknown;
        Checklist: unknown;
    }
}