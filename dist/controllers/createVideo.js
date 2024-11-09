"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideo = void 0;
const db_1 = require("../db/db");
const field_validator_1 = require("../validation/field-validator");
const createVideo = (req, res) => {
    const title = req.body.title;
    const availableResolutions = req.body.availableResolutions;
    const author = req.body.author;
    const errorsArray = [];
    (0, field_validator_1.titleFieldValidator)(title, errorsArray);
    (0, field_validator_1.availableResolutionsFieldValidator)(availableResolutions, errorsArray);
    (0, field_validator_1.authorFieldValidator)(author, errorsArray);
    if (errorsArray.length > 0) {
        res.status(400).send({ errors: errorsArray });
        return;
    }
    const video = Object.assign(Object.assign({}, req.body), { id: Date.now() + Math.random(), canBeDownloaded: true, minAgeRestriction: null, createdAt: (new Date().toISOString()), publicationDate: (new Date().toISOString()) });
    db_1.db.videos = [...db_1.db.videos, video];
    res.status(201).json(video);
};
exports.createVideo = createVideo;
