import {Request, Response, Router} from "express";
import {db} from "../db/db";
import {RequestWithParams, RequestWithQuery} from "../types/types";
import {GetVideosQueryModel} from "../models/GetVideosQueryModel";
import {videosViewModel} from "../models/VideosViewModel";
import {createVideo} from "../controllers/createVideo";
import {updateVideo} from "../controllers/updateVideo";
export const videosRouter = Router();


videosRouter.get('/', (req: RequestWithQuery<GetVideosQueryModel>, res: Response<videosViewModel[]>) => {
    res.status(200).json(db.videos)
})

videosRouter.get("/:id", (req: RequestWithParams<{id:string}>, res: Response) => {
  const videoId = +req.params.id;
  const getVideo = db.videos.find(video => video.id === videoId);
  if(!getVideo){
      res.status(404).send()
  }
  res.status(200).json(getVideo)
})

videosRouter.delete('/:id', (req: RequestWithParams<{id:string}>, res: Response) => {
    for(let i = 0; i < db.videos.length; i++) {
        if (db.videos[i].id === +req.params.id) {
            db.videos.splice(i, 1)
            res.send(204)
            return;
        }
    }
    res.send(404)
}) // удалить видео по айди

videosRouter.post('/', createVideo) // создать новое видео

videosRouter.put('/:id', updateVideo) // обновить видео по айди


videosRouter.delete('/__test__/data', (req: Request, res: Response) => {
    db.videos.length = 0;
    res.status(204).send(db.videos)
}) // для тестов