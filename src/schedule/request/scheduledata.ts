import { generateOptions, RequestTypes } from "./headers";
import {
    ScheduleRequestData,
    ScheduleRequestStaticData,
    ScheduleRequestSpecifications,
    SignatureResponseData,
    KeyResponseData,
    ScheduleData,
} from "../types";
import { requestData } from "./request";

/**
 * Performs a request for a selection key
 * @param signature Id of the schedule that will be requested
 * @returns Promise that resolves with the selection key used for a timetable request
 */
function requestSignature(signature: string) {
    const request = { signature: signature };
    const options = generateOptions(RequestTypes.signature);

    return new Promise<string>((resolve, reject) => {
        requestData(
            request,
            options,
            (response) => {
                const signatureResponse: SignatureResponseData =
                    JSON.parse(response);
                resolve(signatureResponse.data.signature);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

/**
 * Performs a request for a render key
 * @returns Promise that resolves with the rendeer key used for a timeline request
 */
function requestKey() {
    let request: null = null;
    const keyOptions = generateOptions(RequestTypes.key);

    return new Promise<string>((resolve, reject) => {
        requestData(
            request,
            keyOptions,
            (response) => {
                const keyResponse: KeyResponseData = JSON.parse(response);
                resolve(keyResponse.data.key);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

/**
 * Data that I did not see the need to specify each time
 */
const STATIC_DATA: ScheduleRequestStaticData = {
    customerKey: "",
    endDate: null,
    periodText: "",
    privateFreeTextMode: false,
    privateSelectionMode: null,
    selectionType: 4,
    showHeader: false,
    startDate: null,
    unitGuid: "MzMzODU1NjAtZGYyZS1mM2U2LTgzY2MtNDA0NGFjMmZjZjUw",
};

/**
 * Performs the main API call for the schedule
 * @param apiData Data used for the request originating from other API calls
 * @param specifiedData Options for how the request should be performed
 * @returns Timetable data as an object
 */
function requestSchedule(
    apiData: { selection: string; renderKey: string },
    specifiedData: ScheduleRequestSpecifications
) {
    let data: ScheduleRequestData = {
        ...STATIC_DATA,
        ...apiData,
        ...specifiedData,
    };
    const options = generateOptions(RequestTypes.schedule);

    return new Promise<ScheduleData>((resolve, reject) => {
        requestData(
            data,
            options,
            (resultRaw) => {
                let result = JSON.parse(resultRaw);
                resolve(result);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

/**
 * Performs the necessary requests to get the schedule data
 * @param signature Id of the schedule requested
 * @param specifications Options for how the request should be performed
 * @returns Promise that resolves with the schedule data as an object
 */
export function getSchedule(
    signature: string,
    specifications: ScheduleRequestSpecifications
) {
    let signatureResponce: string;
    return new Promise<ScheduleData>((resolve, reject) => {
        function rejectOnError(error: any) {
            reject(error);
        }
        requestSignature(signature)
            .then((res) => {
                signatureResponce = res;
                return requestKey();
            }, rejectOnError)
            .then((key) => {
                if (key) {
                    return requestSchedule(
                        { selection: signatureResponce, renderKey: key },
                        specifications
                    );
                }
                return;
            }, rejectOnError)
            .then((scheduleData) => {
                if (scheduleData) {
                    resolve(scheduleData);
                }
            }, rejectOnError);
    });
}
