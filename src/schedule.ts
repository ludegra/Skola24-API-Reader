import { getSchedule } from "./schedule/request/scheduledata";
import { ScheduleRequestSpecifications } from "./schedule/types";
import { drawSchedulePNG, drawScheduleSVG } from "./schedule/draw/draw";

/**
 * Enum for choosing output file format in fetch schedule function
 */
export enum ScheduleReturnType {
    json = "json",
    svg = "svg",
    png = "png",
}

/**
 * Performs an API request for a schedule
 * @param returnFormat In which file format the return value should be in
 * @param id Short code for the schedule requested (usually 2-3 characters) ex: "1a"
 * @param width The width of the schedule
 * @param height The height of the schedule
 * @param specifications Specifications for how the schedule should look
 * @param callback Callback function to which the return value will be passed
 * @param onError Callback function in case of eventual errors in the request
 */
export function fetchSchedule(
    returnFormat: ScheduleReturnType,
    id: string,
    width: number,
    height: number,
    specifications: ScheduleRequestSpecifications,
    callback: (result: any) => void,
    onError?: (err: any) => void
) {
    getSchedule(id, specifications).then((result) => {
        switch (returnFormat) {
            case ScheduleReturnType.json:
                callback(result);
                return;

            case ScheduleReturnType.svg:
                callback(drawScheduleSVG(width, height, result));
                return;

            case ScheduleReturnType.png:
                drawSchedulePNG(width, height, result).then((result) => {
                    callback(result);
                });
                return;

            default:
                throw new Error(`Unknown format: ${returnFormat}`);
        }
    }, (reason) => {
        if (onError) onError(reason);
    });
}

module.exports = {
    fetchSchedule: fetchSchedule,
    ScheduleReturnType: ScheduleReturnType,
}
