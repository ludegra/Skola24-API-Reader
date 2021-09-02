export interface RequestOptions {
    hostname: string;
    path: string;
    method: string;
    headers: Headers;
}

export interface Headers {
    Host: string;
    Accept: string;
    "Accept-Encoding": string;
    "Content-Type": string;
    "X-Scope": string;
    "Content-Length": number;
    Referer: string;
}

export interface SignatureResponseData {
    error: null;
    data: {
        signature: string;
    };
    exception: null;
    validation: any[];
}

export interface SignatureRequestData {
    signature: string;
}

export interface KeyResponseData {
    error: null;
    data: {
        key: string;
    };
    exception: null;
    validation: any[];
}

export interface ScheduleRequestData {
    blackAndWhite: boolean;
    customerKey: string;
    endDate: null;
    height: number;
    host: string;
    periodText: string;
    privateFreeTextMode: boolean;
    privateSelectionMode: null;
    renderKey: string;
    scheduleDay: number;
    selection: string;
    selectionType: number;
    showHeader: boolean;
    startDate: null;
    unitGuid: string;
    week: number;
    width: number;
    year: number;
}

export interface ScheduleRequestSpecifications {
    blackAndWhite: boolean;
    height: number;
    host: string;
    scheduleDay: number;
    week: number;
    width: number;
    year: number;
}

export interface ScheduleRequestStaticData {
    customerKey: string;
    endDate: null;
    periodText: string;
    privateFreeTextMode: boolean;
    privateSelectionMode: null;
    selectionType: number;
    showHeader: boolean;
    startDate: null;
    unitGuid: string;
}

export interface ScheduleData {
    error: null;
    data: {
        textList: Array<{
            x: number;
            y: number;
            fColor: string;
            fontsize: number;
            text: string;
            bold: boolean;
            italic: boolean;
            id: number;
            parentId: number;
            type: string;
        }>;
        boxList: Array<{
            x: number;
            y: number;
            width: number;
            height: number;
            bColor: string;
            fColor: string;
            id: number;
            parentId: number;
            type: string;
            lessonGuids: string[];
        }>;
        lineList: Array<{
            p1x: number;
            p1y: number;
            p2x: number;
            p2y: number;
            color: string;
            id: number;
            parentId: number;
            type: string;
        }>;
        lessonInfo: Array<{
            guidId: string;
            texts: string[];
            timeStart: string;
            timeEnd: string;
            dayOfWeekNumber: 1;
            blockName: string;
        }>;
    };
    exception: null;
    validation: any[];
}
