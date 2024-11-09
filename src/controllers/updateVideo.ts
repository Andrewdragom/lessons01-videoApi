import {Request, Response} from "express";
import {db} from "../db/db";
import {
    authorFieldValidator,
    availableResolutionsFieldValidator, canBeDownloadFieldValidator, minAgeRestrictionFieldValidator,
    titleFieldValidator
} from "../validation/field-validator";

export const updateVideo =  (req: Request, res: Response) => {
    const getVideo = db.videos.find(p=>p.id === +req.params.id)
    if(!getVideo){
        res.send(404)
        return

    }

    const title = req.body.title
    const author = req.body.author
    const availableResolutions = !req.body.availableResolutions ? getVideo?.availableResolutions : req.body.availableResolutions
    const errorsArray: Array<{field: string, message: string}> = [] as Array<{field: string, message: string}>
    const canBeDownloaded = !req.body.canBeDownloaded ? false : req.body.canBeDownloaded
    const minAgeRestriction = !req.body.minAgeRestriction ? getVideo?.minAgeRestriction : req.body.minAgeRestriction
    titleFieldValidator(title, errorsArray)
    availableResolutionsFieldValidator(availableResolutions,errorsArray)
    authorFieldValidator(author, errorsArray)
    canBeDownloadFieldValidator(canBeDownloaded,errorsArray)
    if(minAgeRestriction!=null){
        minAgeRestrictionFieldValidator(minAgeRestriction,errorsArray)
    }
    if(errorsArray.length > 0){

        res.status(400).send({errors: errorsArray})
        return

    }
    const newVideo = {
        ...getVideo,
        title: title,
        author: author,
        availableResolutions: availableResolutions,
        canBeDownloaded: canBeDownloaded,
        minAgeRestriction: minAgeRestriction,
        publicationDate: (new Date().toISOString()),
    }

    for(let i = 0; i < db.videos.length; i++) {
        if (db.videos[i].id === +req.params.id) {
            db.videos.splice(i, 1)
        }
    }

    db.videos = [...db.videos, newVideo]
     res.status(201).send(newVideo)
    return

}