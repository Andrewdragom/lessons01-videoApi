"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVideo = void 0;
const db_1 = require("../db/db");
const field_validator_1 = require("../validation/field-validator");
const updateVideo = (req, res) => {
    const getVideo = db_1.db.videos.find(p => p.id === +req.params.id);
    if (!getVideo) {
        res.send(404);
        return;
    }
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = !req.body.availableResolutions ? getVideo === null || getVideo === void 0 ? void 0 : getVideo.availableResolutions : req.body.availableResolutions;
    const errorsArray = [];
    const canBeDownloaded = !req.body.canBeDownloaded ? false : req.body.canBeDownloaded;
    const minAgeRestriction = !req.body.minAgeRestriction ? getVideo === null || getVideo === void 0 ? void 0 : getVideo.minAgeRestriction : req.body.minAgeRestriction;
    (0, field_validator_1.titleFieldValidator)(title, errorsArray);
    (0, field_validator_1.availableResolutionsFieldValidator)(availableResolutions, errorsArray);
    (0, field_validator_1.authorFieldValidator)(author, errorsArray);
    (0, field_validator_1.canBeDownloadFieldValidator)(canBeDownloaded, errorsArray);
    if (minAgeRestriction != null) {
        (0, field_validator_1.minAgeRestrictionFieldValidator)(minAgeRestriction, errorsArray);
    }
    if (errorsArray.length > 0) {
        res.status(400).send({ errors: errorsArray });
        return;
    }
    const newVideo = Object.assign(Object.assign({}, getVideo), { title: title, author: author, availableResolutions: availableResolutions, canBeDownloaded: canBeDownloaded, minAgeRestriction: minAgeRestriction, publicationDate: (new Date().toISOString()) });
    for (let i = 0; i < db_1.db.videos.length; i++) {
        if (db_1.db.videos[i].id === +req.params.id) {
            db_1.db.videos.splice(i, 1);
        }
    }
    db_1.db.videos = [...db_1.db.videos, newVideo];
    res.status(201).send(newVideo);
    return;
};
exports.updateVideo = updateVideo;
