import {
    RequestOptions,
    SignatureRequestData,
    ScheduleRequestData,
} from "../types";

import { request } from "https";
import { createGunzip } from "zlib";
import { pipeline } from "stream";

/**
 * Performs an https request
 * @param requestData Data used in the request
 * @param options Options for the https request
 * @param callback Callback function for the result
 * @param onError Callback function for eventual errors
 */
export function requestData(
    requestData: SignatureRequestData | ScheduleRequestData | null,
    options: RequestOptions,
    callback: (response: string) => void,
    onError?: (error: any) => void
) {
    const requestDataString = JSON.stringify(requestData);
    options.headers["Content-Length"] = requestDataString.length;

    const req = request(options as object);

    let buffer: string[] = [];

    req.on("response", (response) => {
        const onError = (err: NodeJS.ErrnoException | null) => {
            if (err) {
                console.error(err, "2");
                process.exitCode = 1;
            }
        };

        let gunzip = createGunzip();
        pipeline(response, gunzip, onError);

        gunzip.on("data", (data) => {
            buffer.push(data.toString());
        });

        gunzip.on("end", () => {
            req.destroy();
            callback(buffer.join(""));
        });
    });

    req.on("error", (error) => {
        if (onError) {
            onError(error);
        }
    });

    req.write(requestDataString);
    req.end();
}
