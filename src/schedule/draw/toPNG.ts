import sharp from "sharp";

/**
 * Converts an SVG to an PNG
 * @param svg SVG image to be converted
 * @returns Buffer with the PNG image
 */
export async function toPNG(svg: string) {
    const svgBuffer = Buffer.from(svg);

    return sharp(svgBuffer).png().toBuffer();
}
