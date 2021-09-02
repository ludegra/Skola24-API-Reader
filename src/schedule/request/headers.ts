import { RequestOptions } from "../types";

export enum RequestTypes {
    signature,
    key,
    schedule
}

const templateOptions = {
    hostname: "web.skola24.se",
    path: "",
    method: "POST",
    headers: {
        "Host": "web.skola24.se",
        "Accept": "application/json",
        "Accept-Encoding": "gzip",
        "Content-Type": "application/json",
        "X-Scope": "8a22163c-8662-4535-9050-bc5e1923df48",
        "Content-Length": 0,
        "Referer": "https://web.skola24.se/timetable/timetable-viewer/it-gymnasiet.skola24.se/IT-Gymnasiet%20G%C3%B6teborg/",
    }
}

/**
 * Generates options for an https request
 * @param type Specification of where the request will be sent to.
 * @returns Options to use with an https request (Content length header will be set to 0 and will need to be adjusted to fit the request data later).
 */
export function generateOptions(type: RequestTypes): RequestOptions {
    let options = {...templateOptions};

    switch (type) {
        case RequestTypes.signature:
            options["path"] = "/api/encrypt/signature";
            break;
        
        case RequestTypes.key:
            options["path"] = "/api/get/timetable/render/key";
            break;

        case RequestTypes.schedule:
            options["path"] = "/api/render/timetable";
            break;
    }
    return options;
}