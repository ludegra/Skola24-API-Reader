import { ScheduleData } from "../types";
import { LineTag, RectTag, SvgTag, TextTag } from "./classesSVG";
import { toPNG } from "./toPNG";

/**
 * Draws the schedule as an SVG
 * @param width Width of the image. Should be the same number as used in the API request
 * @param height Height of the image. Should be the same number as used in the API request
 * @param scheduleData The data recieved from the API
 * @returns Schedule as an SVG
 */
export function drawScheduleSVG(
    width: number,
    height: number,
    scheduleData: ScheduleData
) {
    let children: string[] = [];

    scheduleData.data.boxList.forEach((element) => {
        let rectangle = new RectTag(
            element.x,
            element.y,
            element.width,
            element.height,
            element.bColor,
            element.fColor,
            element.id,
            element.type
        );
        children.push(rectangle.build());
    });

    scheduleData.data.textList.forEach((element) => {
        let textInstance = new TextTag(
            element.x,
            element.y,
            element.fColor,
            element.fontsize,
            element.text,
            element.bold,
            element.italic,
            element.id,
            element.type
        );
        children.push(textInstance.build());
    });

    scheduleData.data.lineList.forEach(element => {
        let line = new LineTag(
            element.p1x,
            element.p1y,
            element.p2x,
            element.p2y,
            element.color
        );
        children.push(line.build());
    });

    let svg = new SvgTag(width, height);

    let svgString = svg.build(children);

    return svgString;
}

/**
 * Draws the schedule as an SVG and then converts it to an PNG
 * @param width Width of the image. Should be the same number as used in the API request
 * @param height Height of the image. Should be the same number as used in the API request
 * @param scheduleData The data recieved from the API
 * @returns Promise that resolves to a buffer of an PNG
 */
export async function drawSchedulePNG(
    width: number,
    height: number,
    scheduleData: ScheduleData
) {
    const svg = drawScheduleSVG(width, height, scheduleData);

    return toPNG(svg);
}