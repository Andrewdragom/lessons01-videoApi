import express from 'express'
import {SETTINGS} from "./setting";
import {videosRouter} from "./routes/videos-router";
import cors from 'cors'
export const app = express()

app.use(express.json())
app.use(cors())
app.use(SETTINGS.PATH.VIDEOS, videosRouter);

app.get('/', (req, res) => {
    res.status(200).json({version: '1.0'})
})
