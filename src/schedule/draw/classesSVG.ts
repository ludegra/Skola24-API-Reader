export class SvgTag {
    width: number;
    height: number;
    viewBox: [number, number, number, number];

    constructor(width: number, height: number) {
        width++;
        height--;

        this.width = width;
        this.height = height;
        this.viewBox = [0, 0, width, height];
    }

    build(children: string[]) {
        const openingTag = `<svg width="${this.width}" height="${
            this.height
        }" shape-rendering="crispEdges" viewBox="${this.viewBox.join(" ")}">`;
        const closingTag = "</svg>";

        return openingTag + "\n    " + children.join("\n    ") + '\n' + closingTag;
    }
}

export class RectTag {
    x: number;
    y: number;
    width: number;
    height: number;
    style: string;
    boxType: string;
    boxId: number;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        bColor: string,
        fColor: string,
        id: number,
        type: string
    ) {
        this.x = x + 1;
        this.y = y + 1;
        this.width = width;
        this.height = height;
        this.boxType = type;
        this.boxId = id;

        const fill = `rgb(${parseInt(bColor.substring(1, 3), 16)}, ${parseInt(
            bColor.substring(3, 5),
            16
        )}, ${parseInt(bColor.substring(5, 7), 16)})`;
        const stroke = `rgb(${parseInt(fColor.substring(1, 3), 16)}, ${parseInt(
            fColor.substring(3, 5),
            16
        )}, ${parseInt(fColor.substring(5, 7), 16)})`;

        this.style = `fill: ${fill}; stroke: ${stroke}; stroke-width: ${
            fColor === bColor ? 0 : 1
        }px;`;
    }

    build() {
        const openingTag = `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" shape-rendering="crispEdges" style="${this.style}" box-type="${this.boxType}" box-id="${this.boxId ? this.boxId : ""}">`;
        const closingTag = "</rect>";

        return openingTag + closingTag;
    }
}

export class TextTag {
    x: number;
    y: number;
    style: string;
    text: string;
    textId: number;

    constructor(
        x: number,
        y: number,
        fColor: string,
        fontsize: number,
        text: string,
        bold: boolean,
        italic: boolean,
        id: number,
        type: string,
    ) {
        // De-jumbeling x and y positions
        switch (type) {
            case "ClockAxisBox": 
                x += 1;
                y += 13;
                break;

            case "HeadingDay":
                x += 1;
                y += 16;
                break;

            case "Lesson":
                x += 1;
                y += 16;
                break;

            case "Footer":
                x += 1;
                y += 12;
                break;

            case "ClockFrameEnd":
                x += 1;
                y += 11;
                break;

            case "ClockFrameStart":
                x += 1;
                y += 11;
                break;
        }
        // Asigning class variables
        this.x = x;
        this.y = y;
        this.text = text;
        this.textId = id;

        // Checking if text should be bold and/or italic and adding to css if it should
        let extra = "";
        if (bold) extra += " font-weight: bold;";
        if (italic) extra += " font-style: italic;";

        // Converting hex to RGB for readability
        const fill = `rgb(${parseInt(fColor.substring(1, 3), 16)}, ${parseInt(
            fColor.substring(3, 5),
            16
        )}, ${parseInt(fColor.substring(5, 7), 16)})`;

        // Creating and assigning css to class variable
        this.style =
            `font-size: ${fontsize}px; font-family: Open Sans; fill: ${fill}; pointer-events: none;` +
            extra;
    }

    build() {
        // Creating opening and closing tags
        const openingTag = `<text style="${this.style}" x="${this.x}" y="${this.y}" text-id="${this.textId}">`;
        const closingTag = "</text>";

        // Adding together components to one string
        return openingTag + this.text + closingTag;
    }
}

export class LineTag {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stroke: string;

    constructor(
        p1x: number,
        p1y: number,
        p2x: number,
        p2y: number,
        color: string
    ) {
        this.x1 = p1x + 1;
        this.y1 = p1y + 1;
        this.x2 = p2x + 1;
        this.y2 = p2y + 1;
        this.stroke = color;
    }

    build() {
        const openingTag = `<line x1="${this.x1}" y1="${this.y1}" x2="${this.x2}" y2="${this.y2}" stroke="${this.stroke}">`;
        const closingTag = "</line>";

        return openingTag + closingTag;
    }
}
