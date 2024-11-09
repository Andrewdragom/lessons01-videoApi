import {availableResolutions} from "../db/db";

export const titleFieldValidator = (
    title: string | undefined,
    errorsArray: Array<{ field: string, message: string}>
) => {
    if (!title) {
        errorsArray.push({field: 'title', message: 'no title'});
    }
    if(typeof(title) !== 'string'){
        errorsArray.push({field: 'author', message: 'title is not a string'});
        return
    }
    if(title&&title.trim().length > 40){
        errorsArray.push({field: 'title', message: 'more than 40 symbols'});
    }
    if(title&&title.trim().length < 1){
        errorsArray.push({field: 'title', message: 'no title'});
    }
}

export const authorFieldValidator = (
    author: string | undefined,
    errorsArray: Array<{ field: string, message: string}>
) => {
    if (!author) {
        errorsArray.push({field: 'author', message: 'no author'});
    }
    if(typeof(author) !== 'string'){
        errorsArray.push({field: 'author', message: 'author is not a string'});
        return
    }
    if(author&&author.trim().length > 20){
        errorsArray.push({field: 'author', message: 'more than 20 symbols'});
    }
    if(author&&author.trim().length < 1){
        errorsArray.push({field: 'author', message: 'no author'});
    }
}

export const canBeDownloadFieldValidator = (
    canBeDownload: boolean | undefined,
    errorsArray: Array<{ field: string, message: string}>
) => {
    if (canBeDownload!=false && canBeDownload!=true) {
        errorsArray.push({field: 'canBeDownload', message: 'should be boolean'});
    }
}

export const minAgeRestrictionFieldValidator = (
    minAgeRestriction: number,
    errorsArray: Array<{ field: string, message: string}>
) => {
    if (minAgeRestriction>18) {
        errorsArray.push({field: 'minAgeRestriction', message: 'should be number < 18'});
    }
    if (minAgeRestriction<1) {
        errorsArray.push({field: 'minAgeRestriction', message: 'should be number > 1'});
    }
    if (typeof(minAgeRestriction)!= "number" && typeof(minAgeRestriction)!= null) {
        errorsArray.push({field: 'minAgeRestriction', message: 'should be number'});
    }
}





export const availableResolutionsFieldValidator = (
    availableResolutions: Array<string>,
    errorsArray: Array<{ field: string, message: string}>
) => {
    if (!availableResolutions){
        errorsArray.push({field: 'availableResolutions', message: 'exist not valid value'})
        return
    }

    if(availableResolutions.length < 1){
        errorsArray.push({field: 'availableResolutions', message: 'exist not valid value'})
        return
    }

    if(availableResolutions&&availableResolutions.length){
        availableResolutions.forEach((resolution:string) => {
            if(!Object.keys(ResolutionsEnum).includes(resolution)){
                errorsArray.push({field: 'availableResolutions', message: 'exist not valid value'})
            }

        })
    }
}

export enum ResolutionsEnum {
    'P144' = 'P144',
    'P240' = 'P240',
    'P360' = 'P360',
    'P480' = 'P480',
    'P720' = 'P720',
    'P1080' = 'P1080',
    'P1440' = 'P1440',
    'P2160' = 'P2160'
}


