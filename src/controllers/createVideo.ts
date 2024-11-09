import {Response, Request} from "express";
import {db} from "../db/db";
import {
    authorFieldValidator,
    availableResolutionsFieldValidator,
    titleFieldValidator
} from "../validation/field-validator";

export const createVideo = (req: Request, res: Response) =>{

    const title = req.body.title
    const availableResolutions = req.body.availableResolutions
    const author = req.body.author

    const errorsArray: Array<{field: string, message: string}> = []
    titleFieldValidator(title,errorsArray)
    availableResolutionsFieldValidator(availableResolutions,errorsArray)
    authorFieldValidator(author,errorsArray)

    if(errorsArray.length > 0){
        res.status(400).send({errors: errorsArray})
        return
    }

    const video = {
        ...req.body,
        id: Date.now() + Math.random(),
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: (new Date().toISOString()),
        publicationDate: (new Date().toISOString()),
    }

    db.videos = [...db.videos, video]
    res.status(201).json(video)
}