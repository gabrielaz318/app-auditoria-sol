import { ReactNode } from "react";

interface IHeader {
    updateChecklistButton?: boolean;
    children: ReactNode;
    exitButton?: boolean;
    onPressRight?: () => void;
    finishButton?: boolean;
    backButton?: boolean;
}

interface IContainer {
    backButton?: boolean;
}


export { IHeader, IContainer }