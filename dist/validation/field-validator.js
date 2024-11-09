"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolutionsEnum = exports.availableResolutionsFieldValidator = exports.minAgeRestrictionFieldValidator = exports.canBeDownloadFieldValidator = exports.authorFieldValidator = exports.titleFieldValidator = void 0;
const titleFieldValidator = (title, errorsArray) => {
    if (!title) {
        errorsArray.push({ field: 'title', message: 'no title' });
    }
    if (typeof (title) !== 'string') {
        errorsArray.push({ field: 'author', message: 'title is not a string' });
        return;
    }
    if (title && title.trim().length > 40) {
        errorsArray.push({ field: 'title', message: 'more than 40 symbols' });
    }
    if (title && title.trim().length < 1) {
        errorsArray.push({ field: 'title', message: 'no title' });
    }
};
exports.titleFieldValidator = titleFieldValidator;
const authorFieldValidator = (author, errorsArray) => {
    if (!author) {
        errorsArray.push({ field: 'author', message: 'no author' });
    }
    if (typeof (author) !== 'string') {
        errorsArray.push({ field: 'author', message: 'author is not a string' });
        return;
    }
    if (author && author.trim().length > 20) {
        errorsArray.push({ field: 'author', message: 'more than 20 symbols' });
    }
    if (author && author.trim().length < 1) {
        errorsArray.push({ field: 'author', message: 'no author' });
    }
};
exports.authorFieldValidator = authorFieldValidator;
const canBeDownloadFieldValidator = (canBeDownload, errorsArray) => {
    if (canBeDownload != false && canBeDownload != true) {
        errorsArray.push({ field: 'canBeDownload', message: 'should be boolean' });
    }
};
exports.canBeDownloadFieldValidator = canBeDownloadFieldValidator;
const minAgeRestrictionFieldValidator = (minAgeRestriction, errorsArray) => {
    if (minAgeRestriction > 18) {
        errorsArray.push({ field: 'minAgeRestriction', message: 'should be number < 18' });
    }
    if (minAgeRestriction < 1) {
        errorsArray.push({ field: 'minAgeRestriction', message: 'should be number > 1' });
    }
    if (typeof (minAgeRestriction) != "number" && typeof (minAgeRestriction) != null) {
        errorsArray.push({ field: 'minAgeRestriction', message: 'should be number' });
    }
};
exports.minAgeRestrictionFieldValidator = minAgeRestrictionFieldValidator;
const availableResolutionsFieldValidator = (availableResolutions, errorsArray) => {
    if (!availableResolutions) {
        errorsArray.push({ field: 'availableResolutions', message: 'exist not valid value' });
        return;
    }
    if (availableResolutions.length < 1) {
        errorsArray.push({ field: 'availableResolutions', message: 'exist not valid value' });
        return;
    }
    if (availableResolutions && availableResolutions.length) {
        availableResolutions.forEach((resolution) => {
            if (!Object.keys(ResolutionsEnum).includes(resolution)) {
                errorsArray.push({ field: 'availableResolutions', message: 'exist not valid value' });
            }
        });
    }
};
exports.availableResolutionsFieldValidator = availableResolutionsFieldValidator;
var ResolutionsEnum;
(function (ResolutionsEnum) {
    ResolutionsEnum["P144"] = "P144";
    ResolutionsEnum["P240"] = "P240";
    ResolutionsEnum["P360"] = "P360";
    ResolutionsEnum["P480"] = "P480";
    ResolutionsEnum["P720"] = "P720";
    ResolutionsEnum["P1080"] = "P1080";
    ResolutionsEnum["P1440"] = "P1440";
    ResolutionsEnum["P2160"] = "P2160";
})(ResolutionsEnum || (exports.ResolutionsEnum = ResolutionsEnum = {}));
