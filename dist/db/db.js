"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.availableResolutions = void 0;
exports.availableResolutions = {
    P144: "P144",
    P240: "P240",
    P360: "P360",
    P480: "P480",
    P720: "P720",
    P1080: "P1080",
    P1440: "P2160"
};
exports.db = {
    videos: [
        {
            id: 1,
            title: "video 1",
            author: "Andreww",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: "2024-11-06T09:23:10.622Z",
            publicationDate: "2024-11-06T09:23:10.622Z",
            availableResolutions: [
                exports.availableResolutions.P144
            ]
        },
        {
            id: 2,
            title: "video 2",
            author: "Bob",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: "2024-11-06T09:23:10.622Z",
            publicationDate: "2024-11-06T09:23:10.622Z",
            availableResolutions: [
                exports.availableResolutions.P144
            ]
        }
    ]
};
// [
// {
//     "id": 0,
//     "title": "string",
//     "author": "string",
//     "canBeDownloaded": true,
//     "minAgeRestriction": null,
//     "createdAt": "2024-11-07T09:34:09.392Z",
//     "publicationDate": "2024-11-07T09:34:09.392Z",
//     "availableResolutions": [
//         "P144"
//     ]
// }
// ]
