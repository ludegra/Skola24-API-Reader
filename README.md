# Skola24 API Reader

A library for reading the Skola24 API.

## Examples

Performing a request and storing the data as an svg file

```ts
// Importing WriteFile from fs in order to write to a file
import { writeFile } from "fs/promises";

// Importing functions used for the request
import { fetchSchedule, ScheduleReturnType } from "schedule"

// Importing types used in function parameters
import { ScheduleRequestSpecifications } from "schedule/types";

// Specifying the height and the width of the schedule
const WIDTH = 400;
const HEIGHT = 600;

// Specifying what schedule to request
const ID = "1a";

// Specifying some of the headrers used in the request
const requestData: ScheduleRequestSpecifications = {
    blackAndWhite: false,
    height: HEIGHT,
    host: "random-school.skola24.se",
    scheduleDay: 0,
    week: 35,
    width: WIDTH,
    year: 2021,
};

// Requesting a schedule as an SVG and writing it to a file
fetchSchedule(ScheduleReturnType.svg, ID, WIDTH, HEIGHT, requestData, (result) => {
    writeFile("data/schedule.svg", result);
});
```
